# Go Quick Start

## Sintaxe básica

[A linguagem de programação Go (chinês)](https://books.studygolang.com/gopl-zh/)

## Bibliotecas comuns

### Fatias

Go simula pilhas e filas usando fatias.

Pilha

```go
// Create a stack
stack:=make([]int,0)
// push
stack=append(stack,10)
// pop
v:=stack[len(stack)-1]
stack=stack[:len(stack)-1]
// Check if the stack is empty
len(stack)==0
```

Fila

```go
// Create a queue
queue:=make([]int,0)
// enqueue
queue=append(queue,10)
// dequeue
v:=queue[0]
queue=queue[1:]
// A length of 0 means empty
len(queue)==0
```

Observações

- Ao passar como parâmetro, você só pode modificar os dados; você não pode adicionar ou excluir dos dados originais.
- Por padrão s=s[0:len(s)], que inclui o limite inferior, mas exclui o limite superior, expresso matematicamente como: [)

### Mapas

Uso básico

```go
// Create
m:=make(map[string]int)
// Set a key-value pair
m["hello"]=1
// Delete a key
delete(m,"hello")
// Iterate
for k,v:=range m{
    println(k,v)
}
```

Observações

- As chaves do mapa devem ser comparáveis; eles não podem ser uma fatia, mapa ou função.
- Os valores do mapa sempre têm um valor padrão, no qual você pode operar diretamente, por exemplo. m[age]++ altera o valor de 0 para 1.
- Comparar dois mapas requer iteração para verificar se seus pares de valores-chave são iguais. Devido ao comportamento do valor padrão, você precisa verificar os valores val e ok.

### Biblioteca Padrão

sort

```go
// Sort ints
sort.Ints([]int{})
// Sort strings
sort.Strings([]string{})
// Custom sort
sort.Slice(s,func(i,j int)bool{return s[i]<s[j]})
```

matemática

```go
// int32 max and min values
math.MaxInt32 // Actual value: 1<<31-1
math.MinInt32 // Actual value: -1<<31
// int64 max and min values (int defaults to int64)
math.MaxInt64
math.MinInt64

```

copiar

```go
// To delete a[i], use copy to overwrite position i with values from i+1 to the end, then shrink by 1
copy(a[i:],a[i+1:])
a=a[:len(a)-1]

// If make creates a length, assign by index
a:=make([]int,n)
a[n]=x
// If make has length 0, assign using append()
a:=make([]int,0)
a=append(a,x)
```

### Truques comuns

Conversão de tipo

```go
// byte to number
s="12345"  // s[0] is of type byte
num:=int(s[0]-'0') // 1
str:=string(s[0]) // "1"
b:=byte(num+'0') // '1'
fmt.Printf("%d%s%c\n", num, str, b) // 111

// string to number
num,_:=strconv.Atoi()
str:=strconv.Itoa()

```

## Notas para resolver problemas

- No LeetCode, não use uma variável global como valor de retorno, caso contrário, o verificador de problemas reportará um erro.
