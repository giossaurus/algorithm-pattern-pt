# Ordenação

## Ordenações mais cobradas

### Quicksort

```go
func QuickSort(nums []int) []int {
    // Idea: split an array into a left and a right part, where the left part is smaller than the right part
    quickSort(nums, 0, len(nums)-1)
    return nums

}
// In-place swap, so we pass in the swap indices
func quickSort(nums []int, start, end int) {
    if start < end {
        // Divide and conquer: divide
        pivot := partition(nums, start, end)

        quickSort(nums, start, pivot-1)
        quickSort(nums, pivot+1, end)
    }
}
// Partition
func partition(nums []int, start, end int) int {
    // Choose the last element as the pivot
    p := nums[end]
    i := start
    // The last value is the pivot, so no need to compare it
    for j := start; j < end; j++ {
        if nums[j] < p {
            swap(nums, i, j)
            i++
        }
    }
    // Swap the pivot value into the middle
    swap(nums, i, end)
    return i
}
// Swap two elements
func swap(nums []int, i, j int) {
    t := nums[i]
    nums[i] = nums[j]
    nums[j] = t
}
```

### Merge sort

```go
func MergeSort(nums []int) []int {
    return mergeSort(nums)
}
func mergeSort(nums []int) []int {
    if len(nums) <= 1 {
        return nums
    }
    // Divide and conquer: divide into two parts
    mid := len(nums) / 2
    left := mergeSort(nums[:mid])
    right := mergeSort(nums[mid:])
    // Merge the two parts of data
    result := merge(left, right)
    return result
}
func merge(left, right []int) (result []int) {
    // Cursors for merging the two arrays
    l := 0
    r := 0
    // Be careful not to go out of bounds
    for l < len(left) && r < len(right) {
        // Merge whichever is smaller
        if left[l] > right[r] {
            result = append(result, right[r])
            r++
        } else {
            result = append(result, left[l])
            l++
        }
    }
    // Merge the remaining parts
    result = append(result, left[l:]...)
    result = append(result, right[r:]...)
    return
}
```

### Heap sort

Uma árvore binária perfeita representada por um array (árvore binária completa)

> Árvore binária perfeita VS outras árvores binárias

![image.png](../../images/tree_type.png)

[Demonstração animada](https://www.bilibili.com/video/av18980178/)

![image.png](../../images/heap.png)

Código principal

```go
package main

func HeapSort(a []int) []int {
    // 1. Unsorted array a
	// 2. Build the unsorted array a into a max-heap
	for i := len(a)/2 - 1; i >= 0; i-- {
		sink(a, i, len(a))
	}
	// 3. Swap a[0] and a[len(a)-1]
	// 4. Then keep sinking the front part of the array to maintain the heap structure, looping like this
	for i := len(a) - 1; i >= 1; i-- {
		// Fill in values from back to front
		swap(a, 0, i)
		// Decrease the length of the front part by one as well
		sink(a, 0, i)
	}
	return a
}
func sink(a []int, i int, length int) {
	for {
		// Left child index (0-based, so the left child is i*2+1)
		l := i*2 + 1
		// Right child index
		r := i*2 + 2
		// idx holds the index of the largest among the root, left, and right
		idx := i
		// If a left child exists and its value is larger, take the left child
		if l < length && a[l] > a[idx] {
			idx = l
		}
		// If a right child exists and its value is larger, take the right child
		if r < length && a[r] > a[idx] {
			idx = r
		}
		// If the root is the largest, no need to sink
		if idx == i {
			break
		}
		// If the root is smaller, swap the values and keep sinking
		swap(a, i, idx)
		// Continue sinking the idx node
		i = idx
	}
}
func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}

```

## Referências

[Os 10 algoritmos de ordenação clássicos](https://www.cnblogs.com/onepixel/p/7674659.html)

[Heap binário](https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/er-cha-dui-xiang-jie-shi-xian-you-xian-ji-dui-lie)

## Prática

- [ ] Implementar à mão quicksort, merge sort e heap sort
