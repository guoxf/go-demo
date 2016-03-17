package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/ginuerzh/weedo"
)

type ResponseData struct {
	Fid      string `json:"fid"`
	FileName string `json:"fileName"`
	FileUrl  string `json:"fileUrl"`
	Size     int    `json:"size"`
}

type FilerResponse struct {
	Name string `json:"name"`
	Size []byte `json:"size"`
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
	downFile("http://localhost:8888/image/plate_detect.jpg")
	downFile("http://localhost:8888/submit/test.txt")
}

func testSubmit() {
	request, err := newfileUploadRequest("http://localhost:9333/submit", map[string]string{"aa": "12"}, "upload", "plate_detect.jpg")
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
		if resp.StatusCode == http.StatusCreated {
			var rep ResponseData
			err = json.Unmarshal(body.Bytes(), &rep)
			fmt.Println(rep, err)
		} else {
			fmt.Println(body)
		}

	}
}

func testFiler() {
	request, err := newfileUploadRequest("http://localhost:8888/image/", map[string]string{"aa": "12"}, "file", "plate_detect.jpg")
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
		if resp.StatusCode == http.StatusCreated {
			var rep FilerResponse
			err = json.Unmarshal(body.Bytes(), &rep)
			fmt.Println(rep, err)
		} else {
			fmt.Println(body)
		}

	}
}

func testWeedo() {
	client := weedo.NewClient("localhost:9333", "localhost:8888")
	dir, err := client.Filer("localhost:8888").Dir("/")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(dir)
}

func downFile(url string) (pix []byte, err error) {
	path := strings.Split(url, "/")
	var name string
	if len(path) > 1 {
		name = path[len(path)-1]
	}
	fmt.Println(name)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	pix, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(pix))
	return
}

func saveFile(b []byte, name string) (int64, error) {
	out, err := os.Create(name)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}
	defer out.Close()
	return io.Copy(out, bytes.NewReader(b))
}
