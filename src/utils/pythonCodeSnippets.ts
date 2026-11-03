import { OperationType } from './calculator';

/**
 * Python source code examples, step traces, and educational annotations.
 */

export interface PythonScriptOption {
  id: 'modular' | 'simples' | 'oop';
  title: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
}

export const PYTHON_MODULAR_CODE = `"""
Calculadora Interativa em Python (Versão Modular / Profissional)
Demonstra: Modularização em funções, Type Hints, Tratamento de Exceções e Laço Contínuo.
"""

def adicao(a: float, b: float) -> float:
    """Retorna a soma de dois números reais."""
    return a + b

def subtracao(a: float, b: float) -> float:
    """Retorna a diferença entre dois números reais."""
    return a - b

def multiplicacao(a: float, b: float) -> float:
    """Retorna o produto de dois números reais."""
    return a * b

def divisao(a: float, b: float) -> float:
    """
    Retorna o quociente da divisão de a por b.
    Lança ZeroDivisionError se o divisor for zero.
    """
    if b == 0:
        raise ZeroDivisionError("Erro matemático: Divisão por zero não é permitida.")
    return a / b

def porcentagem(valor: float, taxa: float) -> float:
    """
    Retorna a porcentagem calculada (taxa% de valor).
    Exemplo: porcentagem(200, 15) -> 15% de 200 = 30.0
    """
    return (valor * taxa) / 100.0

def exibir_menu() -> None:
    """Exibe o menu de operações disponíveis no console."""
    print("\\n" + "=" * 32)
    print("      CALCULADORA EM PYTHON     ")
    print("=" * 32)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("6. Sair")
    print("-" * 32)

def main():
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-6): ").strip()

        # Encerramento controlado
        if opcao == "6":
            print("\\nObrigado por usar a calculadora! Encerrando...")
            break

        # Validação da opção
        if opcao not in ("1", "2", "3", "4", "5"):
            print("\\n[!] Opção inválida! Escolha um número de 1 a 6.")
            continue

        # Entrada e conversão de dados com tratamento de erro
        try:
            if opcao == "5":
                num1 = float(input("Digite o valor base: "))
                num2 = float(input("Digite a porcentagem (%): "))
            else:
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\\n[!] Erro de entrada: Por favor, digite apenas números válidos!")
            continue

        # Execução da operação e tratamento de divisão por zero
        try:
            if opcao == "1":
                resultado = adicao(num1, num2)
                simbolo = "+"
            elif opcao == "2":
                resultado = subtracao(num1, num2)
                simbolo = "-"
            elif opcao == "3":
                resultado = multiplicacao(num1, num2)
                simbolo = "*"
            elif opcao == "4":
                resultado = divisao(num1, num2)
                simbolo = "/"
            elif opcao == "5":
                resultado = porcentagem(num1, num2)
                simbolo = "%"

            if opcao == "5":
                print(f"\\n>>> RESULTADO: {num2}% de {num1} = {resultado}")
            else:
                print(f"\\n>>> RESULTADO: {num1} {simbolo} {num2} = {resultado}")

        except ZeroDivisionError as err:
            print(f"\\n[!] Exceção capturada: {err}")

        input("\\nPressione Enter para continuar...")

if __name__ == "__main__":
    main()
`;

export const PYTHON_SIMPLES_CODE = `# Calculadora Simples em Python (Para Iniciantes)
print("--- CALCULADORA BÁSICA ---")

num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /, %): ")
num2 = float(input("Digite o segundo número: "))

if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")
elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")
elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")
elif operacao == "/":
    if num2 == 0:
        print("Erro: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
elif operacao == "%":
    resultado = (num1 * num2) / 100
    print(f"Resultado: {num2}% de {num1} = {resultado}")
else:
    print("Operação inválida!")
`;

