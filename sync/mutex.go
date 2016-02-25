// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Package sync provides basic synchronization primitives such as mutual
// exclusion locks.  Other than the Once and WaitGroup types, most are intended
// for use by low-level library routines.  Higher-level synchronization is
// better done via channels and communication.
//
// Values containing the types defined in this package should not be copied.
package main

import (
	"fmt"
	"sync/atomic"
	"time"
)

// A Mutex is a mutual exclusion lock.
// Mutexes can be created as part of other structures;
// the zero value for a Mutex is an unlocked mutex.
type Mutex struct {
	state int32
	sema  uint32
}

const (
	mutexLocked = 1 << iota // mutex is locked
	mutexWoken
	mutexWaiterShift = iota
)

// Lock locks m.
// If the lock is already in use, the calling goroutine
// blocks until the mutex is available.
func (m *Mutex) Lock(name string) {
	// Fast path: grab unlocked mutex.
	if atomic.CompareAndSwapInt32(&m.state, 0, mutexLocked) {
		//		if raceenabled {
		//			raceAcquire(unsafe.Pointer(m))
		//		}
		fmt.Printf("%s取得锁\n", name)
		return
	}

	awoke := false
	iter := 0
	for {
		old := m.state
		new := old | mutexLocked
		fmt.Printf("%s:old=%d,new=%d\n", name, old, new)
		// 如果不等于0，表示当前是锁住状态
		fmt.Printf("%s:old&mutexLocked=%d\n", name, old&mutexLocked)
		if old&mutexLocked != 0 {
			// 自旋锁
			//if runtime_canSpin(iter) {
			if iter < 10000 {
				// Active spinning makes sense.
				// Try to set mutexWoken flag to inform Unlock
				// to not wake other blocked goroutines.
				if !awoke && old&mutexWoken == 0 && old>>mutexWaiterShift != 0 &&
					atomic.CompareAndSwapInt32(&m.state, old, old|mutexWoken) {
					fmt.Printf("%s:awoke=%v,old&mutexWoken=%d,old>>mutexWaiterShift=%d,old|mutexWoken=%d\n", name, awoke, old&mutexWoken, old>>mutexWaiterShift, old|mutexWoken)
					awoke = true
				}
				//runtime_doSpin()
				iter++
				continue
			}
			new = old + 1<<mutexWaiterShift
			fmt.Printf("%s:new=%d\n", name, new)
		}
		if awoke {
			fmt.Printf("%s:awoke=true,new&mutexWoken=%d\n", name, new&mutexWoken)
			// The goroutine has been woken from sleep,
			// so we need to reset the flag in either case.
			if new&mutexWoken == 0 {
				panic("sync: inconsistent mutex state:" + name)
			}
			new &^= mutexWoken
		}
		if atomic.CompareAndSwapInt32(&m.state, old, new) {
			fmt.Printf("%s:CompareAndSwapInt32=true,old&mutexLocked=%d\n", name, old&mutexLocked)
			if old&mutexLocked == 0 {
				fmt.Printf("%s取得锁\n", name)
				break
			}
			//runtime_Semacquire(&m.sema)
			awoke = true
			iter = 0
		}
	}

	//	if raceenabled {
	//		raceAcquire(unsafe.Pointer(m))
	//	}
}

// Unlock unlocks m.
// It is a run-time error if m is not locked on entry to Unlock.
//
// A locked Mutex is not associated with a particular goroutine.
// It is allowed for one goroutine to lock a Mutex and then
// arrange for another goroutine to unlock it.
func (m *Mutex) Unlock(name string) {
	//	if raceenabled {
	//		_ = m.state
	//		raceRelease(unsafe.Pointer(m))
	//	}

	// Fast path: drop lock bit.
	new := atomic.AddInt32(&m.state, -mutexLocked)
	if (new+mutexLocked)&mutexLocked == 0 {
		panic("sync: unlock of unlocked mutex:" + name)
	}

	old := new
	for {
		// If there are no waiters or a goroutine has already
		// been woken or grabbed the lock, no need to wake anyone.
		if old>>mutexWaiterShift == 0 || old&(mutexLocked|mutexWoken) != 0 {
			fmt.Printf("%s解锁成功\n", name)
			return
		}
		// Grab the right to wake someone.
		new = (old - 1<<mutexWaiterShift) | mutexWoken
		if atomic.CompareAndSwapInt32(&m.state, old, new) {
			//runtime_Semrelease(&m.sema)
			fmt.Printf("%s解锁成功\n", name)
			return
		}
		old = m.state
	}
}

var mutex Mutex

func main() {
	n := 10
	ch := make(chan int, n)
	for i := 0; i < n; i++ {
		go func(i int) {
			mutex.Lock(fmt.Sprintf("Thread %d", i))
			defer mutex.Unlock(fmt.Sprintf("Thread %d", i))
			time.Sleep(3 * time.Millisecond)
			ch <- 1
		}(i)
	}
	for i := 0; i < n; i++ {
		<-ch
	}
}
