import React, { useState } from 'react';
import {
  Plus,
  Minus,
  X,
  Divide,
  Percent,
  AlertTriangle,
  Play,
  RotateCcw,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import {
  OperationType,
  executarCalculo,
  CalculationResult,
} from '../utils/calculator';

interface CalculatorVisualProps {
  onInspectInVisualizer: (a: number, b: number, op: OperationType) => void;
}

export const CalculatorVisual: React.FC<CalculatorVisualProps> = ({
  onInspectInVisualizer,
}) => {
  const [num1, setNum1] = useState<string>('12');
  const [num2, setNum2] = useState<string>('4');
  const [operation, setOperation] = useState<OperationType>('adicao');
  const [history, setHistory] = useState<CalculationResult[]>([
    executarCalculo(200, 15, 'porcentagem'),
    executarCalculo(15, 3, 'multiplicacao'),
    executarCalculo(50, 2, 'divisao'),
    executarCalculo(10, 0, 'divisao'),
  ]);

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  const isValidN1 = !isNaN(n1);
  const isValidN2 = !isNaN(n2);

  const currentResult: CalculationResult | null =
    isValidN1 && isValidN2 ? executarCalculo(n1, n2, operation) : null;

  const handleCalculate = () => {
    if (currentResult) {
      setHistory((prev) => [currentResult, ...prev.slice(0, 7)]);
    }
  };

  const handlePreset = (a: number, b: number, op: OperationType) => {
    setNum1(a.toString());
    setNum2(b.toString());
    setOperation(op);
  };

  const operationsList: {
    type: OperationType;
    symbol: string;
    label: string;
    pythonFunc: string;
    color: string;
    activeClass: string;
  }[] = [
    {
      type: 'adicao',
      symbol: '+',
      label: 'Adição',
      pythonFunc: 'adicao(a, b)',
      color: 'text-emerald-400',
      activeClass: 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500',
    },
    {
      type: 'subtracao',
      symbol: '-',
      label: 'Subtração',
      pythonFunc: 'subtracao(a, b)',
      color: 'text-sky-400',
      activeClass: 'bg-sky-500/20 border-sky-500 text-sky-300 ring-1 ring-sky-500',
    },
    {
      type: 'multiplicacao',
      symbol: '×',
      label: 'Multiplicação',
      pythonFunc: 'multiplicacao(a, b)',
      color: 'text-amber-400',
      activeClass: 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500',
    },
    {
      type: 'divisao',
      symbol: '÷',
      label: 'Divisão',
      pythonFunc: 'divisao(a, b)',
      color: 'text-violet-400',
      activeClass: 'bg-violet-500/20 border-violet-500 text-violet-300 ring-1 ring-violet-500',
    },
    {
      type: 'porcentagem',
      symbol: '%',
      label: 'Porcentagem (%)',
      pythonFunc: 'porcentagem(valor, taxa)',
      color: 'text-fuchsia-400',
      activeClass: 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-300 ring-1 ring-fuchsia-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner introducing the application */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Execução de Operações Aritméticas em Python
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Laboratório Interativo das Operações Matemáticas
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Experimente os cálculos aritméticos abaixo. Veja como o Python executa as funções{' '}
            <code className="text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded text-xs">
              adicao()
            </code>
            ,{' '}
            <code className="text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded text-xs">
              subtracao()
            </code>
            ,{' '}
            <code className="text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded text-xs">
              multiplicacao()
            </code>
            ,{' '}
            <code className="text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded text-xs">
              divisao()
            </code>{' '}
            e{' '}
            <code className="text-fuchsia-300 font-mono bg-fuchsia-950/80 px-1.5 py-0.5 rounded text-xs">
              porcentagem()
            </code>
            , além de como trata o erro crítico de divisão por zero (<code className="text-rose-300 font-mono bg-rose-950/80 px-1.5 py-0.5 rounded text-xs">ZeroDivisionError</code>).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Interactive Calculator Console */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                1. Painel de Entrada &amp; Operação
              </span>
              <span className="text-xs text-indigo-400 font-mono bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                def {operation}({operation === 'porcentagem' ? 'valor, taxa' : 'a, b'})
              </span>
            </div>

            {/* Presets to test */}
            <div className="mt-4">
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Cenários Rápidos para Testar:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePreset(25, 17, 'adicao')}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  25 + 17
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(100, 37, 'subtracao')}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  100 - 37
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(12, 8, 'multiplicacao')}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  12 × 8
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(48, 6, 'divisao')}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  48 ÷ 6
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(200, 15, 'porcentagem')}
                  className="px-2.5 py-1 text-xs rounded-md bg-fuchsia-950/40 hover:bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-800/60 transition cursor-pointer font-medium"
                >
                  15% de 200 (Porcentagem)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(10, 0, 'divisao')}
                  className="px-2.5 py-1 text-xs rounded-md bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 transition cursor-pointer font-medium flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  10 ÷ 0 (Divisão por Zero)
                </button>
              </div>
            </div>

            {/* Number Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div>
                <label
                  htmlFor="input-num1"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  {operation === 'porcentagem' ? 'Valor Base (a):' : 'Primeiro Número (a):'}
                </label>
                <div className="relative">
                  <input
                    id="input-num1"
                    type="number"
                    step="any"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Ex: 10"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-white font-mono text-base focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono">
                    float
                  </span>
                </div>
                {!isValidN1 && (
                  <p className="text-xs text-rose-400 mt-1">Por favor digite um número válido.</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-num2"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  {operation === 'porcentagem' ? 'Porcentagem % (b):' : 'Segundo Número (b):'}
                </label>
                <div className="relative">
                  <input
                    id="input-num2"
                    type="number"
                    step="any"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Ex: 2"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-white font-mono text-base focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono">
                    float
                  </span>
                </div>
                {!isValidN2 && (
                  <p className="text-xs text-rose-400 mt-1">Por favor digite um número válido.</p>
                )}
              </div>
            </div>

            {/* Operation Selector Buttons */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Escolha a Operação:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {operationsList.map((op) => {
                  const isSelected = operation === op.type;
                  return (
                    <button
                      key={op.type}
                      type="button"
                      onClick={() => setOperation(op.type)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                        isSelected
                          ? op.activeClass
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{op.symbol}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-semibold">{op.label}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          {op.type === 'adicao'
                            ? 'a + b'
                            : op.type === 'subtracao'
                            ? 'a - b'
                            : op.type === 'multiplicacao'
                            ? 'a * b'
                            : op.type === 'divisao'
                            ? 'a / b'
                            : '(a * b) / 100'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!isValidN1 || !isValidN2}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                Executar Operação
              </button>

              {isValidN1 && isValidN2 && (
                <button
                  type="button"
                  onClick={() => onInspectInVisualizer(n1, n2, operation)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition cursor-pointer"
                  title="Abre o depurador linha a linha com estes números"
                >
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  Ver Passo a Passo no Código
                </button>
              )}
            </div>
          </div>

          {/* Result Card */}
          {currentResult && (
            <div
              className={`rounded-2xl p-5 border transition-all ${
                currentResult.error
                  ? 'bg-rose-950/20 border-rose-800/60 shadow-lg shadow-rose-950/30'
                  : 'bg-emerald-950/20 border-emerald-800/50 shadow-lg shadow-emerald-950/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Saída da Execução (Resultado)
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    currentResult.error
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {currentResult.error ? 'Exceção Capturada' : 'Sucesso (200 OK)'}
                </span>
              </div>

              {currentResult.error ? (
                <div className="mt-3 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-rose-200">
                      ZeroDivisionError em Python
                    </h3>
                    <p className="text-xs text-rose-300 mt-0.5">{currentResult.error}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      Em Python, se você tentar calcular <code className="font-mono text-rose-300">{currentResult.a} / 0</code> sem um bloco <code className="font-mono text-indigo-300">try...except</code>, o programa encerra com <code className="font-mono text-rose-300">Traceback (most recent call last)</code>. Com o tratamento adequado, o programa avisa o usuário e continua funcionando normalmente!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <div className="text-slate-400 text-xs font-mono">
                    {currentResult.operation === 'porcentagem'
                      ? `${currentResult.b}% de ${currentResult.a} =`
                      : `${currentResult.a} ${currentResult.symbol} ${currentResult.b} =`}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight">
                    {currentResult.result}
                  </div>
                </div>
              )}

              {/* Python Code Snippet preview */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium mb-1.5">
                  Como este cálculo se parece no código Python:
                </div>
                <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-indigo-300 border border-slate-800/80 overflow-x-auto whitespace-pre">
                  {currentResult.pythonSnippet}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: History and Code Breakdown */}
        <div className="lg:col-span-5 space-y-5">
          {/* History of calculations */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Histórico Recente de Cálculos
              </span>
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-[11px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                Limpar
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {history.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  Nenhum cálculo recente ainda. Calcule acima para registrar.
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-indigo-400">
                        {item.symbol}
                      </span>
                      <div>
                        <div className="text-xs font-mono text-slate-200">
                          {item.operation === 'porcentagem'
                            ? `${item.b}% de ${item.a}`
                            : `${item.a} ${item.symbol} ${item.b}`}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {item.opName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.error ? (
                        <span className="text-xs font-mono text-rose-400 font-semibold">
                          ZeroDivisionError
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          = {item.result}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick summary of the Python functions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Funções Fundamentais da Calculadora
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-slate-300">
                <span className="text-indigo-400">def</span>{' '}
                <span className="text-emerald-400">adicao</span>(a, b):{' '}
                <span className="text-indigo-400">return</span> a + b
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-slate-300">
                <span className="text-indigo-400">def</span>{' '}
                <span className="text-sky-400">subtracao</span>(a, b):{' '}
                <span className="text-indigo-400">return</span> a - b
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-slate-300">
                <span className="text-indigo-400">def</span>{' '}
                <span className="text-amber-400">multiplicacao</span>(a, b):{' '}
                <span className="text-indigo-400">return</span> a * b
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-slate-300">
                <span className="text-indigo-400">def</span>{' '}
                <span className="text-violet-400">divisao</span>(a, b):{' '}
                <span className="text-indigo-400">if</span> b == 0:{' '}
                <span className="text-rose-400">raise</span> ZeroDivisionError(...)
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-slate-300">
                <span className="text-indigo-400">def</span>{' '}
                <span className="text-fuchsia-400">porcentagem</span>(valor, taxa):{' '}
                <span className="text-indigo-400">return</span> (valor * taxa) / 100.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
