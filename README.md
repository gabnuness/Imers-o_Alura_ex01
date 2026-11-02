# 🐍 Calculadora em Python & Laboratório Didático Interativo

> Projeto educacional completo demonstrando as **4 operações matemáticas básicas** em Python, tratamento defensivo de exceções, padrões de arquitetura de software, Type Hints (PEP 484) e simulação interativa. Ideal para estudos e compartilhamento em comunidades (Discord, fóruns e faculdades).

---

## 🚀 Sobre o Projeto

Este repositório foi construído para sanar as dúvidas mais frequentes de quem está aprendendo a programar:
1. **Como estruturar as 4 operações básicas** (Adição, Subtração, Multiplicação e Divisão).
2. **Como proteger o código contra falhas** (`ZeroDivisionError` e `ValueError`).
3. **Qual a diferença entre arquiteturas** (Linear, Modular/Funcional e Orientada a Objetos).
4. **O que significa a sintaxe moderna** `def x(a: float, b: float) -> float`.
5. **A ponte entre Python e a Web** (como o ecossistema frontend com React + TypeScript se conecta à lógica matemática).

---

## 📂 Estrutura dos Arquivos Python (Raiz)

Você pode executar qualquer um dos 3 scripts Python diretamente no seu terminal:

| Arquivo | Paradigma / Nível | Descrição |
| :--- | :--- | :--- |
| [`calculadora.py`](./calculadora.py) | **Modular / Profissional** (Recomendado) | Funções independentes com Type Hints, tratamento com `try...except`, laço interativo `while True` e proteção `if __name__ == '__main__'`. |
| [`calculadora_simples.py`](./calculadora_simples.py) | **Linear / Iniciante** | Fluxo direto de cima para baixo com `input()`, `float()` e `if/elif/else`. Perfeito para os primeiros passos. |
| [`calculadora_oop.py`](./calculadora_oop.py) | **Orientado a Objetos (OOP)** | Classe `Calculadora`, encapsulamento de métodos e histórico em memória (`self.historico`). |

---

## 💻 Como Rodar os Scripts Python no Terminal

Certifique-se de ter o **Python 3.8+** instalado.

### 1. Rodar a Calculadora Modular (Interativa)
```bash
python calculadora.py
# ou
python3 calculadora.py
```

### 2. Rodar a Calculadora Básica
```bash
python calculadora_simples.py
```

### 3. Rodar a Calculadora com Classes (OOP)
```bash
python calculadora_oop.py
```

---

## 🌐 Como Rodar o Laboratório Web Interativo (React + TypeScript)

Este projeto também acompanha uma aplicação visual completa com **simulador passo a passo**, **depurador de memória**, **terminal interativo** e **dissecador de sintaxe**.

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.

### Passo a passo
```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento local
npm run dev
```

Abra no navegador em: `http://localhost:3000`

---

## 🧠 Conceitos Explicados no Projeto

### 1. Por que `def adicao(a: float, b: float) -> float:`?
* `a: float` e `b: float`: **Type Hints** indicando que a função espera números reais (decimais).
* `-> float`: Indica formalmente que o comando `return` entregará um número decimal.
* **Benefícios:** Autocomplete inteligente no VS Code/PyCharm, documentação clara e prevenção de bugs sem perda de performance.

### 2. Tratamento Defensivo de Erros
* **Divisão por Zero:** `10 / 0` interrompe programas em Python com `ZeroDivisionError`. O projeto demonstra como validar via cláusulas de guarda e interceptar com `except ZeroDivisionError`.
* **Entrada Inválida:** Se o usuário digitar letras em vez de números, a conversão `float(input())` é capturada por `except ValueError`.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem Principal:** Python 3.12+
- **Frontend Interativo:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Ferramentas de Build & Testes:** Vite, Node Test Runner (`node:test`)

---

## 🤝 Compartilhe no Discord!

Se este repositório te ajudou ou foi útil na sua comunidade:
1. Deixe uma ⭐️ no repositório!
2. Sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.
