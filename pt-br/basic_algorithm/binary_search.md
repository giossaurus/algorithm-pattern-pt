# Busca binária

## Template de busca binária

Dado um **array ordenado** e um valor alvo, encontre o índice da primeira/última/qualquer ocorrência; retorne -1 se não aparecer.

Quatro elementos principais do template:

- 1. Inicialização: start=0, end=len-1
- 2. Condição de saída do loop: start + 1 < end
- 3. Compare o ponto médio com o alvo: A[mid] ==, <, > target
- 4. Verifique se os dois elementos finais correspondem: A[start], A[end] ? target

A complexidade de tempo é O(logn). O caso de uso típico é buscar em um array ordenado.

Exemplo típico:

[binary-search](https://leetcode-cn.com/problems/binary-search/)

> Dado um array `nums` com n elementos em ordem crescente e um valor alvo `target`, escreva uma função que procure `target` em `nums`. Se o valor alvo existir, retorne seu índice; caso contrário, retorne -1.

```go
// The most commonly used binary search template
func search(nums []int, target int) int {
    // 1. Initialize start and end
    start := 0
    end := len(nums) - 1
    // 2. Handle the for loop
    for start+1 < end {
        mid := start + (end-start)/2
        // 3. Compare a[mid] with the target value
        if nums[mid] == target {
            end = mid
        } else if nums[mid] < target {
            start = mid
        } else if nums[mid] > target {
            end = mid
        }
    }
    // 4. Two elements remain at the end; check them manually
    if nums[start] == target {
        return start
    }
    if nums[end] == target {
        return end
    }
    return -1
}
```

A maioria dos problemas de busca binária pode usar este template e, em seguida, adicionar um pouco de lógica especial.

Existem também outros templates de busca binária, conforme mostrado abaixo. Na maioria dos cenários, o template nº 3 pode resolver o problema e também pode encontrar a posição da primeira/última ocorrência, tornando-o mais amplamente aplicável.

![binary_search_template](../../images/binary_search_template.png)

Portanto, basta usar o template nº 3. Para uma comparação detalhada, consulte este artigo: [Template de busca binária](https://leetcode-cn.com/explore/learn/card/binary-search/212/template-analysis/847/)

Se for a busca binária mais simples - onde você não precisa encontrar a primeira ou a última posição, ou não há elementos duplicados - você pode usar o template nº 1, o que torna o código mais conciso.

```go
// More convenient when searching without duplicate elements
func search(nums []int, target int) int {
    start := 0
    end := len(nums) - 1
    for start <= end {
        mid := start + (end-start)/2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            start = mid+1
        } else if nums[mid] > target {
            end = mid-1
        }
    }
    // If not found, start is the index of the first element greater than target
    // For binary search in a B+ tree structure, you can return start
    // so you can continue searching into child nodes, e.g.: node:=node.Children[start]
    return -1
}
```

## Problemas comuns

### [search-for-range](https://www.lintcode.com/problem/search-for-a-range/description)

> Dado um array ordenado contendo n inteiros, encontre as posições inicial e final de um determinado valor alvo `target`.
> Se o valor alvo não estiver no array, retorne `[-1, -1]`.

Ideia: o ponto principal é encontrar o índice do primeiro `target` e o índice do último `target`, então use duas buscas binárias para encontrar a primeira e a última posições, respectivamente.

```go
func searchRange (A []int, target int) []int {
    if len(A) == 0 {
        return []int{-1, -1}
    }
    result := make([]int, 2)
    start := 0
    end := len(A) - 1
    for start+1 < end {
        mid := start + (end-start)/2
        if A[mid] > target {
            end = mid
        } else if A[mid] < target {
            start = mid
        } else {
            // If equal, keep searching to the left to find the first occurrence of the target value
            end = mid
        }
    }
    // Search for the left index
    if A[start] == target {
        result[0] = start
    } else if A[end] == target {
        result[0] = end
    } else {
        result[0] = -1
        result[1] = -1
        return result
    }
    start = 0
    end = len(A) - 1
    for start+1 < end {
        mid := start + (end-start)/2
        if A[mid] > target {
            end = mid
        } else if A[mid] < target {
            start = mid
        } else {
            // If equal, keep searching to the right to find the last occurrence of the target value
            start = mid
        }
    }
    // Search for the right index
    if A[end] == target {
        result[1] = end
    } else if A[start] == target {
        result[1] = start
    } else {
        result[0] = -1
        result[1] = -1
        return result
    }
    return result
}
```

### [search-insert-position](https://leetcode-cn.com/problems/search-insert-position/)

> Dado um array ordenado e um valor alvo, encontre o valor alvo no array e retorne seu índice. Caso o valor alvo não exista no array, retorne a posição onde ele seria inserido na ordem.

```go
func searchInsert(nums []int, target int) int {
    // Idea: find the position of the first element >= target
    start := 0
    end := len(nums) - 1
    for start+1 < end {
        mid := start + (end-start)/2
        if nums[mid] == target {
            // Mark the starting position
            start = mid
        } else if nums[mid] > target {
            end = mid
        } else {
            start = mid
        }
    }
    if nums[start] >= target {
        return start
    } else if nums[end] >= target {
        return end
    } else if nums[end] < target { // The target value is greater than all values
        return end + 1
    }
    return 0
}
```

### [search-a-2d-matrix](https://leetcode-cn.com/problems/search-a-2d-matrix/)

> Escreva um algoritmo eficiente para determinar se um valor alvo existe em uma matriz m x n. A matriz possui as seguintes propriedades:
>
> - Os números inteiros em cada linha estão em ordem crescente da esquerda para a direita.
> - O primeiro número inteiro de cada linha é maior que o último número inteiro da linha anterior.

```go
func searchMatrix(matrix [][]int, target int) bool {
    // Idea: convert the 2D array into a 1D array and perform binary search
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return false
    }
    row := len(matrix)
    col := len(matrix[0])
    start := 0
    end := row*col - 1
    for start+1 < end {
        mid := start + (end-start)/2
        // Get the corresponding value in the 2D array
        val := matrix[mid/col][mid%col]
        if val > target {
            end = mid
        } else if val < target {
            start = mid
        } else {
            return true
        }
    }
    if matrix[start/col][start%col] == target || matrix[end/col][end%col] == target{
        return true
    }
    return false
}
```

### [first-bad-version](https://leetcode-cn.com/problems/first-bad-version/)

> Suponha que você tenha n versões [1, 2, ..., n] e queira encontrar a primeira versão inválida que faz com que todas as versões a seguir sejam inválidas.
> Você pode chamar a interface `bool isBadVersion(version)` para determinar se o número de versão `version` falhou no teste de unidade. Implemente uma função para encontrar a primeira versão incorreta. Você deve minimizar o número de chamadas para a API.

```go
func firstBadVersion(n int) int {
    // Idea: binary search
    start := 1
    end := n
    for start+1 < end {
        mid := start + (end - start)/2
        if isBadVersion(mid) {
            end = mid
        } else if isBadVersion(mid) == false {
            start = mid
        }
    }
    if isBadVersion(start) {
        return start
    }
    return end
}
```

### [find-minimum-in-rotated-sorted-array](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

> Suponha que um array ordenado em ordem crescente tenha sido rotacionado em um pivô desconhecido (por exemplo, o array [0,1,2,4,5,6,7] pode se tornar [4,5,6,7,0,1,2]).
> Encontre o elemento mínimo.

```go
func findMin(nums []int) int {
    // Idea: use the last value as the target, then move left, and finally compare the values of start and end
    if len(nums) == 0 {
        return -1
    }
    start := 0
    end := len(nums) - 1

    for start+1 < end {
        mid := start + (end-start)/2
        // The last element value is the target
        if nums[mid] <= nums[end] {
            end = mid
        } else {
            start = mid
        }
    }
    if nums[start] > nums[end] {
        return nums[end]
    }
    return nums[start]
}
```

### [find-minimum-in-rotated-sorted-array-ii](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)

> Suponha que um array ordenado em ordem crescente tenha sido rotacionado em um pivô desconhecido
> (por exemplo, o array [0,1,2,4,5,6,7] pode se tornar [4,5,6,7,0,1,2]).
> Encontre o elemento mínimo. (Pode conter elementos duplicados.)

```go
func findMin(nums []int) int {
    // Idea: skip duplicate elements, compare the mid value with the end value, and handle two cases
    if len(nums) == 0 {
        return -1
    }
    start := 0
    end := len(nums) - 1
    for start+1 < end {
        // Remove duplicate elements
        for start < end && nums[end] == nums[end-1] {
            end--
        }
        for start < end && nums[start] == nums[start+1] {
            start++
        }
        mid := start + (end-start)/2
        // Compare the middle element with the last element (to determine whether the midpoint falls in the left ascending region or the right ascending region)
        if nums[mid] <= nums[end] {
            end = mid
        } else {
            start = mid
        }
    }
    if nums[start] > nums[end] {
        return nums[end]
    }
    return nums[start]
}
```

### [search-in-rotated-sorted-array](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

> Suponha que um array ordenado em ordem crescente tenha sido rotacionado em um pivô desconhecido.
> (Por exemplo, o array [0,1,2,4,5,6,7] pode se tornar [4,5,6,7,0,1,2].)
> Busque um valor alvo; se o valor alvo existir no array, retorne seu índice, caso contrário, retorne -1.
> Você pode assumir que não há elementos duplicados no array.

```go
func search(nums []int, target int) int {
    // Idea: two ascending lines, four cases to consider
    if len(nums) == 0 {
        return -1
    }
    start := 0
    end := len(nums) - 1
    for start+1 < end {
        mid := start + (end-start)/2
        // Return directly if equal
        if nums[mid] == target {
            return mid
        }
        // Determine which interval it is in, which can be divided into four cases
        if nums[start] < nums[mid] {
            if nums[start] <= target && target <= nums[mid] {
                end = mid
            } else {
                start = mid
            }
        } else if nums[end] > nums[mid] {
            if nums[end] >= target && nums[mid] <= target {
                start = mid
            } else {
                end = mid
            }
        }
    }
    if nums[start] == target {
        return start
    } else if nums[end] == target {
        return end
    }
    return -1
}
```

Nota:

> Em uma entrevista, você pode desenhar um diagrama para ajudar a explicar; falar abstratamente pode facilmente confundir a todos.

### [search-in-rotated-sorted-array-ii](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

> Suponha que um array ordenado em ordem crescente tenha sido rotacionado em um pivô desconhecido.
> (Por exemplo, o array [0,0,1,2,2,5,6] pode se tornar [2,5,6,0,0,1,2].)
> Escreva uma função para determinar se um determinado valor alvo existe no array. Retorne verdadeiro se existir, caso contrário, retorne falso. (Pode conter elementos duplicados.)

```go
func search(nums []int, target int) bool {
    // Idea: two ascending lines, four cases to consider, and handle duplicate numbers
    if len(nums) == 0 {
        return false
    }
    start := 0
    end := len(nums) - 1
    for start+1 < end {
        // Handle duplicate numbers
        for start < end && nums[start] == nums[start+1] {
            start++
        }
        for start < end && nums[end] == nums[end-1] {
            end--
        }
        mid := start + (end-start)/2
        // Return directly if equal
        if nums[mid] == target {
            return true
        }
        // Determine which interval it is in, which can be divided into four cases
        if nums[start] < nums[mid] {
            if nums[start] <= target && target <= nums[mid] {
                end = mid
            } else {
                start = mid
            }
        } else if nums[end] > nums[mid] {
            if nums[end] >= target && nums[mid] <= target {
                start = mid
            } else {
                end = mid
            }
        }
    }
    if nums[start] == target || nums[end] == target {
        return true
    }
    return false
}
```

## Resumo

Os quatro elementos principais da busca binária (memorizar e entender):

- 1. Inicialização: start=0, end=len-1
- 2. Condição de saída do loop: start + 1 < end
- 3. Compare o ponto médio com o alvo: A[mid] ==, <, > target
- 4. Verifique se os dois elementos finais correspondem: A[start], A[end] ? target

## Exercícios

- [ ] [search-for-range](https://www.lintcode.com/problem/search-for-a-range/description)
- [ ] [search-insert-position](https://leetcode-cn.com/problems/search-insert-position/)
- [ ] [search-a-2d-matrix](https://leetcode-cn.com/problems/search-a-2d-matrix/)
- [ ] [first-bad-version](https://leetcode-cn.com/problems/first-bad-version/)
- [ ] [find-minimum-in-rotated-sorted-array](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)
- [ ] [find-minimum-in-rotated-sorted-array-ii](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)
- [ ] [search-in-rotated-sorted-array](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)
- [ ] [search-in-rotated-sorted-array-ii](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)
