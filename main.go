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

	// *************** SITE **************
	// Public Static Resources
	r.GET("/", func(c *gin.Context) { http.ServeFile(c.Writer, c.Request, "./site/build/index.html") })
	r.GET("/manifest.json", func(c *gin.Context) { http.ServeFile(c.Writer, c.Request, "./site/build/manifest.json") })
	publicSite := r.Group("/site")
	publicSite.Static("/static", "./site/build")

	// // *************** API **************
	public := r.Group("/api")
	public.POST("/:bucket_id/catch", CatchRequest)
	public.GET("/:bucket_id/catch", CatchRequest)
	public.GET("/:bucket_id/check", Check)

	r.Run(":" + port)
}
