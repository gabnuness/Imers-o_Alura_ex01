"""
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

    def _registrar(self, a: float, op: str, b: float, res: float) -> None:
        self.historico.append({"a": a, "op": op, "b": b, "resultado": res})

    def exibir_historico(self) -> None:
        print("\n=== HISTÓRICO DE CÁLCULOS ===")
        if not self.historico:
            print("Nenhum cálculo realizado.")
            return
        for i, item in enumerate(self.historico, start=1):
            print(f"{i}. {item['a']} {item['op']} {item['b']} = {item['resultado']}")

if __name__ == "__main__":
    calc = Calculadora()
    print("10 + 5 =", calc.somar(10, 5))
    print("20 - 7 =", calc.subtrair(20, 7))
    print("6 * 7 =", calc.multiplicar(6, 7))
    print("100 / 4 =", calc.dividir(100, 4))
    calc.exibir_historico()
