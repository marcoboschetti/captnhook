package main

import (
	"fmt"
	"sync"
	"time"
)

type CatchedRequest struct {
	ID        int       `json:"id"`
	URL       string    `json:"url"`
	Headers   []string  `json:"headers"`
	Method    string    `json:"method"`
	Body      string    `json:"body"`
	Timestamp time.Time `json:"timestamp"`
}

const toKeep = 30

var (
	inMemoryMap  = map[string][]CatchedRequest{}
	curRequestId = 100
	mu           = sync.RWMutex{}
)

func saveRequest(bucket string, request CatchedRequest) {
	mu.Lock()
	defer mu.Unlock()

	request.ID = curRequestId
	curRequestId++

	inMemoryMap[bucket] = append(inMemoryMap[bucket], request)
	if len(inMemoryMap[bucket]) > toKeep {
		l := len(inMemoryMap[bucket])
		inMemoryMap[bucket] = inMemoryMap[bucket][l-toKeep : l]
	}
}

func getRequests(bucket string, index int) []CatchedRequest {
	mu.RLock()
	defer mu.RUnlock()

	var ans []CatchedRequest
	for _, v := range inMemoryMap[bucket] {
		if v.ID >= index {
			ans = append(ans, v)
		}
	}
	return ans
}

func deleteWebhook(bucket string, webhookID int) {
	mu.RLock()
	defer mu.RUnlock()

	arr := inMemoryMap[bucket]
	for i, v := range arr {
		fmt.Println(v.ID, "==", webhookID)

		if v.ID == webhookID {
			fmt.Println("FOUND")
			inMemoryMap[bucket] = append(arr[:i], arr[i+1:]...)
			return
		}
	}
}

func deleteBucket(bucket string) {
	mu.RLock()
	defer mu.RUnlock()

	delete(inMemoryMap, bucket)
}
