# Árvore binária

## Conceitos-chave

### Travessia de árvore binária

**Travessia de pré-encomenda**: **visite o nó raiz primeiro**, depois pré-ordene-percorra a subárvore esquerda e, em seguida, pré-ordene-percorra a subárvore direita
**Travessia em ordem**: primeiro percorra em ordem a subárvore esquerda, **então visite o nó raiz**, então atravesse em ordem a subárvore direita
**Travessia de pós-ordem**: primeiro percorra pós-ordem a subárvore esquerda, depois percorra pós-ordem a subárvore direita, **então visite o nó raiz**

Notas

- A ordem em que a raiz é visitada determina qual travessia ela é
- A subárvore esquerda sempre leva prioridade sobre a subárvore certa

#### Pré-encomenda (recursiva)

```go
func preorderTraversal(root *TreeNode)  {
    if root==nil{
        return
    }
    // visit the root first, then left and right
    fmt.Println(root.Val)
    preorderTraversal(root.Left)
    preorderTraversal(root.Right)
}
```

#### Pré-encomenda (iterativa)

```go
// V3: iterative traversal
func preorderTraversal(root *TreeNode) []int {
    // iterative
    if root == nil{
        return nil
    }
    result:=make([]int,0)
    stack:=make([]*TreeNode,0)

    for root!=nil || len(stack)!=0{
        for root !=nil{
            // preorder, so save the result first
            result=append(result,root.Val)
            stack=append(stack,root)
            root=root.Left
        }
        // pop
        node:=stack[len(stack)-1]
        stack=stack[:len(stack)-1]
        root=node.Right
    }
    return result
}
```

#### Em ordem (iterativa)

```go
// Idea: use a stack to save already-visited elements so we can backtrack
func inorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    if root == nil {
        return result
    }
    stack := make([]*TreeNode, 0)
    for len(stack) > 0 || root != nil {
        for root != nil {
            stack = append(stack, root)
            root = root.Left // keep going left
        }
        // pop
        val := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append(result, val.Val)
        root = val.Right
    }
    return result
}
```

#### Pós-ordem (iterativa)

```go
func postorderTraversal(root *TreeNode) []int {
	// use lastVisit to mark whether the right child has already been popped
	if root == nil {
		return nil
	}
	result := make([]int, 0)
	stack := make([]*TreeNode, 0)
	var lastVisit *TreeNode
	for root != nil || len(stack) != 0 {
		for root != nil {
			stack = append(stack, root)
			root = root.Left
		}
		// just peek here, do not pop yet
		node:= stack[len(stack)-1]
		// the root node must be popped only after the right node is popped
		if node.Right == nil || node.Right == lastVisit {
			stack = stack[:len(stack)-1] // pop
			result = append(result, node.Val)
			// mark that the current node has been popped
			lastVisit = node
		} else {
			root = node.Right
		}
	}
	return result
}
```

Notas

- A ideia central: o nó raiz deve ser exibido somente depois que o nó direito for exibido

#### Pesquisa em profundidade DFS - de cima para baixo

```go
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func preorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    dfs(root, &result)
    return result
}

// V1: depth-first traversal, passing a pointer to the result into the function
func dfs(root *TreeNode, result *[]int) {
    if root == nil {
        return
    }
    *result = append(*result, root.Val)
    dfs(root.Left, result)
    dfs(root.Right, result)
}
```

#### Pesquisa em profundidade DFS - de baixo para cima (dividir e conquistar)

```go
// V2: traversal using divide and conquer
func preorderTraversal(root *TreeNode) []int {
    result := divideAndConquer(root)
    return result
}
func divideAndConquer(root *TreeNode) []int {
    result := make([]int, 0)
    // return condition (null & leaf)
    if root == nil {
        return result
    }
    // Divide
    left := divideAndConquer(root.Left)
    right := divideAndConquer(root.Right)
    // Conquer (merge results)
    result = append(result, root.Val)
    result = append(result, left...)
    result = append(result, right...)
    return result
}
```

Notas:

