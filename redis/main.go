package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/garyburd/redigo/redis"
)

type User struct {
	Name string
	Age  int
}

func main() {
	conn, err := redis.DialTimeout("tcp", "127.0.0.1:6379", 0, 1*time.Second, 1*time.Second)
	defer conn.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	user1 := User{"Jhon", 20}
	user2 := User{"Nissa", 18}
	b1, err := json.Marshal(user1)
	b2, err := json.Marshal(user2)
	_, err = conn.Do("SET", "user:user1", b1)
	_, err = conn.Do("SET", "user:user2", b2)
	_, err = conn.Do("LPUSH", "users", b1)
	_, err = conn.Do("LPUSH", "users", b2)
	b3, err := redis.Bytes(conn.Do("GET", "user:user1"))
	b4, err := redis.Bytes(conn.Do("GET", "user:user2"))
	var (
		user3 User
		user4 User
		user5 User
	)
	json.Unmarshal(b3, &user3)
	json.Unmarshal(b4, &user4)
	fmt.Println("User 3 is:", user3)
	fmt.Println("User 4 is:", user4)

	b5, err := redis.Bytes(conn.Do("LPOP", "users"))
	json.Unmarshal(b5, &user5)
	fmt.Println("User 5 is:", user5)
	// _, err = conn.Do("SET", "user:user0", 123)
	// _, err = conn.Do("SET", "user:user1", 456)
	// _, err = conn.Do("SET", "user:user3", 789)
	// _, err = conn.Do("APPEND", "user:user0", 87)

	// user3, err := redis.Int(conn.Do("GET", "user:user0"))
	// user4, err := redis.Int(conn.Do("GET", "user:user1"))
	// fmt.Println("user0 is ", user0, ", user1 is ", user1)

	size, err := conn.Do("DBSIZE")
	if err == nil {
		fmt.Println("size is ", size)
	} else {
		fmt.Println(err)
	}
}
