# Lista encadeada

## Habilidades básicas

Pontos essenciais relacionados a listas encadeadas

- tratamento de null/nil
- nó dummy
- ponteiros rápidos e lentos
- inserir um nó em uma lista encadeada ordenada
- remover um nó de uma lista encadeada
- inverter uma lista encadeada
- mesclar duas listas encadeadas
- encontrar o nó do meio de uma lista encadeada

## Tipos de problemas comuns

### [remove-duplicates-from-sorted-list](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

> Dada uma lista encadeada ordenada, exclua todos os elementos duplicados para que cada elemento apareça apenas uma vez.

```go
func deleteDuplicates(head *ListNode) *ListNode {
    current := head
    for current != nil {
        // Delete all duplicates before moving to the next element
        for current.Next != nil && current.Val == current.Next.Val {
            current.Next = current.Next.Next
        }
        current = current.Next
    }
    return head
}
```

### [remove-duplicates-from-sorted-list-ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

> Dada uma lista encadeada ordenada, exclua todos os nós que possuem números duplicados, deixando apenas os números da lista original que não aparecem mais de uma vez.

Ideia: o nó head pode ser excluído, então use um nó dummy para ajudar na exclusão.

```go
func deleteDuplicates(head *ListNode) *ListNode {
    if head == nil {
        return head
    }
    dummy := &ListNode{Val: 0}
    dummy.Next = head
    head = dummy

    var rmVal int
    for head.Next != nil && head.Next.Next != nil {
        if head.Next.Val == head.Next.Next.Val {
            // Record the deleted value, used to check subsequent nodes
            rmVal = head.Next.Val
            for head.Next != nil && head.Next.Val == rmVal  {
                head.Next = head.Next.Next
            }
        } else {
            head = head.Next
        }
    }
    return dummy.Next
}
```

Pontos de atenção
• A->B->C, exclua B, então A.next = C
• Use um nó dummy para ajudar na exclusão (assim o head pode mudar)
• Para acessar X.next ou X.value, sempre certifique-se de que X != nil

### [reverse-linked-list](https://leetcode-cn.com/problems/reverse-linked-list/)

> Inverta uma lista simplesmente encadeada.

Ideia: use um nó prev para guardar o ponteiro para trás e um temp para guardar temporariamente o próximo nó.

```go
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        // Save the current head.Next node to prevent it from being overwritten after reassignment
        // State after one round: nil<-1 2->3->4
        //                       prev   head
        temp := head.Next
        head.Next = prev
        // move pre
        prev = head
        // move head
        head = temp
    }
    return prev
}
```

### [reverse-linked-list-ii](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

> Inverta a lista encadeada da posição *m* até *n*, em uma única passada.

Ideia: primeiro percorra até m, inverta e depois reconecte o resto, prestando atenção à manipulação dos ponteiros.

```go
func reverseBetween(head *ListNode, m int, n int) *ListNode {
    // Idea: first traverse to m, reverse, then reconnect the rest, paying attention to pointer handling
    // Input: 1->2->3->4->5->NULL, m = 2, n = 4
    if head == nil {
        return head
    }
    // The head changes, so use a dummy node
    dummy := &ListNode{Val: 0}
    dummy.Next = head
    head = dummy
    // At the beginning: 0->1->2->3->4->5->nil
    var pre *ListNode
    var i = 0
    for i < m {
        pre = head
        head = head.Next
        i++
    }
    // After traversing: 1(pre)->2(head)->3->4->5->NULL
    // i = 1
    var j = i
    var next *ListNode
    // Used to connect the middle node
    var mid = head
    for head != nil && j <= n {
        // First iteration: 1 nil<-2 3->4->5->nil
        temp := head.Next
        head.Next = next
        next = head
        head = temp
        j++
    }
    // The loop runs four times
    // After the loop ends: 1 nil<-2<-3<-4 5(head)->nil
    pre.Next = next
    mid.Next = head
    return dummy.Next
}
```

### [merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> Mescle duas listas encadeadas em ordem crescente em uma nova lista crescente e retorne-a. A nova lista é formada pela junção de todos os nós das duas listas fornecidas.

