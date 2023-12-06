package main

import (
	"net/http"

	"flag"

	"github.com/gin-gonic/gin"
)

func main() {
	port := flag.Int("port", -1, "specify a port to use http rather than AWS Lambda")
	flag.Parse()

	if port == nil {
		p := 8080
		port = &p
	}

	// port := os.Getenv("PORT")
	// if port == "" {
	// 	fmt.Println("$PORT must be set. Defaulted to 8080")
	// 	port = "8080"
	// }

	// Start server
	r := gin.Default()

	// *************** SITE **************
	// Public Static Resources
	r.GET("/", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "./site/build/index.html")
	})
	publicSite := r.Group("/site")
	publicSite.Static("/", "./site/build")

	// // *************** API **************
	public := r.Group("/api")
	public.POST("/:bucket_id/catch", CatchRequest)
	public.GET("/:bucket_id/catch", CatchRequest)
	public.GET("/:bucket_id/check", Check)

	r.Run(":" + string(*port))
}