export const PYTHON_OOP_CODE = `"""
Calculadora Orientada a Objetos (OOP) em Python
Utiliza classes, encapsulamento e histórico de operações.
"""
from typing import List, Dict, Any

class Calculadora:
    def __init__(self):
        self.historico: List[Dict[str, Any]] = []

    def somar(self, a: float, b: float) -> float:
        res = a + b
        self._registrar(a, "+", b, res)
        return res

    def subtrair(self, a: float, b: float) -> float:
        res = a - b
        self._registrar(a, "-", b, res)
        return res

    def multiplicar(self, a: float, b: float) -> float:
        res = a * b
        self._registrar(a, "*", b, res)
        return res

    def dividir(self, a: float, b: float) -> float:
        if b == 0:
            raise ZeroDivisionError("Divisão por zero é indefinida.")
        res = a / b
        self._registrar(a, "/", b, res)
        return res

    def porcentagem(self, valor: float, taxa: float) -> float:
        res = (valor * taxa) / 100.0
        self._registrar(valor, "%", taxa, res)
        return res

    def _registrar(self, a: float, op: str, b: float, res: float) -> None:
        self.historico.append({"a": a, "op": op, "b": b, "resultado": res})

    def exibir_historico(self) -> None:
        print("\\n=== HISTÓRICO DE CÁLCULOS ===")
        if not self.historico:
            print("Nenhum cálculo realizado.")
            return
        for i, item in enumerate(self.historico, start=1):
            if item["op"] == "%":
                print(f"{i}. {item['b']}% de {item['a']} = {item['resultado']}")
            else:
                print(f"{i}. {item['a']} {item['op']} {item['b']} = {item['resultado']}")

# Exemplo de uso:
if __name__ == "__main__":
    calc = Calculadora()
    print("10 + 5 =", calc.somar(10, 5))
    print("20 - 7 =", calc.subtrair(20, 7))
    print("6 * 7 =", calc.multiplicar(6, 7))
    print("100 / 4 =", calc.dividir(100, 4))
    print("15% de 200 =", calc.porcentagem(200, 15))
    calc.exibir_historico()
`;

export const PYTHON_SCRIPTS: PythonScriptOption[] = [
  {
    id: 'modular',
    title: 'Modular & Profissional (Recomendado)',
    badge: 'Com Funções & Try/Except',
    description: 'Código estruturado com funções dedicadas, type hints, tratamento de ZeroDivisionError e ValueError, e laço infinito interativo.',
    filename: 'calculadora.py',
    code: PYTHON_MODULAR_CODE,
  },
  {
    id: 'simples',
    title: 'Básica e Direta',
    badge: 'Iniciantes',
    description: 'Fluxo linear perfeito para dar os primeiros passos com variáveis, input(), float() e estruturas condicionais if / elif / else.',
    filename: 'calculadora_simples.py',
    code: PYTHON_SIMPLES_CODE,
  },
  {
    id: 'oop',
    title: 'Orientada a Objetos (OOP)',
    badge: 'Avançado',
    description: 'Uso de classe Calculadora, métodos de instância, método privado de log e registro em memória do histórico de cálculos.',
    filename: 'calculadora_oop.py',
    code: PYTHON_OOP_CODE,
  },
];

export interface ExecutionStep {
  stepNumber: number;
  line: number;
  codeSnippet: string;
  explanationTitle: string;
  explanationText: string;
  variables: Record<string, string | number | null>;
  conceptBadge: string;
  isError?: boolean;
}

