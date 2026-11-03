/**
 * Pure calculation logic mirroring Python's arithmetic operations and errors.
 */

export class ZeroDivisionError extends Error {
  constructor(message = "Divisão por zero não é permitida.") {
    super(message);
    this.name = "ZeroDivisionError";
  }
}

export type OperationType = 'adicao' | 'subtracao' | 'multiplicacao' | 'divisao' | 'porcentagem';

export interface CalculationResult {
  a: number;
  b: number;
  operation: OperationType;
  symbol: string;
  opName: string;
  result: number | null;
  error?: string;
  pythonSnippet: string;
}

/**
 * Adiciona dois números: a + b
 */
export function adicao(a: number, b: number): number {
  return a + b;
}

/**
 * Subtrai b de a: a - b
 */
export function subtracao(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplica dois números: a * b
 */
export function multiplicacao(a: number, b: number): number {
  return a * b;
}

/**
 * Divide a por b: a / b
 * Em Python: lança ZeroDivisionError se b == 0
 */
export function divisao(a: number, b: number): number {
  if (b === 0) {
    throw new ZeroDivisionError("Erro: Não é possível dividir por zero (ZeroDivisionError).");
  }
  return a / b;
}

/**
 * Calcula a porcentagem: taxa% de valor -> (valor * taxa) / 100
 */
export function porcentagem(valor: number, taxa: number): number {
  return (valor * taxa) / 100;
}

export function executarCalculo(a: number, b: number, operacao: OperationType): CalculationResult {
  const symbolMap: Record<OperationType, { symbol: string; name: string }> = {
    adicao: { symbol: '+', name: 'Adição' },
    subtracao: { symbol: '-', name: 'Subtração' },
    multiplicacao: { symbol: '*', name: 'Multiplicação' },
    divisao: { symbol: '/', name: 'Divisão' },
    porcentagem: { symbol: '%', name: 'Porcentagem' },
  };

  const { symbol, name } = symbolMap[operacao];

  try {
    let result: number;
    switch (operacao) {
      case 'adicao':
        result = adicao(a, b);
        break;
      case 'subtracao':
        result = subtracao(a, b);
        break;
      case 'multiplicacao':
        result = multiplicacao(a, b);
        break;
      case 'divisao':
        result = divisao(a, b);
        break;
      case 'porcentagem':
        result = porcentagem(a, b);
        break;
      default:
        throw new Error(`Operação desconhecida: ${operacao}`);
    }

    const pythonSnippet =
      operacao === 'porcentagem'
        ? `def porcentagem(valor: float, taxa: float) -> float:\n    return (valor * taxa) / 100.0\n\nresultado = porcentagem(${a}, ${b})  # -> ${b}% de ${a} = ${result}`
        : `resultado = ${a} ${symbol} ${b}  # -> ${result}`;

    return {
      a,
      b,
      operation: operacao,
      symbol,
      opName: name,
      result,
      pythonSnippet,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      a,
      b,
      operation: operacao,
      symbol,
      opName: name,
      result: null,
      error: errorMsg,
      pythonSnippet: `try:\n    resultado = ${a} ${symbol} ${b}\nexcept ZeroDivisionError:\n    print("${errorMsg}")`,
    };
  }
}
