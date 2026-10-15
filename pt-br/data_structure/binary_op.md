# Binary

## Operações Binárias Comuns

### Operações Básicas

a=0^a=a^0

0=a^a

Dos dois acima podemos derivar: a=a^b^b

### Troca Dois Números

a=a^b

b=a^b

a=a^b

### Remova o último 1

a=n&(n-1)

### Obtenha o último 1

diff=(n&(n-1))^n

## Problemas comuns

[número único](https://leetcode-cn.com/problems/single-number/)

> Dada uma matriz de inteiros **não vazia**, cada elemento aparece duas vezes, exceto um. Encontre esse único elemento.

```go
func singleNumber(nums []int) int {
    // 10 ^10 == 00
    // XOR of two identical numbers gives 0
    result:=0
    for i:=0;i<len(nums);i++{
        result=result^nums[i]
    }
    return result
}
```

[número-único-ii](https://leetcode-cn.com/problems/single-number-ii/)

> Dada uma matriz de inteiros **não vazia**, cada elemento aparece três vezes, exceto uma. Encontre esse único elemento.

```go
func singleNumber(nums []int) int {
	// Count the number of 1s in each bit
	var result int
	for i := 0; i < 64; i++ {
		sum := 0
		for j := 0; j < len(nums); j++ {
			// Count the number of 1s
			sum += (nums[j] >> i) & 1
		}
		// Restore the bit 00^10=10, or you can also use |
		result ^= (sum % 3) << i
	}
	return result
}
```

[número-único-iii](https://leetcode-cn.com/problems/single-number-iii/)

> Dado um array inteiro `nums`, no qual exatamente dois elementos aparecem apenas uma vez e todos os outros elementos aparecem exatamente duas vezes. Encontre os dois elementos que aparecem apenas uma vez.

```go
func singleNumber(nums []int) []int {
    // a=a^b
    // b=a^b
    // a=a^b
    // The key point is how to split a^b into two parts. Approach: distinguish by the last 1 of diff

    diff:=0
    for i:=0;i<len(nums);i++{
        diff^=nums[i]
    }
    result:=[]int{diff,diff}
    // After removing the trailing 1, XOR with diff to get the position of the last 1
    diff=(diff&(diff-1))^diff
    for i:=0;i<len(nums);i++{
        if diff&nums[i]==0{
            result[0]^=nums[i]
        }else{
            result[1]^=nums[i]
        }
    }
    return result
}
```

[número de 1 bits](https://leetcode-cn.com/problems/number-of-1-bits/)

> Escreva uma função que recebe um número inteiro sem sinal e retorna o número de bits '1' em sua representação binária (também conhecido como [peso de Hamming](https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E9%87%8D%E9%87%8F)).

```go
func hammingWeight(num uint32) int {
    res:=0
    for num!=0{
        num=num&(num-1)
        res++
    }
    return res
}
```

[bits de contagem](https://leetcode-cn.com/problems/counting-bits/)

> Dado um número inteiro não negativo **num**. Para cada número i no intervalo 0 ≤ i ≤ num, calcule o número de 1s em sua representação binária e retorne-os como um array.

```go
func countBits(num int) []int {
    res:=make([]int,num+1)

    for i:=0;i<=num;i++{
        res[i]=count1(i)
    }
    return res
}
func count1(n int)(res int){
    for n!=0{
        n=n&(n-1)
        res++
    }
    return
}
```

Outra solução de programação dinâmica

```go
func countBits(num int) []int {
    res:=make([]int,num+1)
    for i:=1;i<=num;i++{
        // Just take the previous element that is missing one 1 and add 1
        res[i]=res[i&(i-1)]+1
    }
    return res
}
```

[reverse-bits](https://leetcode-cn.com/problems/reverse-bits/)

> Reverter os bits binários de um determinado número inteiro sem sinal de 32 bits.

Ideia: reverter bit por bit

```go
func reverseBits(num uint32) uint32 {
    var res uint32
    var pow int=31
    for num!=0{
        // Take out the last bit, left-shift it, and accumulate into the result
        res+=(num&1)<<pow
        num>>=1
        pow--
    }
    return res
}
```

[intervalo de bits e de números](https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/)

> Dado um intervalo [m, n] onde 0 <= m <= n <= 2147483647, retorne o AND bit a bit de todos os números neste intervalo (incluindo ambos os pontos de extremidade m e n).

```go
func rangeBitwiseAnd(m int, n int) int {
    // m 5 1 0 1
    //   6 1 1 0
    // n 7 1 1 1
    // Right-shift away all the parts that may contain 0, turning into
    // m 5 1 0 0
    //   6 1 0 0
    // n 7 1 0 0
    // So the final result is m<<count
    var count int
    for m!=n{
        m>>=1
        n>>=1
        count++
    }
    return m<<count
}
```

## Exercícios

- [ ] [número único](https://leetcode-cn.com/problems/single-number/)
- [ ] [número único-ii](https://leetcode-cn.com/problems/single-number-ii/)
- [ ] [número único-iii](https://leetcode-cn.com/problems/single-number-iii/)
- [ ] [número de 1 bits](https://leetcode-cn.com/problems/number-of-1-bits/)
- [ ] [contando bits](https://leetcode-cn.com/problems/counting-bits/)
- [ ] [bits reversos](https://leetcode-cn.com/problems/reverse-bits/)