export function generateExecutionSteps(
  a: number,
  b: number,
  operation: OperationType
): ExecutionStep[] {
  const opInfo = {
    adicao: { symbol: '+', fn: 'adicao', lineStart: 6, lineCall: 74, res: a + b },
    subtracao: { symbol: '-', fn: 'subtracao', lineStart: 10, lineCall: 77, res: a - b },
    multiplicacao: { symbol: '*', fn: 'multiplicacao', lineStart: 14, lineCall: 80, res: a * b },
    divisao: { symbol: '/', fn: 'divisao', lineStart: 18, lineCall: 83, res: b === 0 ? null : a / b },
    porcentagem: { symbol: '%', fn: 'porcentagem', lineStart: 27, lineCall: 86, res: (a * b) / 100 },
  }[operation];

  const input1Code =
    operation === 'porcentagem'
      ? `num1 = float(input("Digite o valor base: "))  # Base: ${a}`
      : `num1 = float(input("Digite o primeiro número: "))  # Valor: ${a}`;

  const input2Code =
    operation === 'porcentagem'
      ? `num2 = float(input("Digite a porcentagem (%): "))  # Taxa: ${b}%`
      : `num2 = float(input("Digite o segundo número: "))  # Valor: ${b}`;

  const steps: ExecutionStep[] = [
    {
      stepNumber: 1,
      line: 40,
      codeSnippet: `while True:`,
      explanationTitle: '1. O Laço de Repetição Principal',
      explanationText: 'O Python entra no laço `while True:`. Isso garante que o programa continue rodando para fazer múltiplos cálculos até o usuário decidir sair.',
      variables: { opcao: 'pendente...', num1: '---', num2: '---' },
      conceptBadge: 'Controle de Fluxo (while)',
    },
    {
      stepNumber: 2,
      line: 56,
      codeSnippet: input1Code,
      explanationTitle: '2. Entrada e Conversão de Tipo (Casting)',
      explanationText: `A função input() recebe o texto do usuário. A função float() converte a string para um número decimal em ponto flutuante (${a}).`,
      variables: { num1: a, num2: '---', operacao: opInfo.symbol },
      conceptBadge: 'Tipagem & Entrada (float)',
    },
    {
      stepNumber: 3,
      line: 57,
      codeSnippet: input2Code,
      explanationTitle: '3. Segunda Entrada',
      explanationText: `O segundo valor é lido e convertido da mesma forma: float("${b}") -> ${b}.`,
      variables: { num1: a, num2: b, operacao: opInfo.symbol },
      conceptBadge: 'Variáveis na Memória',
    },
  ];

  if (operation === 'divisao' && b === 0) {
    steps.push(
      {
        stepNumber: 4,
        line: opInfo.lineCall,
        codeSnippet: `resultado = divisao(num1, num2)  # Chamando divisao(${a}, ${b})`,
        explanationTitle: '4. Chamada de Função',
        explanationText: `O interpretador Python pula para o bloco da função def divisao(a: float, b: float) passando a=${a} e b=${b}.`,
        variables: { a, b, 'chamada': 'divisao(a, b)' },
        conceptBadge: 'Chamada de Função',
      },
      {
        stepNumber: 5,
        line: 23,
        codeSnippet: `if b == 0:  # ${b} == 0 é True!`,
        explanationTitle: '5. Validação Crítica de Segurança',
        explanationText: 'Em matemática e na computação, dividir por zero não é definido. A condição `if b == 0:` é avaliada como verdadeira.',
        variables: { a, b, 'b == 0': 'True' },
        conceptBadge: 'Estrutura Condicional (if)',
      },
      {
        stepNumber: 6,
        line: 24,
        codeSnippet: `raise ZeroDivisionError("Erro matemático: Divisão por zero não é permitida.")`,
        explanationTitle: '6. Lançamento da Exceção (raise)',
        explanationText: 'O Python interrompe o fluxo normal e lança um objeto `ZeroDivisionError`. Se não tratássemos esse erro, o programa fecharia com crash no terminal.',
        variables: { excecao: 'ZeroDivisionError', mensagem: 'Divisão por zero não é permitida' },
        conceptBadge: 'Tratamento de Exceções',
        isError: true,
      },
      {
        stepNumber: 7,
        line: 91,
        codeSnippet: `except ZeroDivisionError as err:\n    print(f"[!] Exceção capturada: {err}")`,
        explanationTitle: '7. Captura Graciosa do Erro (except)',
        explanationText: 'O bloco `except ZeroDivisionError` intercepta o erro com segurança! Ele imprime a mensagem amigável e NÃO derruba o programa, permitindo ao usuário tentar novamente.',
        variables: { status: 'Erro interceptado com sucesso!', resultado: 'None' },
        conceptBadge: 'Recuperação de Falha',
        isError: true,
      }
    );
  } else {
    const returnSnippet =
      operation === 'porcentagem'
        ? `return (valor * taxa) / 100.0  # (${a} * ${b}) / 100.0 = ${opInfo.res}`
        : `return a ${opInfo.symbol} b  # ${a} ${opInfo.symbol} ${b} = ${opInfo.res}`;

    const printSnippet =
      operation === 'porcentagem'
        ? `print(f"\\n>>> RESULTADO: {num2}% de {num1} = {resultado}")  # ${b}% de ${a} = ${opInfo.res}`
        : `print(f"\\n>>> RESULTADO: {num1} {simbolo} {num2} = {resultado}")  # ${a} ${opInfo.symbol} ${b} = ${opInfo.res}`;

    steps.push(
      {
        stepNumber: 4,
        line: opInfo.lineCall,
        codeSnippet: `resultado = ${opInfo.fn}(num1, num2)  # Chamando ${opInfo.fn}(${a}, ${b})`,
        explanationTitle: `4. Chamando a Função ${opInfo.fn}()`,
        explanationText: `O interpretador transfere o controle para o escopo local da função \`${opInfo.fn}\`. Os argumentos \`${a}\` e \`${b}\` são atribuídos aos parâmetros.`,
        variables: { 'escopo': `local (${opInfo.fn})`, a, b },
        conceptBadge: 'Escopo e Parâmetros',
      },
      {
        stepNumber: 5,
        line: opInfo.lineStart + 5,
        codeSnippet: returnSnippet,
        explanationTitle: '5. Execução do Cálculo e Retorno',
        explanationText:
          operation === 'porcentagem'
            ? `A CPU calcula a proporção percentual: (${a} * ${b}) / 100 = ${opInfo.res}. O comando \`return\` devolve o resultado.`
            : `A CPU executa a operação aritmética (${a} ${opInfo.symbol} ${b}). O comando \`return\` envia o valor ${opInfo.res} de volta para quem chamou a função.`,
        variables: {
          calculo: operation === 'porcentagem' ? `(${a} * ${b}) / 100` : `${a} ${opInfo.symbol} ${b}`,
          valor_retornado: opInfo.res,
        },
        conceptBadge: 'Retorno de Função (return)',
      },
      {
        stepNumber: 6,
        line: 89,
        codeSnippet: printSnippet,
        explanationTitle: '6. Exibição Formatada com f-string',
        explanationText: `Python utiliza f-strings literais. As variáveis entre chaves são interpoladas com formatação clara e amigável para o usuário.`,
        variables: {
          num1: a,
          simbolo: opInfo.symbol,
          num2: b,
          resultado: opInfo.res,
          saida: operation === 'porcentagem' ? `${b}% de ${a} = ${opInfo.res}` : `${a} ${opInfo.symbol} ${b} = ${opInfo.res}`,
        },
        conceptBadge: 'F-Strings & Formatação',
      }
    );
  }

  return steps;
}

