/*
 *练习：等价二叉树
1. 实现 Walk 函数。

2. 测试 Walk 函数。

函数 tree.New(k) 构造了一个随机结构的二叉树，保存了值 `k`，`2k`，`3k`，...，`10k`。 创建一个新的 channel ch 并且对其进行步进：

go Walk(tree.New(1), ch)
然后从 channel 中读取并且打印 10 个值。应当是值 1，2，3，...，10。

3. 用 Walk 实现 Same 函数来检测是否 t1 和 t2 存储了相同的值。

4. 测试 Same 函数。

`Same(tree.New(1), tree.New(1))` 应当返回 true，而 `Same(tree.New(1), tree.New(2))` 应当返回 false。
*/
package treewalk

import "code.google.com/p/go-tour/tree"

// Walk 步进 tree t 将所有的值从 tree 发送到 channel ch。
func Walk(t *tree.Tree, ch chan int) {
	if t == nil {
		return
	}
	Walk(t.Left, ch)
	ch <- t.Value
	Walk(t.Right, ch)
	//println(t.Value)
}

// Same 检测树 t1 和 t2 是否含有相同的值。
func Same(t1, t2 *tree.Tree) bool {
	ch1, ch2 := make(chan int), make(chan int)
	go func() {
		Walk(t1, ch1)
		ch1 <- 0
	}()
	go func() {
		Walk(t2, ch2)
		ch2 <- 0
	}()

	for {
		v1, v2 := <-ch1, <-ch2
		if v1 == 0 && v2 == 0 {
			return true
		}
		if v1 == v2 {
			continue
		} else {
			return false
		}
	}
	return true
}

func main() {
	ch := make(chan int)
	go func() {
		Walk(tree.New(1), ch)
		ch <- 0
	}()
	for {
		t := <-ch
		if t == 0 {
			break
		}
		println(t)
	}

	println(Same(tree.New(1), tree.New(1)))
	println(Same(tree.New(1), tree.New(2)))
}