Ideia: usar um nó dummy para ir conectando cada elemento.

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    head := dummy
    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            head.Next = l1
            l1 = l1.Next
        } else {
            head.Next = l2
            l2 = l2.Next
        }
        head = head.Next
    }
    // Connect the remaining unprocessed nodes of l1
    for l1 != nil {
        head.Next = l1
        head = head.Next
        l1 = l1.Next
    }
    // Connect the remaining unprocessed nodes of l2
    for l2 != nil {
        head.Next = l2
        head = head.Next
        l2 = l2.Next
    }
    return dummy.Next
}
```

### [partition-list](https://leetcode-cn.com/problems/partition-list/)

> Dada uma lista encadeada e um valor específico x, particione a lista para que todos os nós menores que *x* venham antes dos nós maiores ou iguais a *x*.

Ideia: mover nós maiores que x para outra lista encadeada e, em seguida, conectar as duas listas no fim.

```go
func partition(head *ListNode, x int) *ListNode {
    // Idea: move nodes greater than x to another linked list, then connect the two lists at the end
    // check
    if head == nil {
        return head
    }
    headDummy := &ListNode{Val: 0}
    tailDummy := &ListNode{Val: 0}
    tail := tailDummy
    headDummy.Next = head
    head = headDummy
    for head.Next != nil {
        if head.Next.Val < x {
            head = head.Next
        } else {
            // Remove the node >= x
            t := head.Next
            head.Next = head.Next.Next
            // Put it into the other linked list
            tail.Next = t
            tail = tail.Next
        }
    }
    // Splice the two linked lists together
    tail.Next = nil
    head.Next = tailDummy.Next
    return headDummy.Next
}
```

Quando usar um nó dummy

> Use um nó dummy quando o nó head puder mudar.

### [sort-list](https://leetcode-cn.com/problems/sort-list/)

> Ordene uma lista encadeada com complexidade de tempo *O*(*n* log *n*) e complexidade de espaço constante.

Ideia: merge sort, encontrando o ponto médio e fazendo o merge das metades.

```go
func sortList(head *ListNode) *ListNode {
    // Idea: merge sort, with finding the midpoint and merge operations
    return mergeSort(head)
}
func findMiddle(head *ListNode) *ListNode {
    // 1->2->3->4->5
    slow := head
    fast := head.Next
    // The fast pointer reaches nil first
    for fast !=nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    return slow
}
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    head := dummy
    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            head.Next = l1
            l1 = l1.Next
        } else {
            head.Next = l2
            l2 = l2.Next
        }
        head = head.Next
    }
    // Connect the remaining unprocessed nodes of l1
    for l1 != nil {
        head.Next = l1
        head = head.Next
        l1 = l1.Next
    }
    // Connect the remaining unprocessed nodes of l2
    for l2 != nil {
        head.Next = l2
        head = head.Next
        l2 = l2.Next
    }
    return dummy.Next
}
func mergeSort(head *ListNode) *ListNode {
    // If there is only one node, return that node directly
    if head == nil || head.Next == nil{
        return head
    }
    // find middle
    middle := findMiddle(head)
    // Disconnect the middle node
    tail := middle.Next
    middle.Next = nil
    left := mergeSort(head)
    right := mergeSort(tail)
    result := mergeTwoLists(left, right)
    return result
}
```

Pontos a serem observados

- Para ponteiros fast e slow, verifique se fast e fast.Next são nil
- No merge sort recursivo, é preciso desconectar o nó do meio
- O caso base da recursão é quando head é nil ou head.Next é nil

### [reorder-list](https://leetcode-cn.com/problems/reorder-list/)

> Dada uma lista simplesmente encadeada *L*: *L*<sub>0</sub>→*L*<sub>1</sub>→…→*L*<sub>n-1</sub>→*L*<sub>n</sub>
> Reorganize-a em: *L*<sub>0</sub>→*L*<sub>n</sub>→*L*<sub>1</sub>→*L*<sub>n-1</sub>→*L*<sub>2</sub>→*L*<sub>n-2</sub>→…

Ideia: encontrar o ponto médio e desconectar, inverter a segunda metade e depois mesclar as duas metades.

```go
func reorderList(head *ListNode)  {
    // Idea: find the midpoint and disconnect, reverse the second half, then merge the two halves
    if head == nil {
        return
    }
    mid := findMiddle(head)
    tail := reverseList(mid.Next)
    mid.Next = nil
    head = mergeTwoLists(head, tail)
}
func findMiddle(head *ListNode) *ListNode {
    fast := head.Next
    slow := head
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    return slow
}
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{Val: 0}
    head := dummy
    toggle := true
    for l1 != nil && l2 != nil {
        // Switch between nodes
        if toggle {
            head.Next = l1
            l1 = l1.Next
        } else {
            head.Next = l2
            l2 = l2.Next
        }
        toggle = !toggle
        head = head.Next
    }
    // Connect the remaining unprocessed nodes of l1
    for l1 != nil {
        head.Next = l1
        head = head.Next
        l1 = l1.Next
    }
    // Connect the remaining unprocessed nodes of l2
    for l2 != nil {
        head.Next = l2
        head = head.Next
        l2 = l2.Next
    }
    return dummy.Next
}
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        // Save the current head.Next node to prevent it from being overwritten after reassignment
        // State after one round: nil<-1 2->3->4
        //                       prev   head
        temp := head.Next
        head.Next = prev
        // move pre
        prev = head
        // move head
        head = temp
    }
    return prev
}
```

### [linked-list-cycle](https://leetcode-cn.com/problems/linked-list-cycle/)

> Dada uma lista encadeada, determine se ela possui um ciclo.

Ideia: ponteiros rápidos e lentos. Se os ponteiros rápido e lento se encontrarem, há um ciclo. Prova: se houver um ciclo, a distância entre eles diminui em 1 a cada passo.
![fast_slow_linked_list](../../images/fast_slow_linked_list.png)

```go
func hasCycle(head *ListNode) bool {
    // Idea: fast and slow pointers. If the fast and slow pointers become equal, there is a cycle. Proof: if there is a cycle, the distance between the fast and slow pointers decreases by 1 with each step
    if head == nil {
        return false
    }
    fast := head.Next
    slow := head
    for fast != nil && fast.Next != nil {
        // Compare whether the pointers are equal (do not compare by val!)
        if fast == slow {
            return true
        }
        fast = fast.Next.Next
        slow = slow.Next
    }
    return false
}
```

### [linked-list-cycle-ii](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

> Dada uma lista encadeada, retorne o primeiro nó onde o ciclo começa. Se a lista não tiver ciclo, retorne `null`.

Ideia: ponteiros rápidos e lentos. Depois que os ponteiros rápidos e lentos se encontrarem, mova o ponteiro lento de volta para o head e, em seguida, mova os ponteiros rápidos e lentos juntos no mesmo ritmo; o ponto de encontro é a entrada do ciclo.
![cycled_linked_list](../../images/cycled_linked_list.png)

```go
func detectCycle(head *ListNode) *ListNode {
    // Idea: fast and slow pointers. After the fast and slow pointers meet, move the slow pointer back to the head, then move the fast and slow pointers together at the same pace; the meeting point is the entry of the cycle
    if head == nil {
        return head
    }
    fast := head.Next
    slow := head

    for fast != nil && fast.Next != nil {
        if fast == slow {
            // The slow pointer starts moving again from the head, and the fast pointer starts moving from the node after the first meeting point
            fast = head
            slow = slow.Next // note
            // Compare the pointer objects (do not compare the pointers' Val values)
            for fast != slow {
                fast = fast.Next
                slow = slow.Next
            }
            return slow
        }
        fast = fast.Next.Next
        slow = slow.Next
    }
    return nil
}
```

Armadilhas

- Ao comparar ponteiros, compare os objetos diretamente; não compare por valor, pois a lista pode conter valores duplicados
- Após o primeiro encontro, o ponteiro rápido precisa partir do próximo nó e se mover em ritmo constante junto com o ponteiro que parte do head

Outra abordagem é fast=head, slow=head

```go
func detectCycle(head *ListNode) *ListNode {
    // Idea: fast and slow pointers. After the fast and slow pointers meet, one of the pointers returns to the head, then both move together at the same pace; the meeting point is the entry of the cycle
    // nb+a=2nb+a
    if head == nil {
        return head
    }
    fast := head
    slow := head

    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
        if fast == slow {
            // The pointer starts moving again from the head
            fast = head
            for fast != slow {
                fast = fast.Next
                slow = slow.Next
            }
            return slow
        }
    }
    return nil
}
```

A diferença entre essas duas abordagens é que **fast=head.Next geralmente é usado com mais frequência**, porque permite conhecer o nó antes do ponto médio, que pode ser usado para operações como exclusão.

- Se fast for inicializado em head.Next, o ponto médio estará em slow.Next
- Se fast for inicializado em head, o ponto médio estará em slow

### [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)

> Determine se uma lista encadeada é um palíndromo.

```go
func isPalindrome(head *ListNode) bool {
    // 1 2 nil
    // 1 2 1 nil
    // 1 2 2 1 nil
    if head==nil{
        return true
    }
    slow:=head
    // If fast is initialized to head.Next, the midpoint is at slow.Next
    // If fast is initialized to head, the midpoint is at slow
    fast:=head.Next
    for fast!=nil&&fast.Next!=nil{
        fast=fast.Next.Next
        slow=slow.Next
    }

    tail:=reverse(slow.Next)
    // Disconnect the two linked lists (need the node before the midpoint)
    slow.Next=nil
    for head!=nil&&tail!=nil{
        if head.Val!=tail.Val{
            return false
        }
        head=head.Next
        tail=tail.Next
    }
    return true

}

