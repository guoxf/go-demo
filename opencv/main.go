package main

import (
	"os"

	cv "github.com/lazywei/go-opencv/opencv"
	"gobot.io/x/gobot"
	"gobot.io/x/gobot/platforms/opencv"
)

func main() {
	window := opencv.NewWindowDriver()
	camera := opencv.NewCameraDriver(0)

	work := func() {
		camera.On(camera.Event("frame"), func(data interface{}) {
			cv.SaveImage("test1.jpg", data.(*cv.IplImage), []int{})
			os.Exit(0)
			window.ShowImage(data.(*cv.IplImage))
		})
	}

	robot := gobot.NewRobot("cameraBot",
		[]gobot.Device{window, camera},
		work,
	)

	robot.Start()
}
