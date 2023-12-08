package main

import (
	"time"
)

const toKeep = 30

type (
	CatchedRequest struct {
		ID        int       `json:"id"`
		URL       string    `json:"url"`
		Headers   []string  `json:"headers"`
		Method    string    `json:"method"`
		Body      string    `json:"body"`
		Timestamp time.Time `json:"timestamp"`
	}

	Bucket struct {
		Webhooks           []CatchedRequest `json:"-"`
		ResponseStatusCode int              `json:"status_code"`
		ResponseBody       string           `json:"response_body"`
	}
)
