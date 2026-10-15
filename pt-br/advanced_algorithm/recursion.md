# Recursão

## Introdução

Transforme um grande problema em problemas menores e resolva cada pequeno problema um por um por meio de recursão.

## Exemplos

[string reversa](https://leetcode-cn.com/problems/reverse-string/)

> Escreva uma função que inverte a string de entrada. A string de entrada é fornecida como uma matriz de caracteres `char[]`.

```go
func reverseString(s []byte) {
	res := make([]byte, 0)
	reverse(s, 0, &res)
	for i := 0; i < len(s); i++ {
		s[i] = res[i]
	}
}
func reverse(s []byte, i int, res *[]byte) {
	if i == len(s) {
		return
	}
	reverse(s, i+1, res)
	*res = append(*res, s[i])
}
```

[trocar nós em pares](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

> Dada uma lista vinculada, troque a cada dois nós adjacentes e retorne a lista vinculada após a troca.
> **Você não pode simplesmente modificar os valores dentro dos nós**, mas em vez disso, precisa realmente trocar os nós.

```go
func swapPairs(head *ListNode) *ListNode {
    // Idea: turn reversing the linked list into a subproblem, then solve it one step at a time through recursion
    // First reverse two nodes, then continue reversing the following nodes the same way, then connect these reversed nodes together
    return helper(head)
}
func helper(head *ListNode)*ListNode{
    if head==nil||head.Next==nil{
        return head
    }
    // Save the head pointer of the next stage
    nextHead:=head.Next.Next
    // Reverse the pointers of the current stage
    next:=head.Next
    next.Next=head
    head.Next=helper(nextHead)
    return next
}
```

[árvores-binárias-de-pesquisa-ii](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

> Dado um número inteiro n, gere todas as árvores de pesquisa binária cujos nós são compostos de 1 ... n.

```go
func generateTrees(n int) []*TreeNode {
    if n==0{
        return nil
    }
    return generate(1,n)

}
func generate(start,end int)[]*TreeNode{
    if start>end{
        return []*TreeNode{nil}
    }
    ans:=make([]*TreeNode,0)
    for i:=start;i<=end;i++{
        // Recursively generate all left and right subtrees
        lefts:=generate(start,i-1)
        rights:=generate(i+1,end)
        // Combine the left and right subtrees, then return
        for j:=0;j<len(lefts);j++{
            for k:=0;k<len(rights);k++{
                root:=&TreeNode{Val:i}
                root.Left=lefts[j]
                root.Right=rights[k]
                ans=append(ans,root)
            }
        }
    }
    return ans
}
```

## Recursão + Memoização

[número-fibonacci](https://leetcode-cn.com/problems/fibonacci-number/)

> Os números de Fibonacci, geralmente denotados por F(n), formam uma sequência chamada sequência de Fibonacci. A sequência começa com 0 e 1, e cada número subsequente é a soma dos dois anteriores. Ou seja:
> F(0) = 0, F(1) = 1
> F(N) = F(N - 1) + F(N - 2), onde N > 1.
> Dado N, calcule F(N).

```go
func fib(N int) int {
    return dfs(N)
}
var m map[int]int=make(map[int]int)
func dfs(n int)int{
    if n < 2{
        return n
    }
    // Read from cache
    if m[n]!=0{
        return m[n]
    }
    ans:=dfs(n-2)+dfs(n-1)
    // Cache the already computed value
    m[n]=ans
    return ans
}
```

## Exercícios

- [ ] [string reversa](https://leetcode-cn.com/problems/reverse-string/)
- [ ] [trocar nós em pares](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [ ] [árvores de pesquisa binárias exclusivas-ii](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)
- [ ] [número-fibonacci](https://leetcode-cn.com/problems/fibonacci-number/)
