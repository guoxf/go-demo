package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

type ResponseData struct {
	Fid      string `json:"fid"`
	FileName string `json:"fileName"`
	FileUrl  string `json:"fileUrl"`
	Size     int    `json:"size"`
}

type RequestData struct {
	FileName string `json:"fileName"`
	Data     []byte `json:"data"`
}

// Creates a new file upload http request with optional extra params
func newfileUploadRequest(uri string, params map[string]string, paramName, path string) (*http.Request, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile(paramName, filepath.Base(path))
	if err != nil {
		return nil, err
	}
	_, err = io.Copy(part, file)

	for key, val := range params {
		_ = writer.WriteField(key, val)
	}
	err = writer.Close()
	if err != nil {
		return nil, err
	}
	return http.NewRequest("POST", uri, body)
}

func main() {
	request, err := newfileUploadRequest("http://localhost:9334/submit", map[string]string{}, "file", "./test.txt")
	if err != nil {
		log.Fatal(err)
	}
	request.Header.Set("Content-Type", "multipart/form-data")
	client := &http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		log.Fatal(err)
	} else {
		body := &bytes.Buffer{}
		_, err := body.ReadFrom(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		resp.Body.Close()
		fmt.Println(resp.StatusCode)
		fmt.Println(resp.Header)
		fmt.Println(body)
	}
}
