package stack

import "testing"

func TestStack(t*testing.T){
	s:=Stack{}
	s.Push(1)
	s.Push(2)
	s.Push(3)
	t.Log(s.String())
	t.Log(s.Pop())
	t.Log(s.Pop())
	t.Log(s.Pop())
	t.Log(s.String())
}