# Início rápido

## Estruturas de dados e algoritmos

A estrutura de dados é uma forma de representar dados. Listas encadeadas, árvores binárias, pilhas, filas e assim por diante são maneiras pelas quais um dado é representado na memória.
Um algoritmo é um modelo ou abordagem geral para resolver um problema. A maioria das estruturas de dados possui um conjunto de modelos de algoritmos de uso geral, portanto, dominar esses modelos gerais é suficiente para resolver uma ampla variedade de problemas de algoritmos.

Os capítulos a seguir cobrirão várias estruturas de dados, modelos de algoritmos básicos e alguns modelos de algoritmos avançados por tópico. Cada tópico inclui vários problemas práticos clássicos. Depois de concluir todos os problemas práticos, você obterá novos insights e compreensão de estruturas de dados e algoritmos.

Vamos começar com dois problemas de algoritmo para ter uma ideia ~

Exemplo 1

[strStr](https://leetcode-cn.com/problems/implement-strstr/)

> Dadas uma string haystack e uma string needle, encontre o índice da primeira ocorrência (a partir de 0) de needle em haystack. Se não existir, retorne -1.

Ideia: O ponto principal é iterar sobre os caracteres da string fornecida e verificar se a substring começando no caractere atual é igual à string de destino.

```go
func strStr(haystack string, needle string) int {
    if len(needle) == 0 {
        return 0
    }
    var i, j int
    // i does not need to go up to len-1
    for i = 0; i < len(haystack)-len(needle)+1; i++ {
        for j = 0; j < len(needle); j++ {
            if haystack[i+j] != needle[j] {
                break
            }
        }
        // Check whether the string lengths are equal
        if len(needle) == j {
            return i
        }
    }
    return -1
}
```

Coisas a serem observadas

- Durante o loop, i não precisa ir até len-1.
- Se a string de destino for encontrada, então len(needle)==j.

Exemplo 2

[subsets](https://leetcode-cn.com/problems/subsets/)

> Dado um array de inteiros nums sem elementos duplicados, retorne todos os subconjuntos possíveis (o conjunto das partes) do array.

Ideia: este é um problema clássico de backtracking. Em resumo, ele enumera exaustivamente todas as possibilidades. O modelo do algoritmo é o seguinte:

```go
result = []
func backtrack(choice list, path):
    if end condition is met:
        result.add(path)
        return
    for choice in choice list:
        make a choice
        backtrack(choice list, path)
        undo the choice
```

Ao fazer e desfazer escolhas continuamente, esgotamos todas as possibilidades e, finalmente, retornamos os resultados que satisfazem as condições.

Código da solução

```go
func subsets(nums []int) [][]int {
    // Store the final result
    result := make([][]int, 0)
    // Store the intermediate result
    list := make([]int, 0)
    backtrack(nums, 0, list, &result)
    return result
}

// nums the given set
// pos the index of the element to add to the set next time
// list the temporary result set (needs to be copied and saved each time)
// result the final result
func backtrack(nums []int, pos int, list []int, result *[][]int) {
    // Copy the temporary result and save it to the final result
    ans := make([]int, len(list))
    copy(ans, list)
    *result = append(*result, ans)
    // Make a choice, process the result, then undo the choice
    for i := pos; i < len(nums); i++ {
        list = append(list, nums[i])
        backtrack(nums, i+1, list, result)
        list = list[0 : len(list)-1]
    }
}
```

Nota: Vários problemas clássicos de backtracking serão discutidos em profundidade posteriormente. Se você não entende isso agora, pode ignorá-lo por enquanto.

## Dicas para entrevistas

Na maioria das vezes, praticamos problemas de algoritmo para nos preparar para entrevistas, portanto, há algumas coisas a ter em mente durante uma entrevista.

- Identifique rapidamente o conceito cobrado pelo problema e encontre o **template geral** para esse conceito; você pode precisar aplicar **tratamento especial para casos especiais** dependendo do problema.
- Primeiro mire em uma direção que resolva o problema! **Proponha primeiro uma solução viável**, não a ideal! Resolva primeiro e depois otimize!
- Mantenha seu estilo de codificação consistente e esteja familiarizado com as convenções de código de cada linguagem.
 - Mantenha os nomes tão concisos e claros quanto possível; evite nomear com números como i1, node1, a1, b2.
- Resumo de erros comuns
 - Ao acessar um índice, não saia dos limites.
 - O problema do valor nulo causa um erro em tempo de execução.

## Exercícios

- [ ] [strStr](https://leetcode-cn.com/problems/implement-strstr/)
- [ ] [subsets](https://leetcode-cn.com/problems/subsets/)
