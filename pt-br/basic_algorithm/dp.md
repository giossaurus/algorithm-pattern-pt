# Programação Dinâmica

## Background

Vamos começar com um problema~

Por exemplo: [triângulo](https://leetcode-cn.com/problems/triangle/)

> Dado um triângulo, encontre a soma mínima do caminho de cima para baixo. Cada etapa você pode mover para um nó adjacente na linha abaixo.

Por exemplo, dado o seguinte triângulo:

```text
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
```

A soma mínima do caminho de cima para baixo é 11 (ou seja, 2 + 3 + 5 + 1 = 11).

Use DFS (travessia ou divisão e conquistar)

Traversal

![image.png](https://cdn.jsdelivr.net/gh/greyireland/algorithm-pattern@master/images/dp_triangle.png)

Dividir e conquistar

![image.png](https://cdn.jsdelivr.net/gh/greyireland/algorithm-pattern@master/images/dp_dc.png)

Otimize o DFS armazenando em cache valores que já foram calculados (chamados: memoização; essencialmente: programação dinâmica)

![image.png](https://cdn.jsdelivr.net/gh/greyireland/algorithm-pattern@master/images/dp_memory_search.png)

A programação dinâmica transforma um grande problema em pequenos problemas, e o método que resolve o problema da computação repetida de subproblemas é chamado de programação dinâmica.

A diferença entre programação dinâmica e DFS

- Para um binário árvore, os subproblemas não têm interseção, então a maioria dos problemas de árvore binária podem ser resolvidos com recursão ou divisão e conquista, ou seja, DFS.
- Para um problema como o triângulo, onde há caminhos repetidos, **os subproblemas se cruzam**, então pode ser resolvido com programação dinâmica.

Programação dinâmica, de baixo para cima

```go
func minimumTotal(triangle [][]int) int {
	if len(triangle) == 0 || len(triangle[0]) == 0 {
		return 0
	}
	// 1. State definition: f[i][j] represents the shortest path from i,j to the last row
	var l = len(triangle)
	var f = make([][]int, l)
	// 2. Initialization
	for i := 0; i < l; i++ {
		for j := 0; j < len(triangle[i]); j++ {
			if f[i] == nil {
				f[i] = make([]int, len(triangle[i]))
			}
			f[i][j] = triangle[i][j]
		}
	}
	// 3. Solve by recurrence
	for i := len(triangle) - 2; i >= 0; i-- {
		for j := 0; j < len(triangle[i]); j++ {
			f[i][j] = min(f[i+1][j], f[i+1][j+1]) + triangle[i][j]
		}
	}
	// 4. Answer
	return f[0][0]
}
func min(a, b int) int {
	if a > b {
		return b
	}
	return a
}

```

Programação dinâmica, de cima para baixo

```go
// Test case:
// [
// [2],
// [3,4],
// [6,5,7],
// [4,1,8,3]
// ]
func minimumTotal(triangle [][]int) int {
    if len(triangle) == 0 || len(triangle[0]) == 0 {
        return 0
    }
    // 1. State definition: f[i][j] represents the shortest path from 0,0 to i,j
    var l = len(triangle)
    var f = make([][]int, l)
    // 2. Initialization
    for i := 0; i < l; i++ {
        for j := 0; j < len(triangle[i]); j++ {
            if f[i] == nil {
                f[i] = make([]int, len(triangle[i]))
            }
            f[i][j] = triangle[i][j]
        }
    }
    // Solve by recurrence
    for i := 1; i < l; i++ {
        for j := 0; j < len(triangle[i]); j++ {
            // There are two cases here:
            // 1. The previous row has no left value
            // 2. The previous row has no right value
            if j-1 < 0 {
                f[i][j] = f[i-1][j] + triangle[i][j]
            } else if j >= len(f[i-1]) {
                f[i][j] = f[i-1][j-1] + triangle[i][j]
            } else {
                f[i][j] = min(f[i-1][j], f[i-1][j-1]) + triangle[i][j]
            }
        }
    }
    result := f[l-1][0]
    for i := 1; i < len(f[l-1]); i++ {
        result = min(result, f[l-1][i])
    }
    return result
}
func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```

## Relação entre recursão e programação dinâmica

Recursão é uma forma de implementar um programa: uma função que chama a si mesma

```go
Function(x) {
	...
	Funciton(x-1);
	...
}
```

Programação dinâmica: é uma forma de pensar para resolver problemas, onde o resultado de um problema de grande escala é calculado a partir dos resultados de problemas de menor escala. A programação dinâmica pode ser implementada com recursão (busca de memorização).

## Casos de uso

Duas condições devem ser satisfeitas:

- Satisfaça uma das seguintes:
 - Encontre o valor máximo/mínimo (Máximo/Mínimo)
 - Determine a viabilidade (Sim/Não)
 - Contar o número de soluções viáveis (Contagem(\*))
- Não pode ser classificado ou trocado (Não é possível classificar/trocar)

Por exemplo: [sequência consecutiva mais longa](https://leetcode-cn.com/problems/longest-consecutive-sequence/) — as posições podem ser trocadas, portanto a programação dinâmica não é usada.

## Quatro elementos-chave

1. **Estado**
 - Inspiração, criatividade; armazenar os resultados de problemas de pequena escala
2. Função
 - A relação entre estados; como calcular um estado maior a partir de estados menores
3. Inicialização
 - Qual é o menor estado extremo, o ponto inicial
4. Resposta
 - Qual é o maior estado, o ponto final

## Quatro tipos comuns

1. Matriz DP (10%)
1. Sequência (40%)
1. Duas Sequências DP (40%)
1. Mochila (10%)

> Notas
>
> - A maioria dos problemas de algoritmos gananciosos dependem da memorização de respostas, portanto, se a programação dinâmica puder ser usada, prefira a programação dinâmica em vez de algoritmos gananciosos.

## 1. Tipo de matriz (10%)

### [soma-do-caminho-mínimo](https://leetcode-cn.com/problems/minimum-path-sum/)

> Dada uma grade *m* x *n* preenchida com números inteiros não negativos, encontre um caminho do canto superior esquerdo ao canto inferior direito que minimize a soma dos números ao longo do caminho.

Ideia: programação dinâmica
1. estado: f[x][y] é o caminho mais curto desde o início até x,y
2. função: f[x][y] = min(f[x-1][y], f[x][y-1]) + A[x][y]
3. inicializar: f[0][0] = A[0][0], f[i][0] = soma(0,0 -> i,0), f[0][i] = soma(0,0 -> 0,i)
4. resposta: f[n-1][m-1]

```go
func minPathSum(grid [][]int) int {
    // Idea: dynamic programming
    // f[i][j] represents the minimum sum from i,j to 0,0
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }
    // Reuse the original matrix list
    // Initialization: f[i][0], f[0][j]
    for i := 1; i < len(grid); i++ {
        grid[i][0] = grid[i][0] + grid[i-1][0]
    }
    for j := 1; j < len(grid[0]); j++ {
        grid[0][j] = grid[0][j] + grid[0][j-1]
    }
    for i := 1; i < len(grid); i++ {
        for j := 1; j < len(grid[i]); j++ {
            grid[i][j] = min(grid[i][j-1], grid[i-1][j]) + grid[i][j]
        }
    }
    return grid[len(grid)-1][len(grid[0])-1]
}
func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```

### [caminhos exclusivos](https://leetcode-cn.com/problems/unique-paths/)

> Um robô está localizado no canto superior esquerdo de uma grade m x n (o ponto inicial está marcado como "Início" na figura abaixo).
> O robô só pode se mover para baixo ou para a direita um passo de cada vez. O robô está tentando alcançar o canto inferior direito da grade (marcado como "Concluir" na figura abaixo).
> Quantos caminhos distintos existem no total?

```go
func uniquePaths(m int, n int) int {
	// f[i][j] represents the number of paths from i,j to 0,0
	f := make([][]int, m)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if f[i] == nil {
				f[i] = make([]int, n)
			}
			f[i][j] = 1
		}
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			f[i][j] = f[i-1][j] + f[i][j-1]
		}
	}
	return f[m-1][n-1]
}
```

### [unique-paths-ii](https://leetcode-cn.com/problems/unique-paths-ii/)

> Um robô está localizado no canto superior esquerdo de uma grade m x n (o ponto inicial está marcado como "Início" na figura abaixo).
> O robô só pode se mover para baixo ou para a direita um passo de cada vez. O robô está tentando alcançar o canto inferior direito da grade (marcado como "Concluir" na figura abaixo).
> Quantos caminhos distintos existem no total?
> Agora considere que existem obstáculos na grade. Quantos caminhos distintos existem do canto superior esquerdo até o canto inferior direito?

```go
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
	// f[i][j] = f[i-1][j] + f[i][j-1] and check for obstacles
	if obstacleGrid[0][0] == 1 {
		return 0
	}
	m := len(obstacleGrid)
	n := len(obstacleGrid[0])
	f := make([][]int, m)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if f[i] == nil {
				f[i] = make([]int, n)
			}
			f[i][j] = 1
		}
	}
	for i := 1; i < m; i++ {
		if obstacleGrid[i][0] == 1 || f[i-1][0] == 0 {
			f[i][0] = 0
		}
	}
	for j := 1; j < n; j++ {
		if obstacleGrid[0][j] == 1 || f[0][j-1] == 0 {
			f[0][j] = 0
		}
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			if obstacleGrid[i][j] == 1 {
				f[i][j] = 0
			} else {
				f[i][j] = f[i-1][j] + f[i][j-1]
			}
		}
	}
	return f[m-1][n-1]
}
```

## 2. Tipo de sequência (40%)

### [escadas de escalada](https://leetcode-cn.com/problems/climbing-stairs/)

> Suponha que você esteja subindo escadas. São necessários *n* passos para chegar ao topo.

```go
func climbStairs(n int) int {
    // f[i] = f[i-1] + f[i-2]
    if n == 1 || n == 0 {
        return n
    }
    f := make([]int, n+1)
    f[1] = 1
    f[2] = 2
    for i := 3; i <= n; i++ {
        f[i] = f[i-1] + f[i-2]
    }
    return f[n]
}
```

### [jump-game](https://leetcode-cn.com/problems/jump-game/)

> Dada uma matriz de números inteiros não negativos, você é inicialmente posicionado no primeiro índice da matriz.
> Cada elemento na matriz representa o comprimento máximo do salto naquela posição.
> Determine se você é capaz de alcançar o último índice.

```go
func canJump(nums []int) bool {
    // Idea: look at the last jump
    // State: f[i] represents whether you can jump from 0 to i
    // Derivation: f[i] = OR(f[j], j<i && j can jump to i) — check whether the last jump from any previous point can reach the current point
    // Initialization: f[0] = 0
    // Result: f[n-1]
    if len(nums) == 0 {
        return true
    }
    f := make([]bool, len(nums))
    f[0] = true
    for i := 1; i < len(nums); i++ {
        for j := 0; j < i; j++ {
            if f[j] == true && nums[j]+j >= i {
                f[i] = true
            }
        }
    }
    return f[len(nums)-1]
}
```

### [jump-game-ii](https://leetcode-cn.com/problems/jump-game-ii/)

> Dada uma matriz de números inteiros não negativos, você é inicialmente posicionado no primeiro índice da matriz.
> Cada elemento na matriz representa o comprimento máximo do salto naquela posição.
> Seu objetivo é alcançar o último índice no número mínimo de pula.

```go
// v1 dynamic programming (other languages may time out; refer to v2)
func jump(nums []int) int {
    // State: f[i] represents the minimum number of jumps from the start to the current position
    // Derivation: f[i] = f[j], a[j]+j >= i, min(f[j]+1)
    // Initialization: f[0] = 0
    // Result: f[n-1]
    f := make([]int, len(nums))
    f[0] = 0
    for i := 1; i < len(nums); i++ {
        // The maximum value of f[i] is i
        f[i] = i
        // Iterate over previous results and take the minimum + 1
        for j := 0; j < i; j++ {
            if nums[j]+j >= i {
                f[i] = min(f[j]+1,f[i])
            }
        }
    }
    return f[len(nums)-1]
}
func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```

```go
// v2 dynamic programming + greedy optimization
func jump(nums []int) int {
    n:=len(nums)
    f := make([]int, n)
    f[0] = 0
    for i := 1; i < n; i++ {
        // Take the first point that can jump to the current position
        // Since the result set of jump counts is monotonically increasing, the greedy approach is correct
        idx:=0
        for idx<n&&idx+nums[idx]<i{
            idx++
        }
        f[i]=f[idx]+1
    }
    return f[n-1]
}

```

### [palindrome-partitioning-ii](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

> Dada uma string _s_, particione _s_ de modo que cada substring da partição seja um palíndromo.
> Retorne o número mínimo de cortes necessários.

```go
func minCut(s string) int {
	// state: f[i] is the minimum number of cuts needed for the substring formed by the "first i" characters (count - 1 is the index)
	// function: f[i] = MIN{f[j]+1}, j < i && [j+1 ~ i] is a palindrome
	// initialize: f[i] = i - 1 (f[0] = -1)
	// answer: f[s.length()]
	if len(s) == 0 || len(s) == 1 {
		return 0
	}
	f := make([]int, len(s)+1)
	f[0] = -1
	f[1] = 0
	for i := 1; i <= len(s); i++ {
		f[i] = i - 1
		for j := 0; j < i; j++ {
			if isPalindrome(s, j, i-1) {
				f[i] = min(f[i], f[j]+1)
			}
		}
	}
	return f[len(s)]
}
func min(a, b int) int {
	if a > b {
		return b
	}
	return a
}
func isPalindrome(s string, i, j int) bool {
	for i < j {
		if s[i] != s[j] {
			return false
		}
		i++
		j--
	}
	return true
}
```

Nota

 - Ao verificar substrings palindrômicas, você pode pré-calculá-las com programação dinâmica para reduzir a complexidade do tempo. subsequência.

```go
func lengthOfLIS(nums []int) int {
    // f[i] represents the length of the longest subsequence ending at i, starting from 0
    // f[i] = max(f[j])+1, a[j]<a[i]
    // f[0...n-1] = 1
    // max(f[0]...f[n-1])
    if len(nums) == 0 || len(nums) == 1 {
        return len(nums)
    }
    f := make([]int, len(nums))
    f[0] = 1
    for i := 1; i < len(nums); i++ {
        f[i] = 1
        for j := 0; j < i; j++ {
            if nums[j] < nums[i] {
                f[i] = max(f[i], f[j]+1)
            }
        }
    }
    result := f[0]
    for i := 1; i < len(nums); i++ {
        result = max(result, f[i])
    }
    return result

}
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

### [word-break](https://leetcode-cn.com/problems/word-break/)

> Dada uma string **não vazia** *s* e um dicionário *wordDict* contendo uma lista de palavras **não vazias**, determine se *s* pode ser segmentado em uma sequência separada por espaços de uma ou mais palavras do dicionário.

```go
func wordBreak(s string, wordDict []string) bool {
	// f[i] represents whether the first i characters can be segmented
	// f[i] = f[j] && s[j+1~i] in wordDict
	// f[0] = true
	// return f[len]

	if len(s) == 0 {
		return true
	}
	f := make([]bool, len(s)+1)
	f[0] = true
	max,dict := maxLen(wordDict)
	for i := 1; i <= len(s); i++ {
		l := 0
		if i - max > 0 {
			l = i - max
		}
		for j := l; j < i; j++ {
			if f[j] && inDict(s[j:i],dict) {
				f[i] = true
                break
			}
		}
	}
	return f[len(s)]
}



func maxLen(wordDict []string) (int,map[string]bool) {
    dict := make(map[string]bool)
	max := 0
	for _, v := range wordDict {
		dict[v] = true
		if len(v) > max {
			max = len(v)
		}
	}
	return max,dict
}

func inDict(s string,dict map[string]bool) bool {
	_, ok := dict[s]
	return ok
}

```

Resumo

A abordagem comum é usar a posição 0 como espaço reservado, para que os problemas possam ser tratados de maneira uniforme. A inicialização então usa comprimento+1 em cima do original, e o resultado retornado é f[n].

- O estado pode ser "o primeiro i"
- Inicializar com comprimento+1
- Acesso com índice = i-1
- Valor de retorno: f[n] ou f[m][n]

## Duas Sequências DP (40%)

### [mais longa subsequência comum](https://leetcode-cn.com/problems/longest-common-subsequence/)

> Dadas duas strings text1 e text2, retorne a subsequência comum mais longa dessas duas strings.
> Uma subsequência de uma string é uma nova string gerada a partir da string original com alguns caracteres (pode ser nenhum) excluídos sem alterar a ordem relativa dos restantes caracteres.
> Por exemplo, "ace" é uma subsequência de "abcde", mas "aec" não é uma subsequência de "abcde". Uma "subsequência comum" de duas strings é uma subsequência comum a ambas as strings.

```go
func longestCommonSubsequence(a string, b string) int {
    // dp[i][j] is the longest common subsequence of the first i characters of a and the first j characters of b
    // dp[m+1][n+1]
    //   ' a d c e
    // ' 0 0 0 0 0
    // a 0 1 1 1 1
    // c 0 1 1 2 1
    //
    dp:=make([][]int,len(a)+1)
    for i:=0;i<=len(a);i++ {
        dp[i]=make([]int,len(b)+1)
    }
    for i:=1;i<=len(a);i++ {
        for j:=1;j<=len(b);j++ {
            // If equal, take the top-left element + 1; otherwise take the larger of left or top
            if a[i-1]==b[j-1] {
                dp[i][j]=dp[i-1][j-1]+1
            } else {
                dp[i][j]=max(dp[i-1][j],dp[i][j-1])
            }
        }
    }
    return dp[len(a)][len(b)]
}
func max(a,b int)int {
    if a>b{
        return a
    }
    return b
}
```

Nota

- Inicialização de fatia Go

```go
dp:=make([][]int,len(a)+1)
for i:=0;i<=len(a);i++ {
    dp[i]=make([]int,len(b)+1)
}
```

- Iterar de 1 até o comprimento máximo
- O índice precisa ser decrementado em um

### [edit-distance](https://leetcode-cn.com/problems/edit-distance/)

> Dadas duas palavras word1 e word2, calcule o número mínimo de operações necessárias para converter word1 em word2.
> Você pode executar o três operações seguintes em uma palavra:
> Inserir um caracter
> Excluir um caracter
> Substituir um caracter

Idéia: muito semelhante ao problema anterior. Se for igual, nenhuma operação será necessária; caso contrário, pegue o mínimo das operações de exclusão, inserção e substituição + 1.

```go
func minDistance(word1 string, word2 string) int {
    // dp[i][j] represents the minimum number of operations to edit the first i characters of string a into the first j characters of string b
    // dp[i][j] = OR(dp[i-1][j-1], a[i]==b[j], min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1)
    dp:=make([][]int,len(word1)+1)
    for i:=0;i<len(dp);i++{
        dp[i]=make([]int,len(word2)+1)
    }
    for i:=0;i<len(dp);i++{
        dp[i][0]=i
    }
    for j:=0;j<len(dp[0]);j++{
        dp[0][j]=j
    }
    for i:=1;i<=len(word1);i++{
        for j:=1;j<=len(word2);j++{
            // If equal, no operation is needed
            if word1[i-1]==word2[j-1] {
                dp[i][j]=dp[i-1][j-1]
            }else{ // Otherwise take the minimum of delete, insert, replace + 1
                dp[i][j]=min(min(dp[i-1][j],dp[i][j-1]),dp[i-1][j-1])+1
            }
        }
    }
    return dp[len(word1)][len(word2)]
}
func min(a,b int)int{
    if a>b{
        return b
    }
    return a
}
```

Nota

> Outra abordagem: MAXLEN(a,b)-LCS(a,b)

## Troca de moedas e mochila (10%)

### [troca de moedas](https://leetcode-cn.com/problems/coin-change/)

> Dadas moedas de denominações diferentes e um valor total, escreva uma função para calcular o menor número de moedas necessárias para perfazer esse valor. Se esse valor não puder ser compensado por nenhuma combinação de moedas, retorne -1.

Ideia: um pouco diferente de outros problemas de DP — aqui i representa dinheiro ou capacidade.

```go
func coinChange(coins []int, amount int) int {
    // State dp[i] represents the minimum number of coins to make up amount i
    // Derivation dp[i] = min(dp[i-1], dp[i-2], dp[i-5])+1, on the condition that i-coins[j] > 0
    // Initialize to the maximum value dp[i]=amount+1
    // Return value dp[n], or if dp[n]>amount => -1
    dp:=make([]int,amount+1)
    for i:=0;i<=amount;i++{
        dp[i]=amount+1
    }
    dp[0]=0
    for i:=1;i<=amount;i++{
        for j:=0;j<len(coins);j++{
            if  i-coins[j]>=0  {
                dp[i]=min(dp[i],dp[i-coins[j]]+1)
            }
        }
    }
    if dp[amount] > amount {
        return -1
    }
    return dp[amount]

}
func min(a,b int)int{
    if a>b{
        return b
    }
    return a
}
```

Nota

> dp[i-a[j]] decide se a[j] participa

### [mochila](https://www.lintcode.com/problem/backpack/description)

> Dados n itens, selecione alguns itens para colocar em uma mochila. Quão cheio pode estar no máximo? Suponha que o tamanho da mochila seja m e o tamanho de cada item seja A[i].

```go
func backPack (m int, A []int) int {
    // write your code here
    // f[i][j] represents whether the first i items can fill capacity j
    // f[i][j] = f[i-1][j], f[i-1][j-a[i]] when j>a[i]
    // f[0][0]=true f[...][0]=true
    // f[n][X]
    f:=make([][]bool,len(A)+1)
    for i:=0;i<=len(A);i++{
        f[i]=make([]bool,m+1)
    }
    f[0][0]=true
    for i:=1;i<=len(A);i++{
        for j:=0;j<=m;j++{
            f[i][j]=f[i-1][j]
            if j-A[i-1]>=0 && f[i-1][j-A[i-1]]{
                f[i][j]=true
            }
        }
    }
    for i:=m;i>=0;i--{
        if f[len(A)][i] {
            return i
        }
    }
    return 0
}

```

### [backpack-ii](https://www.lintcode.com/problem/backpack-ii/description)

> Existem itens `n` e uma mochila de tamanho `m`. O array `A` fornece o tamanho de cada item e o array `V` fornece o valor de cada item.
> Qual é o valor total máximo que pode ser colocado na mochila?

Ideia: f[i][j] é o valor máximo de colocar os primeiros i itens em uma mochila de capacidade j

```go
func backPackII (m int, A []int, V []int) int {
    // write your code here
    // f[i][j] is the maximum value of putting the first i items into a backpack of capacity j
    // f[i][j] = max(f[i-1][j], f[i-1][j-A[i]]+V[i]) — whether to add item A[i]
    // f[0][0]=0 f[0][...]=0 f[...][0]=0
    f:=make([][]int,len(A)+1)
    for i:=0;i<len(A)+1;i++{
        f[i]=make([]int,m+1)
    }
    for i:=1;i<=len(A);i++{
        for j:=0;j<=m;j++{
            f[i][j]=f[i-1][j]
            if j-A[i-1] >= 0{
                f[i][j]=max(f[i-1][j],f[i-1][j-A[i-1]]+V[i-1])
            }
        }
    }
    return f[len(A)][m]
}
func max(a,b int)int{
    if a>b{
        return a
    }
    return b
}
```

## Exercícios

Matriz DP (10%)

- [ ] [triângulo](https://leetcode-cn.com/problems/triangle/)
- [ ] [soma do caminho mínimo](https://leetcode-cn.com/problems/minimum-path-sum/)
- [ ] [caminhos exclusivos](https://leetcode-cn.com/problems/unique-paths/)
- [ ] [caminhos exclusivos-ii](https://leetcode-cn.com/problems/unique-paths-ii/)

Sequência (40%)

- [ ] [escadas de subida](https://leetcode-cn.com/problems/climbing-stairs/)
- [ ] [jogo de salto](https://leetcode-cn.com/problems/jump-game/)
- [ ] [jogo de salto-ii](https://leetcode-cn.com/problems/jump-game-ii/)
- [ ] [particionamento de palíndromo-ii](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)
- [ ] [subsequência crescente mais longa](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
- [] [quebra de palavra](https://leetcode-cn.com/problems/word-break/)

Duas sequências DP (40%)

- [] [maior subsequência comum](https://leetcode-cn.com/problems/longest-common-subsequence/)
- [] [editar distância](https://leetcode-cn.com/problems/edit-distance/)

Mochila e troca de moedas (10%)

- [] [troca de moedas](https://leetcode-cn.com/problems/coin-change/)
- [] [mochila](https://www.lintcode.com/problem/backpack/description)
- [ ] [mochila-ii](https://www.lintcode.com/problem/backpack-ii/description)
