# Pilha e fila

## Introdução

A característica de uma pilha é último a entrar, primeiro a sair (LIFO).

![image.png](https://cdn.jsdelivr.net/gh/greyireland/algorithm-pattern@master/images/stack.png)

Com base nesta propriedade, podemos salvar temporariamente alguns dados e posteriormente colocá-los de volta em ordem quando necessário. É comumente usado em DFS (pesquisa em profundidade).

A fila é geralmente usada em BFS (pesquisa em largura), pesquisando camada por camada.

## Stack

[min-stack](https://leetcode-cn.com/problems/min-stack/)

> Projete uma pilha que suporte operações push, pop e top e possa recuperar o elemento mínimo em tempo constante.

Ideia: Implementar com duas pilhas; uma pilha mínima sempre mantém o valor mínimo no topo.

```go
type MinStack struct {
    min []int
    stack []int
}


/** initialize your data structure here. */
func Constructor() MinStack {
    return MinStack{
        min: make([]int, 0),
        stack: make([]int, 0),
    }
}


func (this *MinStack) Push(x int)  {
    min := this.GetMin()
    if x < min {
        this.min = append(this.min, x)
    } else {
        this.min = append(this.min, min)
    }
    this.stack = append(this.stack, x)
}


func (this *MinStack) Pop()  {
    if len(this.stack) == 0 {
        return
    }
    this.stack = this.stack[:len(this.stack)-1]
    this.min = this.min[:len(this.min)-1]
}


func (this *MinStack) Top() int {
    if len(this.stack) == 0 {
        return 0
    }
    return this.stack[len(this.stack)-1]
}


func (this *MinStack) GetMin() int {
    if len(this.min) == 0 {
        return 1 << 31
    }
    min := this.min[len(this.min)-1]
    return min
}


/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */
```

[avaliar-notação polonesa reversa](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

> **Avaliação da notação polonesa reversa** > **Entrada:** `["2", "1", "+", "3", "*"]` > **Saída:** 9
>
> **Explicação:** `((2 + 1) * 3) = 9`

Ideia: Use uma pilha para salvar os elementos originais; quando um operador for encontrado, pop e calcule e, em seguida, empurre o resultado de volta, repetindo esse processo.

```go
func evalRPN(tokens []string) int {
    if len(tokens)==0{
        return 0
    }
    stack:=make([]int,0)
    for i:=0;i<len(tokens);i++{
        switch tokens[i]{
        case "+","-","*","/":
            if len(stack)<2{
                return -1
            }
            // Note: a is the dividend, b is the divisor
            b:=stack[len(stack)-1]
            a:=stack[len(stack)-2]
            stack=stack[:len(stack)-2]
            var result int
            switch tokens[i]{
            case "+":
                result=a+b
            case "-":
                result=a-b
            case "*":
                result=a*b
            case "/":
                result=a/b
            }
            stack=append(stack,result)
        default:
            // Convert to a number
            val,_:=strconv.Atoi(tokens[i])
            stack=append(stack,val)
        }
    }
    return stack[0]
}
```

[decode-string](https://leetcode-cn.com/problems/decode-string/)

> Dada uma string codificada, retorne sua string decodificada.
> s = "3[a]2[bc]", retorna "aaabcbc".
> s = "3[a2[c]]", retorna "accaccacc".
> s = "2[abc]3[cd]ef", retorna "abcabccdcdcdef".

Ideia: Use uma pilha para auxiliar nas operações.

```go
func decodeString(s string) string {
	if len(s) == 0 {
		return ""
	}
	stack := make([]byte, 0)
	for i := 0; i < len(s); i++ {
		switch s[i] {
		case ']':
			temp := make([]byte, 0)
			for len(stack) != 0 && stack[len(stack)-1] != '[' {
				v := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				temp = append(temp, v)
			}
			// pop '['
			stack = stack[:len(stack)-1]
			// pop num
			idx := 1
			for len(stack) >= idx && stack[len(stack)-idx] >= '0' && stack[len(stack)-idx] <= '9' {
				idx++
			}
            // Pay attention to index boundaries
			num := stack[len(stack)-idx+1:]
			stack = stack[:len(stack)-idx+1]
			count, _ := strconv.Atoi(string(num))
			for j := 0; j < count; j++ {
                // Put the characters back onto the stack in forward order
				for j := len(temp) - 1; j >= 0; j-- {
					stack = append(stack, temp[j])
				}
			}
		default:
			stack = append(stack, s[i])

		}
	}
	return string(stack)
}
```

Modelo para pesquisa recursiva DFS usando uma pilha

```go
boolean DFS(int root, int target) {
    Set<Node> visited;
    Stack<Node> s;
    add root to s;
    while (s is not empty) {
        Node cur = the top element in s;
        return true if cur is target;
        for (Node next : the neighbors of cur) {
            if (next is not in visited) {
                add next to s;
                add next to visited;
            }
        }
        remove cur from s;
    }
    return false;
}
```

[travessia em ordem de árvore binária](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

> Dada uma árvore binária, retorne sua travessia *em ordem*.

```go
// Idea: use a stack to save the already-visited elements, so we can backtrack along the original path
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

[clone-graph](https://leetcode-cn.com/problems/clone-graph/)

> Dada uma referência a um nó em um gráfico conectado não direcionado, retorne uma cópia profunda (clone) do gráfico.

```go
func cloneGraph(node *Node) *Node {
    visited:=make(map[*Node]*Node)
    return clone(node,visited)
}
// 1 2
// 4 3
// Recursively clone, passing in the already-visited elements as a filter condition
func clone(node *Node,visited map[*Node]*Node)*Node{
    if node==nil{
        return nil
    }
    // If already visited, return directly
    if v,ok:=visited[node];ok{
        return v
    }
    newNode:=&Node{
        Val:node.Val,
        Neighbors:make([]*Node,len(node.Neighbors)),
    }
    visited[node]=newNode
    for i:=0;i<len(node.Neighbors);i++{
        newNode.Neighbors[i]=clone(node.Neighbors[i],visited)
    }
    return newNode
}
```

[número de ilhas](https://leetcode-cn.com/problems/number-of-islands/)

> Dada uma grade 2D composta por '1' (terra) e '0' (água), conte o número de ilhas. Uma ilha é cercada por água e é formada pela conexão de terras adjacentes horizontal ou verticalmente. Você pode assumir que todas as quatro bordas da grade estão cercadas por água.

Ideia: Percorra as possibilidades através da pesquisa em profundidade (nota: marque os elementos visitados).

```go

func numIslands(grid [][]byte) int {
    var count int
    for i:=0;i<len(grid);i++{
        for j:=0;j<len(grid[i]);j++{
            if grid[i][j]=='1' && dfs(grid,i,j)>=1{
                count++
            }
        }
    }
    return count
}
func dfs(grid [][]byte,i,j int)int{
    if i<0||i>=len(grid)||j<0||j>=len(grid[0]){
        return 0
    }
    if grid[i][j]=='1'{
        // Mark as visited (each cell only needs to be visited once)
        grid[i][j]=0
        return dfs(grid,i-1,j)+dfs(grid,i,j-1)+dfs(grid,i+1,j)+dfs(grid,i,j+1)+1
    }
    return 0
}
```

[maior retângulo no histograma](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

> Dados _n_ inteiros não negativos representando as alturas das barras em um histograma, onde cada barra é adjacente às outras e tem uma largura de 1.
> Encontre o maior retângulo que pode ser delineado no histograma.

Idea: Calcular a área com a barra atual como altura; isto é, reduz-se a encontrar os valores mais próximos à esquerda e à direita que são menores que o valor atual.

![image.png](https://cdn.jsdelivr.net/gh/greyireland/algorithm-pattern@master/images/stack_rain.png)

Use uma pilha para salvar os elementos do lado esquerdo que são menores que o atual valor.

![image.png](https://cdn.jsdelivr.net/gh/greyireland/algorithm-pattern@master/images/stack_rain2.png)

```go
func largestRectangleArea(heights []int) int {
	if len(heights) == 0 {
		return 0
	}
	stack := make([]int, 0)
	max := 0
	for i := 0; i <= len(heights); i++ {
		var cur int
		if i == len(heights) {
			cur = 0
		} else {
			cur = heights[i]
		}
        // If the current height is smaller than the top of the stack, pop all stack elements and compute the area
		for len(stack) != 0 && cur <= heights[stack[len(stack)-1]] {
			pop := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			h := heights[pop]
            // Compute the width
			w := i
			if len(stack) != 0 {
				peek := stack[len(stack)-1]
				w = i - peek - 1
			}
			max = Max(max, h*w)
		}
        // Record the index so we can obtain the corresponding element
		stack = append(stack, i)
	}
	return max
}
func Max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

## Fila

Comumente usado em BFS (busca em largura).

[implementar fila usando pilhas](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

> Implementar uma fila usando pilhas.

```go
type MyQueue struct {
    stack []int
    back  []int
}

/** Initialize your data structure here. */
func Constructor() MyQueue {
    return MyQueue{
        stack: make([]int, 0),
        back:  make([]int, 0),
    }
}

// 1
// 3
// 5

/** Push element x to the back of queue. */
func (this *MyQueue) Push(x int) {
    for len(this.back) != 0 {
        val := this.back[len(this.back)-1]
        this.back = this.back[:len(this.back)-1]
        this.stack = append(this.stack, val)
    }
    this.stack = append(this.stack, x)
}

/** Removes the element from in front of queue and returns that element. */
func (this *MyQueue) Pop() int {
    for len(this.stack) != 0 {
        val := this.stack[len(this.stack)-1]
        this.stack = this.stack[:len(this.stack)-1]
        this.back = append(this.back, val)
    }
    if len(this.back) == 0 {
        return 0
    }
    val := this.back[len(this.back)-1]
    this.back = this.back[:len(this.back)-1]
    return val
}

/** Get the front element. */
func (this *MyQueue) Peek() int {
    for len(this.stack) != 0 {
        val := this.stack[len(this.stack)-1]
        this.stack = this.stack[:len(this.stack)-1]
        this.back = append(this.back, val)
    }
    if len(this.back) == 0 {
        return 0
    }
    val := this.back[len(this.back)-1]
    return val
}

/** Returns whether the queue is empty. */
func (this *MyQueue) Empty() bool {
    return len(this.stack) == 0 && len(this.back) == 0
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * param_2 := obj.Pop();
 * param_3 := obj.Peek();
 * param_4 := obj.Empty();
 */
```

Traversal de ordem de nível de árvore binária

```go
func levelOrder(root *TreeNode) [][]int {
    // Use the length of the previous level to determine the elements of the next level
    result := make([][]int, 0)
    if root == nil {
        return result
    }
    queue := make([]*TreeNode, 0)
    queue = append(queue, root)
    for len(queue) > 0 {
        list := make([]int, 0)
        // Why take the length?
        // To record how many elements are in the current level (traverse the current level, then add the next level)
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

[01-matriz](https://leetcode-cn.com/problems/01-matrix/)

> Dada uma matriz composta de 0s e 1s, encontre a distância de cada elemento até o 0.
> A distância entre dois elementos adjacentes é 1.

```go
// BFS: enqueue from the 0s, after dequeuing compute the results for up/down/left/right, then re-enqueue them for the next layer of operations
// 0 0 0 0
// 0 x 0 0
// x x x 0
// 0 x 0 0

// 0 0 0 0
// 0 1 0 0
// 1 x 1 0
// 0 1 0 0

// 0 0 0 0
// 0 1 0 0
// 1 2 1 0
// 0 1 0 0
func updateMatrix(matrix [][]int) [][]int {
    q:=make([][]int,0)
    for i:=0;i<len(matrix);i++{
        for j:=0;j<len(matrix[0]);j++{
            if matrix[i][j]==0{
                // enqueue
                point:=[]int{i,j}
                q=append(q,point)
            }else{
                matrix[i][j]=-1
            }
        }
    }
    directions:=[][]int{{0,1},{0,-1},{-1,0},{1,0}}
    for len(q)!=0{
        // dequeue
        point:=q[0]
        q=q[1:]
        for _,v:=range directions{
            x:=point[0]+v[0]
            y:=point[1]+v[1]
            if x>=0&&x<len(matrix)&&y>=0&&y<len(matrix[0])&&matrix[x][y]==-1{
                matrix[x][y]=matrix[point[0]][point[1]]+1
                // Enqueue the current element to perform one more round of BFS
                q=append(q,[]int{x,y})
            }
        }
    }
    return matrix

}
```

## Resumo

- Familiarize-se com os casos de uso de pilhas
 - Último a entrar, primeiro a sair; salvando valores temporários
 - Usando uma pilha para DFS (pesquisa em profundidade)
- Familiarize-se com os casos de uso de filas
 - Usando uma fila para BFS (pesquisa em largura)

## Exercícios

- [ ] [min-stack](https://leetcode-cn.com/problems/min-stack/)
- [ ] [avaliar notação polonesa reversa](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)
- [] [string de decodificação](https://leetcode-cn.com/problems/decode-string/)
- [] [travessia de ordem de árvore binária](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
- [] [gráfico clone](https://leetcode-cn.com/problems/clone-graph/)
- [ ] [número de ilhas](https://leetcode-cn.com/problems/number-of-islands/)
- [ ] [maior retângulo no histograma](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)
- [ ] [implementar fila usando pilhas](https://leetcode-cn.com/problems/implement-queue-using-stacks/)
- [ ] [01-matriz](https://leetcode-cn.com/problems/01-matrix/)
