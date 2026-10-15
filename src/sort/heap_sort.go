package sort

func HeapSort(a []int) []int {
	// 1. Build a max heap from the unsorted array.
	for i := len(a)/2 - 1; i >= 0; i-- {
		sink(a, i, len(a))
	}
	// 2. Move the largest value to the end, then restore the heap.
	for i := len(a) - 1; i >= 1; i-- {
		// Fill the result from right to left.
		swap(a, 0, i)
		// Exclude the value that was just placed.
		sink(a, 0, i)
	}
	return a
}
func sink(a []int, i int, length int) {
	for {
		// With zero-based indexing, the left child is i*2+1.
		l := i*2 + 1
		// Right-child index.
		r := i*2 + 2
		// idx tracks the largest value among the root and its children.
		idx := i
		// Use the left child when it exists and is larger.
		if l < length && a[l] > a[idx] {
			idx = l
		}
		// Use the right child when it exists and is larger.
		if r < length && a[r] > a[idx] {
			idx = r
		}
		// The heap property already holds.
		if idx == i {
			break
		}
		// Move the smaller root down until the heap property is restored.
		swap(a, i, idx)
		// Continue sinking the displaced value.
		i = idx
	}
}
func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}