func reverse(head *ListNode)*ListNode{
    // 1->2->3
    if head==nil{
        return head
    }
    var prev *ListNode
    for head!=nil{
        t:=head.Next
        head.Next=prev
        prev=head
        head=t
    }
    return prev
}
```

### [copy-list-with-random-pointer](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

> Dada uma lista encadeada onde cada nó contém um ponteiro aleatório adicional que pode apontar para qualquer nó na lista ou para nulo,
> retorne uma cópia profunda (deep copy) desta lista.

Ideia: 1. usar uma tabela hash para armazenar ponteiros; 2. coloque o nó copiado logo após o nó original.

```go
func copyRandomList(head *Node) *Node {
	if head == nil {
		return head
	}
	// Copy each node and place it right after the original
	// 1->2->3  ==>  1->1'->2->2'->3->3'
	cur := head
	for cur != nil {
		clone := &Node{Val: cur.Val, Next: cur.Next}
		temp := cur.Next
		cur.Next = clone
		cur = temp
	}
	// Handle the random pointers
	cur = head
	for cur != nil {
		if cur.Random != nil {
			cur.Next.Random = cur.Random.Next
		}
		cur = cur.Next.Next
	}
	// Separate the two linked lists
	cur = head
	cloneHead := cur.Next
	for cur != nil && cur.Next != nil {
		temp := cur.Next
		cur.Next = cur.Next.Next
		cur = temp
	}
	// Original list head: head 1->2->3
	// Cloned list head: cloneHead 1'->2'->3'
	return cloneHead
}
```

## Resumo

Alguns pontos que você deve dominar para listas encadeadas. Através dos problemas práticos abaixo, você será capaz de lidar com a maioria dos problemas de lista encadeada com facilidade ~

- tratamento de null/nil
- nó dummy
- ponteiros rápidos e lentos
- inserir um nó em uma lista encadeada ordenada
- remover um nó de uma lista encadeada
- inverter uma lista encadeada
- mesclar duas listas encadeadas
- encontrar o nó do meio de uma lista encadeada

## Prática

- [ ] [remove-duplicates-from-sorted-list](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)
- [ ] [remove-duplicates-from-sorted-list-ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)
- [ ] [reverse-linked-list](https://leetcode-cn.com/problems/reverse-linked-list/)
- [ ] [reverse-linked-list-ii](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
- [ ] [merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [ ] [partition-list](https://leetcode-cn.com/problems/partition-list/)
- [ ] [sort-list](https://leetcode-cn.com/problems/sort-list/)
- [ ] [reorder-list](https://leetcode-cn.com/problems/reorder-list/)
- [ ] [linked-list-cycle](https://leetcode-cn.com/problems/linked-list-cycle/)
- [ ] [linked-list-cycle-ii](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [ ] [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)
- [ ] [copy-list-with-random-pointer](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)
