package main

import (
	"sync"
)

var (
	inMemoryMap  = map[string]*Bucket{}
	curRequestId = 100
	mu           = sync.RWMutex{}
)

func saveRequest(bucket string, request CatchedRequest) *Bucket {
	mu.Lock()
	defer mu.Unlock()

	request.ID = curRequestId
	curRequestId++

	if _, ok := inMemoryMap[bucket]; !ok {
		inMemoryMap[bucket] = &Bucket{
			ResponseStatusCode: 200,
			ResponseBody:       `{"webhook":"stored"}`,
		}
	}

	// Keep only last answers
	inMemoryMap[bucket].Webhooks = append(inMemoryMap[bucket].Webhooks, request)
	if len(inMemoryMap[bucket].Webhooks) > toKeep {
		l := len(inMemoryMap[bucket].Webhooks)
		inMemoryMap[bucket].Webhooks = inMemoryMap[bucket].Webhooks[l-toKeep : l]
	}

	return inMemoryMap[bucket]
}

func getRequests(bucket string, index int) []CatchedRequest {
	mu.RLock()
	defer mu.RUnlock()

	if _, ok := inMemoryMap[bucket]; !ok {
		return nil
	}

	var ans []CatchedRequest
	for _, v := range inMemoryMap[bucket].Webhooks {
		if v.ID >= index {
			ans = append(ans, v)
		}
	}
	return ans
}

func deleteWebhook(bucket string, webhookID int) {
	mu.RLock()
	defer mu.RUnlock()

	if _, ok := inMemoryMap[bucket]; !ok {
		return
	}

	arr := inMemoryMap[bucket].Webhooks
	for i, v := range arr {
		if v.ID == webhookID {
			inMemoryMap[bucket].Webhooks = append(arr[:i], arr[i+1:]...)
			return
		}
	}
}

func deleteBucket(bucket string) {
	mu.RLock()
	defer mu.RUnlock()

	delete(inMemoryMap, bucket)
}

func getBucketConfig(bucket string) *Bucket {
	mu.RLock()
	defer mu.RUnlock()

	if _, ok := inMemoryMap[bucket]; !ok {
		inMemoryMap[bucket] = &Bucket{
			ResponseStatusCode: 200,
			ResponseBody:       `{"webhook":"stored"}`,
		}
	}

	return inMemoryMap[bucket]
}

func setBucketConfig(bucket string, responseStatus int, responseBody string) {
	mu.RLock()
	defer mu.RUnlock()

	if _, ok := inMemoryMap[bucket]; !ok {
		inMemoryMap[bucket] = &Bucket{}
	}

	inMemoryMap[bucket].ResponseBody = responseBody
	inMemoryMap[bucket].ResponseStatusCode = responseStatus
}
