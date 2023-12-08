package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		fmt.Println("$PORT must be set. Defaulted to 8080")
		port = "8080"
	}

	// Start server
	r := gin.Default()
	r.Use(CORSMiddleware())

	// *************** SITE **************
	// Public Static Resources
	r.GET("/", func(c *gin.Context) { http.ServeFile(c.Writer, c.Request, "./site/build/index.html") })
	r.GET("/manifest.json", func(c *gin.Context) { http.ServeFile(c.Writer, c.Request, "./site/build/manifest.json") })
	publicSite := r.Group("/static")
	publicSite.Static("/", "./site/build/static")

	// // *************** API **************
	public := r.Group("/api")
	public.POST("/:bucket_id/catch", CatchRequest)
	public.PATCH("/:bucket_id/catch", CatchRequest)
	public.PUT("/:bucket_id/catch", CatchRequest)
	public.DELETE("/:bucket_id/catch", CatchRequest)
	public.HEAD("/:bucket_id/catch", CatchRequest)
	public.GET("/:bucket_id/catch", CatchRequest)

	// Bucket webhook
	public.GET("/:bucket_id/check", Check)
	public.POST("/:bucket_id/delete/:webhook_id", DeleteWebhook)
	public.POST("/:bucket_id/delete", DeleteBucket)

	// Bucket config
	public.GET("/:bucket_id/config", GetBucketConfig)
	public.POST("/:bucket_id/config", SetBucketConfig)

	r.Run(":" + port)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
