package main

import (
	"fmt"
	"time"
)

func main() {
	for {
		fmt.Println("Alerter service is running...")
		time.Sleep(10 * time.Second)
	}
}
