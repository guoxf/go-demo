package main

import (
	"bytes"
	//	"encoding/json"
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
	if err != nil {
		return nil, err
	}

	for key, val := range params {
		err = writer.WriteField(key, val)
		if err != nil {
			return nil, err
		}
	}
	err = writer.Close()
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest("POST", uri, body)
	if err != nil {
		return nil, err
	}
	//如果不设置会报request Content-Type isn't multipart/form-data
	req.Header.Set("Content-Type", writer.FormDataContentType())
	return req, nil
}

func main() {
	//fmt.Println(Upload("test.txt"))
	request, err := newfileUploadRequest("http://localhost:8888/food/", map[string]string{"aa": "12"}, "file", "test.txt")
	if err != nil {
		log.Fatal(err)
		return
	}
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
		//		if resp.StatusCode == http.StatusCreated {
		//			var rep ResponseData
		//			err = json.Unmarshal(body.Bytes(), &rep)
		//			fmt.Println(rep, err)
		//		} else {
		fmt.Println(body)
		//		}

	}
}
