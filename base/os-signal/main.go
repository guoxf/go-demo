package main

import (
	"os"
	"os/signal"
)

func main() {
	c := make(chan os.Signal)
	signal.Notify(c)
	<-c
}
