package server

import "testing"

func TestBase64(t *testing.T) {
	hello := "hello world"
	debyte := base64Encode([]byte(hello))

	enbyte, err := base64Decode(debyte)
	if err != nil {
		t.Error("hello is not equal to enbyte")
	}
	t.Log(enbyte)
}
