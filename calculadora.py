"""
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
    print("\n" + "=" * 32)
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
            print("\nObrigado por usar a calculadora! Encerrando...")
            break

        # Validação da opção
        if opcao not in ("1", "2", "3", "4", "5"):
            print("\n[!] Opção inválida! Escolha um número de 1 a 6.")
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
            print("\n[!] Erro de entrada: Por favor, digite apenas números válidos!")
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
                print(f"\n>>> RESULTADO: {num2}% de {num1} = {resultado}")
            else:
                print(f"\n>>> RESULTADO: {num1} {simbolo} {num2} = {resultado}")

        except ZeroDivisionError as err:
            print(f"\n[!] Exceção capturada: {err}")

        input("\nPressione Enter para continuar...")

if __name__ == "__main__":
    main()
