package main

import (
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func Check(c *gin.Context) {
	bucketID := c.Params.ByName("bucket_id")
	idx, _ := strconv.Atoi(c.Query("idx"))

	events := getRequests(bucketID, idx)

	c.JSON(http.StatusOK, events)
}

func DeleteWebhook(c *gin.Context) {
	bucketID := c.Params.ByName("bucket_id")
	webhookID, err := strconv.Atoi(c.Params.ByName("webhook_id"))
	if err != nil {
		c.JSON(400, err.Error())
		return
	}

	deleteWebhook(bucketID, webhookID)

	c.JSON(http.StatusOK, "")
}

func DeleteBucket(c *gin.Context) {
	bucketID := c.Params.ByName("bucket_id")
	deleteBucket(bucketID)
	c.JSON(http.StatusOK, "")
}

func CatchRequest(c *gin.Context) {
	var headers []string
	for k, v := range c.Request.Header {
		headers = append(headers, fmt.Sprintf("%s: %v", k, v))
	}

	jsonData, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(500, err.Error())
		return
	}

	catched := CatchedRequest{
		URL:       c.Request.URL.Path,
		Headers:   headers,
		Timestamp: time.Now(),
		Method:    c.Request.Method,
		Body:      string(jsonData),
	}

	bucketID := c.Params.ByName("bucket_id")
	saveRequest(bucketID, catched)

	c.JSON(http.StatusOK, `{"status":"stored"}`)
}
