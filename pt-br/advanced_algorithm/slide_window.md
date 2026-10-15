# Janela deslizante

## Modelo

```cpp
/* Sliding window algorithm framework */
void slidingWindow(string s, string t) {
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int left = 0, right = 0;
    int valid = 0;
    while (right < s.size()) {
        // c is the character to be moved into the window
        char c = s[right];
        // Expand the window to the right
        right++;
        // Perform a series of updates on the data inside the window
        ...

        /*** position for debug output ***/
        printf("window: [%d, %d)\n", left, right);
        /********************/

        // Decide whether the left side of the window needs to shrink
        while (window needs shrink) {
            // d is the character to be moved out of the window
            char d = s[left];
            // Shrink the window from the left
            left++;
            // Perform a series of updates on the data inside the window
            ...
        }
    }
}
```

As partes que precisam ser alteradas

- 1. Atualize os dados da janela depois que o ponteiro direito se move para a direita
- 2. Decida se a janela precisa encolher
- 3. Atualize os dados da janela depois que o ponteiro esquerdo se move para a direita
- 4. Calcule o resultado com base nos requisitos do problema

## Exemplos

[substring-janela-mínima](https://leetcode-cn.com/problems/minimum-window-substring/)

> Dadas uma string S e uma string T, encontre a substring mínima em S que contém todas as letras de T.

```go
func minWindow(s string, t string) string {
	// Store the character set of the sliding window
	win := make(map[byte]int)
	// Store the required character set
	need := make(map[byte]int)
	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}
	// Window
	left := 0
	right := 0
	// match: number of matches
	match := 0
	start := 0
	end := 0
	min := math.MaxInt64
	var c byte
	for right < len(s) {
		c = s[right]
		right++
		// If the character is in the required set, add it to the window character set
		if need[c] != 0 {
			win[c]++
			// If the count of the current character matches the required count, increment match by 1
			if win[c] == need[c] {
				match++
			}
		}

		// Once all character counts match, start shrinking the window
		for match == len(need) {
			// Record the result
			if right-left < min {
				min = right - left
				start = left
				end = right
			}
			c = s[left]
			left++
			// If the left pointer points to a character not in the required set, just skip it
			if need[c] != 0 {
				// When the count of the character at the left pointer equals the required count, moving right makes match no longer match, so decrement it
				// Because win may hold more of a character, e.g. 10 A's, but the required count might only be 3
				// So only at the "straw that breaks the camel's back" does match decrement, and only then do we break out of the loop
				if win[c] == need[c] {
					match--
				}
				win[c]--
			}
		}
	}
	if min == math.MaxInt64 {
		return ""
	}
	return s[start:end]
}
```

[permutação em string](https://leetcode-cn.com/problems/permutation-in-string/)

> Dadas duas strings **s1** e **s2**, escreva uma função para determinar se **s2** contém uma permutação de **s1**.

```go
func checkInclusion(s1 string, s2 string) bool {
	win := make(map[byte]int)
	need := make(map[byte]int)
	for i := 0; i < len(s1); i++ {
		need[s1[i]]++
	}
	left := 0
	right := 0
	match := 0
	for right < len(s2) {
		c := s2[right]
		right++
		if need[c] != 0 {
			win[c]++
			if win[c] == need[c] {
				match++
			}
		}
		// When the window length is greater than or equal to the string length, shrink the window
		for right-left >= len(s1) {
			// When the window length matches the string and the count of each character inside also matches, the condition is satisfied
			if match == len(need) {
				return true
			}
			d := s2[left]
			left++
			if need[d] != 0 {
				if win[d] == need[d] {
					match--
				}
				win[d]--
			}
		}
	}
	return false
}

```

[encontre todos os anagramas em uma string](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

> Dada uma string **s** e uma string não vazia **p**, encontre todas as substrings em **s** que sejam anagramas de **p** e retorne os índices iniciais dessas substrings.

```go
func findAnagrams(s string, p string) []int {
    win := make(map[byte]int)
	need := make(map[byte]int)
	for i := 0; i < len(p); i++ {
		need[p[i]]++
	}
	left := 0
	right := 0
	match := 0
    ans:=make([]int,0)
	for right < len(s) {
		c := s[right]
		right++
		if need[c] != 0 {
			win[c]++
			if win[c] == need[c] {
				match++
			}
		}
		// When the window length is greater than or equal to the string length, shrink the window
		for right-left >= len(p) {
			// When the window length matches the string and the count of each character inside also matches, the condition is satisfied
			if right-left == len(p)&& match == len(need) {
				ans=append(ans,left)
			}
			d := s[left]
			left++
			if need[d] != 0 {
				if win[d] == need[d] {
					match--
				}
				win[d]--
			}
		}
	}
	return ans
}
```

[substring mais longa sem caracteres repetidos](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

> Dada uma string, encontre o comprimento da substring mais longa sem repetir caracteres.
> Exemplo 1:
>
> Entrada: "abcabcbb"
> Saída: 3
> Explicação: A substring mais longa sem caracteres repetidos é "abc", portanto seu comprimento é 3.

```go
func lengthOfLongestSubstring(s string) int {
    // Sliding window key points: 1. move the right pointer right 2. shrink the window per the problem 3. move the left pointer right to update the window 4. compute the result per the problem
    if len(s)==0{
        return 0
    }
    win:=make(map[byte]int)
    left:=0
    right:=0
    ans:=1
    for right<len(s){
        c:=s[right]
        right++
        win[c]++
        // Shrink the window
        for win[c]>1{
            d:=s[left]
            left++
            win[d]--
        }
        // Compute the result
        ans=max(right-left,ans)
    }
    return ans
}
func max(a,b int)int{
    if a>b{
        return a
    }
    return b
}
```

## Resumo

- Semelhante aos problemas de dois ponteiros, é mais como uma versão atualizada de dois ponteiros. O ponto central da janela deslizante é manter um conjunto de janelas e um processo baseado nesse conjunto de janelas.
- Etapas principais
 - mover para a direita para a direita
 - encolher
 - mover para a esquerda para a direita
 - calcular o resultado

## Exercícios

- [ ] [substring de janela mínima](https://leetcode-cn.com/problems/minimum-window-substring/)
- [] [permutação em string](https://leetcode-cn.com/problems/permutation-in-string/)
- [] [encontrar todos os anagramas em uma string](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
- [] [substring mais longa sem caracteres repetidos](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