> A diferença entre DFS (de cima para baixo) e dividir e conquistar: o primeiro geralmente passa o resultado final por meio de um parâmetro de ponteiro, enquanto o último geralmente retorna resultados de recursão e os mescla no final

#### BFS Level-Order Traversal

```go
func levelOrder(root *TreeNode) [][]int {
    // use the length of the previous level to determine the elements of the next level
    result := make([][]int, 0)
    if root == nil {
        return result
    }
    queue := make([]*TreeNode, 0)
    queue = append(queue, root)
    for len(queue) > 0 {
        list := make([]int, 0)
        // why take the length?
        // record how many elements are in the current level (traverse the current level, then add the next level)
        l := len(queue)
        for i := 0; i < l; i++ {
            // dequeue
            level := queue[0]
            queue = queue[1:]
            list = append(list, level.Val)
            if level.Left != nil {
                queue = append(queue, level.Left)
            }
            if level.Right != nil {
                queue = append(queue, level.Right)
            }
        }
        result = append(result, list)
    }
    return result
}
```

### Aplicações de divisão e conquista

Processe as partes separadamente primeiro e depois mescle os resultados

Cenários aplicáveis

- Quicksort
- Mesclar classificação
- Problemas relacionados à árvore binária

Dividir e conquistar modelo

- Condição de retorno de recursão
- Processar cada parte
- Mesclar resultados

```go
func traversal(root *TreeNode) ResultType  {
    // nil or leaf
    if root == nil {
        // do something and return
    }

    // Divide
    ResultType left = traversal(root.Left)
    ResultType right = traversal(root.Right)

    // Conquer
    ResultType result = Merge from left and right

    return result
}
```

#### Exemplo típico

```go
// V2: traverse the binary tree using divide and conquer
func preorderTraversal(root *TreeNode) []int {
    result := divideAndConquer(root)
    return result
}
func divideAndConquer(root *TreeNode) []int {
    result := make([]int, 0)
    // return condition (null & leaf)
    if root == nil {
        return result
    }
    // Divide
    left := divideAndConquer(root.Left)
    right := divideAndConquer(root.Right)
    // Conquer (merge results)
    result = append(result, root.Val)
    result = append(result, left...)
    result = append(result, right...)
    return result
}
```

#### Mesclar classificação

```go
func MergeSort(nums []int) []int {
    return mergeSort(nums)
}
func mergeSort(nums []int) []int {
    if len(nums) <= 1 {
        return nums
    }
    // divide and conquer: divide into two halves
    mid := len(nums) / 2
    left := mergeSort(nums[:mid])
    right := mergeSort(nums[mid:])
    // merge the two halves
    result := merge(left, right)
    return result
}
func merge(left, right []int) (result []int) {
    // cursors for merging the two arrays
    l := 0
    r := 0
    // be careful not to go out of bounds
    for l < len(left) && r < len(right) {
        // merge whichever is smaller
        if left[l] > right[r] {
            result = append(result, right[r])
            r++
        } else {
            result = append(result, left[l])
            l++
        }
    }
    // merge the remaining parts
    result = append(result, left[l:]...)
    result = append(result, right[r:]...)
    return
}
```

Notas

> A recursão precisa retornar resultados para mesclagem

#### Quicksort

```go
func QuickSort(nums []int) []int {
	// Idea: split an array into left and right halves where the left half is less than the right half; like divide and conquer but without a merge step
	quickSort(nums, 0, len(nums)-1)
	return nums

}
// in-place swap, so we pass in the swap indices
func quickSort(nums []int, start, end int) {
	if start < end {
        // divide and conquer: divide
		pivot := partition(nums, start, end)
		quickSort(nums, start, pivot-1)
		quickSort(nums, pivot+1, end)
	}
}
// partition
func partition(nums []int, start, end int) int {
	p := nums[end]
	i := start
	for j := start; j < end; j++ {
		if nums[j] < p {
			swap(nums, i, j)
			i++
		}
	}
    // swap the middle value with the pivot used for comparison
	swap(nums, i, end)
	return i
}
func swap(nums []int, i, j int) {
	t := nums[i]
	nums[i] = nums[j]
	nums[j] = t
}
```

