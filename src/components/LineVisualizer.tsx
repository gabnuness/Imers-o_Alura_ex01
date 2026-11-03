import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Cpu,
  Layers,
  Code2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  OperationType,
  executarCalculo,
} from '../utils/calculator';
import {
  generateExecutionSteps,
  ExecutionStep,
  PYTHON_MODULAR_CODE,
} from '../utils/pythonCodeSnippets';

interface LineVisualizerProps {
  initialA?: number;
  initialB?: number;
  initialOp?: OperationType;
}

export const LineVisualizer: React.FC<LineVisualizerProps> = ({
  initialA = 12,
  initialB = 3,
  initialOp = 'divisao',
}) => {
  const [a, setA] = useState<number>(initialA);
  const [b, setB] = useState<number>(initialB);
  const [operation, setOperation] = useState<OperationType>(initialOp);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps: ExecutionStep[] = generateExecutionSteps(a, b, operation);
  const currentStep = steps[currentStepIdx] || steps[0];

  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [a, b, operation]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          setCurrentStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const activeLineRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentStep.line]);

  const codeLines = PYTHON_MODULAR_CODE.split('\n');

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              Depurador e Simulador de Execução do Interpretador
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Simulador Linha a Linha (Visualizer)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Acompanhe exatamente por onde o Python passa, quais variáveis são criadas e o que acontece na memória.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition cursor-pointer border border-slate-700"
              title="Passo Anterior"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/30"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Auto-Executar
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentStepIdx === steps.length - 1}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition cursor-pointer border border-slate-700"
              title="Próximo Passo"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700"
              title="Reiniciar Simulação"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input Parameters for this simulation */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {operation === 'porcentagem' ? 'Valor Base (a):' : 'Primeiro Número (a):'}
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Operação:
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as OperationType)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              <option value="adicao">Adição (+)</option>
              <option value="subtracao">Subtração (-)</option>
              <option value="multiplicacao">Multiplicação (*)</option>
              <option value="divisao">Divisão (/)</option>
              <option value="porcentagem">Porcentagem (%)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {operation === 'porcentagem' ? 'Porcentagem % (b):' : 'Segundo Número (b):'}
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-1.5 pt-4 sm:pt-0">
            <button
              type="button"
              onClick={() => {
                setA(200);
                setB(15);
                setOperation('porcentagem');
              }}
              className="flex-1 py-1.5 px-2 text-[11px] rounded-lg bg-fuchsia-950/40 border border-fuchsia-800 text-fuchsia-300 hover:bg-fuchsia-900/40 transition cursor-pointer font-medium"
            >
              15% de 200
            </button>
            <button
              type="button"
              onClick={() => {
                setA(10);
                setB(0);
                setOperation('divisao');
              }}
              className="flex-1 py-1.5 px-2 text-[11px] rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 hover:bg-rose-900/40 transition cursor-pointer font-medium"
            >
              10 ÷ 0
            </button>
            <button
              type="button"
              onClick={() => {
                setA(7);
                setB(6);
                setOperation('multiplicacao');
              }}
              className="flex-1 py-1.5 px-2 text-[11px] rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition cursor-pointer font-medium"
            >
              7 × 6
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-indigo-400">
              Passo {currentStepIdx + 1} de {steps.length}:
            </span>
            <span className="text-slate-300 font-medium">
              {currentStep.explanationTitle}
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            {currentStep.conceptBadge}
          </span>
        </div>

        <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              currentStep.isError ? 'bg-rose-500' : 'bg-indigo-500'
            }`}
            style={{
              width: `${((currentStepIdx + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Split view: Code Pane with Active Line Highlighter on Left, Memory & Explanation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Pane */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-slate-300">
                calculadora.py
              </span>
            </div>
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
              Linha ativa: {currentStep.line}
            </span>
          </div>

          <div className="p-3 overflow-y-auto max-h-[520px] font-mono text-xs leading-relaxed select-text">
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = lineNum === currentStep.line;

              return (
                <div
                  key={lineNum}
                  ref={isActive ? activeLineRef : undefined}
                  className={`flex items-start rounded px-2 py-0.5 transition-colors ${
                    isActive
                      ? currentStep.isError
                        ? 'bg-rose-950/70 border-l-4 border-rose-500 text-rose-100 font-semibold shadow-inner'
                        : 'bg-indigo-950/70 border-l-4 border-indigo-500 text-white font-semibold shadow-inner'
                      : 'hover:bg-slate-900/50 text-slate-400'
                  }`}
                >
                  <span
                    className={`w-9 text-right pr-3 select-none flex-shrink-0 text-[11px] ${
                      isActive ? 'text-indigo-400 font-bold' : 'text-slate-600'
                    }`}
                  >
                    {lineNum}
                  </span>
                  <div className="flex items-center gap-1.5 flex-1 overflow-x-auto whitespace-pre">
                    {isActive && (
                      <span className="text-indigo-400 font-bold text-xs select-none">
                        ▶
                      </span>
                    )}
                    <span>{line || ' '}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: What Python is Doing & Variable Inspector */}
        <div className="lg:col-span-5 space-y-5">
          {/* Detailed step explanation */}
          <div
            className={`rounded-2xl p-5 border transition-all ${
              currentStep.isError
                ? 'bg-rose-950/20 border-rose-800/60'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
              {currentStep.isError ? (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-indigo-400" />
              )}
              O Que o Interpretador Python Está Fazendo:
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold text-white mb-2">
                {currentStep.explanationTitle}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStep.explanationText}
              </p>
            </div>

            {/* Current executed code fragment */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">
                Instrução avaliada:
              </span>
              <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 whitespace-pre overflow-x-auto">
                {currentStep.codeSnippet}
              </div>
            </div>
          </div>

          {/* Memory / Variables Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
              <Layers className="w-4 h-4 text-indigo-400" />
              Variáveis na Memória (Python Scope)
            </div>

            <div className="mt-4 space-y-2">
              {Object.entries(currentStep.variables).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs"
                >
                  <span className="text-indigo-400 font-semibold">{key}</span>
                  <span
                    className={`font-semibold ${
                      key === 'excecao' || key === 'status'
                        ? 'text-rose-400'
                        : typeof val === 'number'
                        ? 'text-emerald-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