export const CONCEPT_EXPLANATIONS = [
  {
    title: '1. Funções e Modularidade (def)',
    icon: 'code',
    summary: 'Dividir para conquistar: cada operação em sua própria função.',
    details:
      'Em vez de misturar todos os cálculos em um único bloco de código, definimos funções especializadas com a palavra-chave `def`. Isso facilita testes unitários, reaproveitamento de código e leitura limpa.',
    example: 'def adicao(a: float, b: float) -> float:\n    return a + b\n\ndef porcentagem(valor: float, taxa: float) -> float:\n    return (valor * taxa) / 100.0',
    benefits: ['Reutilizável em outros scripts', 'Fácil de testar', 'Separação de responsabilidades'],
  },
  {
    title: '2. Tratamento de Exceções (try / except)',
    icon: 'shield-alert',
    summary: 'Evite que o programa feche abruptamente diante de erros do usuário.',
    details:
      'Dois erros comuns acontecem em calculadoras: o usuário digitar letras em vez de números (`ValueError`) e tentar dividir por zero (`ZeroDivisionError`). O bloco `try...except` blinda a aplicação contra falhas fatais.',
    example: 'try:\n    res = num1 / num2\nexcept ZeroDivisionError:\n    print("Não é permitido dividir por zero!")\nexcept ValueError:\n    print("Digite apenas números válidos!")',
    benefits: ['Programa não trava', 'Mensagens amigáveis ao usuário', 'Robustez de software profissional'],
  },
  {
    title: '3. Entrada e Conversão de Tipos (Type Casting)',
    icon: 'type',
    summary: 'Por que input() não basta para calcular.',
    details:
      'Em Python, a função nativa `input()` SEMPRE devolve dados no formato texto (`str`). Se você somar "5" + "3", o Python concatena para "53"! Por isso, aplicamos a conversão `float(input(...))` para obter números reais.',
    example: 'texto = input("Digite: ")  # "10"\nnumero = float(texto)       # 10.0 (ponto flutuante)',
    benefits: ['Permite números decimais (ex: 3.14)', 'Permite operações matemáticas reais', 'Compatível com inteiros'],
  },
  {
    title: '4. Laço Contínuo Interativo (while True)',
    icon: 'refresh-cw',
    summary: 'Como manter a calculadora aberta para vários cálculos.',
    details:
      'Um script comum executa e fecha imediatamente. Para criar uma aplicação interativa que continua viva até que o usuário decida sair, usamos `while True:`. Quando o usuário escolhe a opção de sair, usamos o comando `break` para interromper o laço.',
    example: 'while True:\n    opcao = input("Deseja sair? (s/n): ")\n    if opcao == "s":\n        break',
    benefits: ['Experiência contínua', 'Menu interativo', 'Saída controlada'],
  },
];