Notas:

> Como as trocas de classificação rápida estão em vigor, não há etapa de mesclagem
> Os índices passados ​​​​devem ser índices válidos (por exemplo, 0, comprimento 1, etc.); sair dos limites pode causar um travamento

Exemplos de problemas comuns

#### profundidade máxima da árvore binária

[profundidade máxima da árvore binária](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

> Dada uma árvore binária, encontre seu máximo profundidade.

Ideia: dividir e conquistar

```go
func maxDepth(root *TreeNode) int {
    // handle the return condition
    if root == nil {
        return 0
    }
    // divide: compute the left and right subtrees separately
    left := maxDepth(root.Left)
    right := maxDepth(root.Right)

    // conquer: merge the results of the left and right subtrees
    if left > right {
        return left + 1
    }
    return right + 1
}
```

#### árvore binária balanceada

[árvore binária balanceada](https://leetcode-cn.com/problems/balanced-binary-tree/)

> Dada uma árvore binária, determine se ela é uma árvore binária com altura balanceada.

Ideia: dividir e conquistar - o lado esquerdo está balanceado && o lado direito está balanceado && a diferença de altura entre esquerda e direita <= 1.
Como precisamos retornar se está balanceado e a altura, retornamos dois valores ou combinamos os dois valores,
portanto, usamos -1 para indicar não balanceado e >0 para indicar a altura da árvore (ambiguidade: uma variável carregando dois significados).

```go
func isBalanced(root *TreeNode) bool {
    if maxDepth(root) == -1 {
        return false
    }
    return true
}
func maxDepth(root *TreeNode) int {
    // check
    if root == nil {
        return 0
    }
    left := maxDepth(root.Left)
    right := maxDepth(root.Right)

    // why return -1? (the variable carries two meanings)
    if left == -1 || right == -1 || left-right > 1 || right-left > 1 {
        return -1
    }
    if left > right {
        return left + 1
    }
    return right + 1
}
```

Nota

> Na prática geral de engenharia, o resultado é retornado por meio de duas variáveis; não é recomendado usar uma variável para representar dois significados

#### árvore binária-máximo-caminho-soma

[árvore binária-máximo-caminho-soma](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

> Dada uma árvore binária **não vazia**, retorne seu caminho máximo soma.

Ideia: dividir e conquistar, dividir em três casos: a subárvore esquerda tem a maior soma máxima de caminho, a subárvore direita tem a maior soma máxima de caminho, ou ambas as subárvores mais a raiz fornecem a maior soma. Precisamos manter duas variáveis: uma para salvar a soma máxima do caminho da subárvore e outra para salvar a soma de ambos os lados mais a raiz, então comparar essas duas variáveis ​​e escolher o máximo.

```go
type ResultType struct {
    SinglePath int // save the maximum value for a single side
    MaxPath int // save the maximum value (a single side, or two single sides + the root value)
}
func maxPathSum(root *TreeNode) int {
    result := helper(root)
    return result.MaxPath
}
func helper(root *TreeNode) ResultType {
    // check
    if root == nil {
        return ResultType{
            SinglePath: 0,
            MaxPath: -(1 << 31),
        }
    }
    // Divide
    left := helper(root.Left)
    right := helper(root.Right)

    // Conquer
    result := ResultType{}
    // compute the maximum value for a single side
    if left.SinglePath > right.SinglePath {
        result.SinglePath = max(left.SinglePath + root.Val, 0)
    } else {
        result.SinglePath = max(right.SinglePath + root.Val, 0)
    }
    // compute the maximum value of both sides plus the root
    maxPath := max(right.MaxPath, left.MaxPath)
    result.MaxPath = max(maxPath,left.SinglePath+right.SinglePath+root.Val)
    return result
}
func max(a,b int) int {
    if a > b {
        return a
    }
    return b
}
```

#### menor ancestral comum de uma árvore binária

[menor ancestral comum de uma árvore binária](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

> Dada uma árvore binária, encontre o menor ancestral comum de dois nós especificados no tree.

Ideia: dividir e conquistar — se houver um ancestral comum na subárvore esquerda ou um ancestral comum na subárvore direita, retorne o ancestral dessa subárvore; caso contrário, retorne o nó raiz

```go
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    // check
    if root == nil {
        return root
    }
    // if equal, just return the root node directly
    if root == p || root == q {
        return root
    }
    // Divide
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)


    // Conquer
    // if neither side is nil, then the root node is the ancestor
    if left != nil && right != nil {
        return root
    }
    if left != nil {
        return left
    }
    if right != nil {
        return right
    }
    return nil
}
```

### Aplicativos de ordem de nível BFS

#### travessia de ordem de nível de árvore binária

[travessia de ordem de nível de árvore binária](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

> Dada uma árvore binária, retorne os valores dos nós obtidos por **travessia de ordem de nível**. (ou seja, visitar todos os nós nível por nível, da esquerda para a direita)

Ideia: usar uma fila para registrar os elementos de um nível, depois verificar os elementos deste nível e adicionar os elementos do próximo nível à fila (cada número entra e sai uma vez, então a complexidade é O(logN))

```go
func levelOrder(root *TreeNode) [][]int {
	result := make([][]int, 0)
	if root == nil {
		return result
	}
	queue := make([]*TreeNode, 0)
	queue = append(queue, root)
	for len(queue) > 0 {
		list := make([]int, 0)
        // why take the length?
        // record how many elements are in the current level (traverse the current level, then add the next level)
		l := len(queue)
		for i := 0; i < l; i++ {
            // dequeue
			level := queue[0]
			queue = queue[1:]
			list = append(list, level.Val)
			if level.Left != nil {
				queue = append(queue, level.Left)
			}
			if level.Right != nil {
				queue = append(queue, level.Right)
			}
		}
		result = append(result, list)
	}
	return result
}
```

#### travessia de ordem de nível de árvore binária-ii

[travessia de ordem de nível de árvore binária-ii](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

> Dada uma árvore binária, retorne sua travessia de ordem de nível de baixo para cima dos valores dos nós. (ou seja, percorrer do nível dos nós folha até o nível da raiz, nível por nível, da esquerda para a direita)

Ideia: com base no percurso de ordem de nível, basta inverter o resultado

```go
func levelOrderBottom(root *TreeNode) [][]int {
    result := levelOrder(root)
    // reverse the result
    reverse(result)
    return result
}
func reverse(nums [][]int) {
	for i, j := 0, len(nums)-1; i < j; i, j = i+1, j-1 {
		nums[i], nums[j] = nums[j], nums[i]
	}
}
func levelOrder(root *TreeNode) [][]int {
	result := make([][]int, 0)
	if root == nil {
		return result
	}
	queue := make([]*TreeNode, 0)
	queue = append(queue, root)
	for len(queue) > 0 {
		list := make([]int, 0)
        // why take the length?
        // record how many elements are in the current level (traverse the current level, then add the next level)
		l := len(queue)
		for i := 0; i < l; i++ {
            // dequeue
			level := queue[0]
			queue = queue[1:]
			list = append(list, level.Val)
			if level.Left != nil {
				queue = append(queue, level.Left)
			}
			if level.Right != nil {
				queue = append(queue, level.Right)
			}
		}
		result = append(result, list)
	}
	return result
}
```

#### travessia de ordem de nível de ziguezague de árvore binária

[travessia de ordem de nível de ziguezague de árvore binária](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

> Dada uma árvore binária, retorne a travessia de ordem de nível em ziguezague de seus valores de nó. Travessia em Z

```go
func zigzagLevelOrder(root *TreeNode) [][]int {
	result := make([][]int, 0)
	if root == nil {
		return result
	}
	queue := make([]*TreeNode, 0)
	queue = append(queue, root)
	toggle := false
	for len(queue) > 0 {
		list := make([]int, 0)
		// record how many elements are in the current level (traverse the current level, then add the next level)
		l := len(queue)
		for i := 0; i < l; i++ {
			// dequeue
			level := queue[0]
			queue = queue[1:]
			list = append(list, level.Val)
			if level.Left != nil {
				queue = append(queue, level.Left)
			}
			if level.Right != nil {
				queue = append(queue, level.Right)
			}
		}
		if toggle {
			reverse(list)
		}
		result = append(result, list)
		toggle = !toggle
	}
	return result
}
func reverse(nums []int) {
	for i := 0; i < len(nums)/2; i++ {
		nums[i], nums[len(nums)-1-i] = nums[len(nums)-1-i], nums[i]
	}
}
```

### Aplicativos de árvore de pesquisa binária

#### Validate-binary-search-tree

[validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> Dada uma árvore binária, determine se ela é uma árvore de pesquisa binária válida. 1: travessia em ordem, verifique se a lista resultante já está ordenada

Ideia 2: dividir e conquistar, verifique se esquerda MAX <raiz <direita MIN

```go
// v1
func isValidBST(root *TreeNode) bool {
    result := make([]int, 0)
    inOrder(root, &result)
    // check order
    for i := 0; i < len(result) - 1; i++{
        if result[i] >= result[i+1] {
            return false
        }
    }
    return true
}

func inOrder(root *TreeNode, result *[]int)  {
    if root == nil{
        return
    }
    inOrder(root.Left, result)
    *result = append(*result, root.Val)
    inOrder(root.Right, result)
}


```

```go
// v2 divide and conquer
type ResultType struct {
	IsValid bool
    // record the max and min values of the left and right sides, to compare with the root node
	Max     *TreeNode
	Min     *TreeNode
}

func isValidBST2(root *TreeNode) bool {
	result := helper(root)
	return result.IsValid
}
func helper(root *TreeNode) ResultType {
	result := ResultType{}
	// check
	if root == nil {
		result.IsValid = true
		return result
	}

	left := helper(root.Left)
	right := helper(root.Right)

	if !left.IsValid || !right.IsValid {
		result.IsValid = false
		return result
	}
	if left.Max != nil && left.Max.Val >= root.Val {
		result.IsValid = false
		return result
	}
	if right.Min != nil && right.Min.Val <= root.Val {
		result.IsValid = false
		return result
	}

	result.IsValid = true
    // if there is an even smaller 3 on the left, use the smaller node instead of 4
    //  5
    // / \
    // 1   4
    //      / \
    //     3   6
	result.Min = root
	if left.Min != nil {
		result.Min = left.Min
	}
	result.Max = root
	if right.Max != nil {
		result.Max = right.Max
	}
	return result
}
```

#### inserir em uma árvore de pesquisa binária

[inserir em uma árvore de pesquisa binária](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

> Dado o nó raiz de uma árvore de pesquisa binária (BST) e um valor para inserir na árvore, insira o valor no BST. Retorne o nó raiz do BST após a inserção.

Ideia: encontre o último nó folha que satisfaça a condição de inserção

```go
// DFS to find the insertion position
func insertIntoBST(root *TreeNode, val int) *TreeNode {
    if root == nil {
        root = &TreeNode{Val: val}
        return root
    }
    if root.Val > val {
        root.Left = insertIntoBST(root.Left, val)
    } else {
        root.Right = insertIntoBST(root.Right, val)
    }
    return root
}
```

## Resumo

- Domine a travessia de árvore binária recursiva e iterativa
- Entenda a travessia de pré-ordem DFS e divida e conquiste
- Entenda a travessia de ordem de nível BFS

## Exercícios

- [] [profundidade máxima da árvore binária](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [ ] [árvore binária balanceada](https://leetcode-cn.com/problems/balanced-binary-tree/)
- [ ] [árvore binária-soma máxima do caminho](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)
- [ ] [menor ancestral comum de uma árvore binária](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- [ ] [travessia de ordem de nível de árvore binária](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
- [ ] [travessia de ordem de nível de árvore binária-ii](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)
- [ ] [árvore binária-zigzag-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)
- [ ] [validar-árvore-de-pesquisa-binária](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [ ] [inserir-em-uma-árvore-de-pesquisa-binária](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