export const PYTHON_QUIZ = [
  {
    id: 1,
    question: 'O que acontece no Python se fizermos `10 / 0` sem nenhum bloco de tratamento de erro?',
    options: [
      { text: 'O Python retorna 0 automaticamente', correct: false },
      { text: 'O Python retorna Infinity como no JavaScript', correct: false },
      { text: 'O interpretador lança uma exceção ZeroDivisionError e interrompe o programa', correct: true },
      { text: 'O Python exibe um aviso amarelo mas continua', correct: false },
    ],
    explanation: 'Em Python, divisão por zero é tratada como erro fatal imediato (ZeroDivisionError). Para que o programa não pare de funcionar abruptamente, devemos capturar esse erro com `try...except ZeroDivisionError`.',
  },
  {
    id: 2,
    question: 'Qual é o tipo retornado pela função nativa `input()` em Python?',
    options: [
      { text: 'int ou float dependendo do que o usuário digitou', correct: false },
      { text: 'Sempre str (string/texto)', correct: true },
      { text: 'Um objeto numérico genérico', correct: false },
      { text: 'None caso nada seja digitado', correct: false },
    ],
    explanation: 'A função `input()` sempre retorna uma string (`str`). Se você não converter para `float()` ou `int()`, operações como `+` irão apenas concatenar os textos em vez de somar aritmeticamente!',
  },
  {
    id: 3,
    question: 'Qual é a vantagem de usar Type Hints como `def adicao(a: float, b: float) -> float:`?',
    options: [
      { text: 'Faz o Python compilar mais rápido', correct: false },
      { text: 'Torna o código autoexplicativo, auxilia IDEs com autocompletar e detecta erros estáticos', correct: true },
      { text: 'Impede obrigatoriamente que qualquer outro tipo entre em tempo de execução', correct: false },
      { text: 'Obriga o Python a usar apenas memória RAM estática', correct: false },
    ],
    explanation: 'Type hints aumentam a legibilidade, documentam os tipos esperados e permitem que linters (como MyPy) e IDEs alertem sobre incompatibilidades antes mesmo do código rodar.',
  },
];
