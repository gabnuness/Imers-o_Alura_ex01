import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, CornerDownLeft, Sparkles } from 'lucide-react';
import { adicao, subtracao, multiplicacao, divisao } from '../utils/calculator';

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'prompt' | 'error' | 'success';
  text: string;
}

export const TerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'output', text: '================================' },
    { id: '2', type: 'output', text: '      CALCULADORA EM PYTHON     ' },
    { id: '3', type: 'output', text: '================================' },
    { id: '4', type: 'output', text: '1. Adição (+)' },
    { id: '5', type: 'output', text: '2. Subtração (-)' },
    { id: '6', type: 'output', text: '3. Multiplicação (*)' },
    { id: '7', type: 'output', text: '4. Divisão (/)' },
    { id: '8', type: 'output', text: '5. Sair' },
    { id: '9', type: 'output', text: '--------------------------------' },
    { id: '10', type: 'prompt', text: 'Escolha uma opção (1-5): ' },
  ]);

  const [stage, setStage] = useState<'opcao' | 'num1' | 'num2' | 'paused'>('opcao');
  const [selectedOp, setSelectedOp] = useState<string>('');
  const [tempNum1, setTempNum1] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const stageRef = useRef<'opcao' | 'num1' | 'num2' | 'paused'>('opcao');
  const selectedOpRef = useRef<string>('');
  const tempNum1Ref = useRef<number | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const showMenu = (prev: TerminalLine[]): TerminalLine[] => [
    ...prev,
    { id: Math.random().toString(), type: 'output', text: '\n================================' },
    { id: Math.random().toString(), type: 'output', text: '      CALCULADORA EM PYTHON     ' },
    { id: Math.random().toString(), type: 'output', text: '================================' },
    { id: Math.random().toString(), type: 'output', text: '1. Adição (+)' },
    { id: Math.random().toString(), type: 'output', text: '2. Subtração (-)' },
    { id: Math.random().toString(), type: 'output', text: '3. Multiplicação (*)' },
    { id: Math.random().toString(), type: 'output', text: '4. Divisão (/)' },
    { id: Math.random().toString(), type: 'output', text: '5. Sair' },
    { id: Math.random().toString(), type: 'output', text: '--------------------------------' },
    { id: Math.random().toString(), type: 'prompt', text: 'Escolha uma opção (1-5): ' },
  ];

  const handleInputSubmit = (val: string) => {
    const trimmed = val.trim();
    const currentStage = stageRef.current;
    if (!trimmed && currentStage !== 'paused') return;

    if (currentStage === 'paused') {
      setLines((prev) => showMenu(prev));
      stageRef.current = 'opcao';
      setStage('opcao');
      setInputValue('');
      return;
    }

    // Append user input line
    setLines((prev) => [
      ...prev,
      { id: Math.random().toString(), type: 'input', text: trimmed },
    ]);
    setInputValue('');

    if (currentStage === 'opcao') {
      if (trimmed === '5') {
        stageRef.current = 'paused';
        setStage('paused');
        setLines((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: 'output',
            text: '\nObrigado por usar a calculadora Python! Encerrando...\nProcess finished with exit code 0',
          },
        ]);
        return;
      }

      if (!['1', '2', '3', '4'].includes(trimmed)) {
        stageRef.current = 'opcao';
        setStage('opcao');
        setLines((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '\n[!] Opção inválida! Escolha um número de 1 a 5.',
          },
          ...showMenu([]),
        ]);
        return;
      }

      selectedOpRef.current = trimmed;
      setSelectedOp(trimmed);
      stageRef.current = 'num1';
      setStage('num1');
      setLines((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'prompt', text: 'Digite o primeiro número: ' },
      ]);
    } else if (currentStage === 'num1') {
      const parsed = parseFloat(trimmed);
      if (isNaN(parsed)) {
        stageRef.current = 'opcao';
        setStage('opcao');
        setLines((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '\n[!] ValueError: Por favor, digite apenas números válidos!',
          },
          ...showMenu([]),
        ]);
        return;
      }
      tempNum1Ref.current = parsed;
      setTempNum1(parsed);
      stageRef.current = 'num2';
      setStage('num2');
      setLines((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'prompt', text: 'Digite o segundo número: ' },
      ]);
    } else if (currentStage === 'num2') {
      const parsedNum2 = parseFloat(trimmed);
      if (isNaN(parsedNum2)) {
        stageRef.current = 'opcao';
        setStage('opcao');
        setLines((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '\n[!] ValueError: Por favor, digite apenas números válidos!',
          },
          ...showMenu([]),
        ]);
        return;
      }

      const num1 = tempNum1Ref.current!;
      const num2 = parsedNum2;
      const op = selectedOpRef.current;

      let resText = '';
      let isErr = false;

      try {
        if (op === '1') {
          const res = adicao(num1, num2);
          resText = `>>> RESULTADO: ${num1} + ${num2} = ${res}`;
        } else if (op === '2') {
          const res = subtracao(num1, num2);
          resText = `>>> RESULTADO: ${num1} - ${num2} = ${res}`;
        } else if (op === '3') {
          const res = multiplicacao(num1, num2);
          resText = `>>> RESULTADO: ${num1} * ${num2} = ${res}`;
        } else if (op === '4') {
          const res = divisao(num1, num2);
          resText = `>>> RESULTADO: ${num1} / ${num2} = ${res}`;
        }
      } catch (err: unknown) {
        isErr = true;
        const msg = err instanceof Error ? err.message : String(err);
        resText = `[!] ZeroDivisionError capturado: ${msg}`;
      }

      stageRef.current = 'paused';
      setStage('paused');

      setLines((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: isErr ? 'error' : 'success',
          text: `\n${resText}`,
        },
        {
          id: Math.random().toString(),
          type: 'prompt',
          text: '\nPressione Enter para continuar...',
        },
      ]);
    }
  };

  const handleReset = () => {
    stageRef.current = 'opcao';
    selectedOpRef.current = '';
    tempNum1Ref.current = null;
    setStage('opcao');
    setTempNum1(null);
    setSelectedOp('');
    setInputValue('');
    setLines([
      { id: '1', type: 'output', text: '================================' },
      { id: '2', type: 'output', text: '      CALCULADORA EM PYTHON     ' },
      { id: '3', type: 'output', text: '================================' },
      { id: '4', type: 'output', text: '1. Adição (+)' },
      { id: '5', type: 'output', text: '2. Subtração (-)' },
      { id: '6', type: 'output', text: '3. Multiplicação (*)' },
      { id: '7', type: 'output', text: '4. Divisão (/)' },
      { id: '8', type: 'output', text: '5. Sair' },
      { id: '9', type: 'output', text: '--------------------------------' },
      { id: '10', type: 'prompt', text: 'Escolha uma opção (1-5): ' },
    ]);
  };

  const runMacro = (actions: string[]) => {
    handleReset();
    let delay = 100;
    actions.forEach((act) => {
      setTimeout(() => {
        handleInputSubmit(act);
      }, delay);
      delay += 400;
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview and Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
              <TerminalIcon className="w-3.5 h-3.5" />
              Ambiente de Terminal Interativo (CLI)
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Execução no Console do Terminal
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simule a experiência real de rodar <code className="font-mono text-indigo-300">python calculadora_modular.py</code> no terminal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar Sessão
            </button>
          </div>
        </div>

        {/* Quick Test Macros */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Testes Rápidos Automatizados:</span>
          <button
            type="button"
            onClick={() => runMacro(['1', '35', '15', ''])}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            Adição (35 + 15)
          </button>
          <button
            type="button"
            onClick={() => runMacro(['3', '8', '9', ''])}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            Multiplicação (8 * 9)
          </button>
          <button
            type="button"
            onClick={() => runMacro(['4', '10', '0', ''])}
            className="px-2.5 py-1 text-xs rounded-md bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 transition cursor-pointer font-medium"
          >
            Divisão por Zero (10 / 0)
          </button>
          <button
            type="button"
            onClick={() => runMacro(['1', 'banana', ''])}
            className="px-2.5 py-1 text-xs rounded-md bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 transition cursor-pointer font-medium"
          >
            Testar ValueError ('banana')
          </button>
          <button
            type="button"
            onClick={() => runMacro(['5'])}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            Sair (Opção 5)
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-[#090d16] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-400 text-xs ml-2">bash - python calculadora_modular.py</span>
          </div>
          <span className="text-[11px] text-slate-500">Python 3.12.3</span>
        </div>

        {/* Terminal Output */}
        <div className="p-4 sm:p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-1 text-slate-200">
          {lines.map((l) => {
            if (l.type === 'error') {
              return (
                <div key={l.id} className="text-rose-400 font-semibold whitespace-pre-wrap">
                  {l.text}
                </div>
              );
            }
            if (l.type === 'success') {
              return (
                <div key={l.id} className="text-emerald-400 font-bold whitespace-pre-wrap">
                  {l.text}
                </div>
              );
            }
            if (l.type === 'input') {
              return (
                <div key={l.id} className="text-amber-300 font-semibold">
                  {l.text}
                </div>
              );
            }
            return (
              <div key={l.id} className="text-slate-300 whitespace-pre-wrap">
                {l.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Interactive CLI Input Bar */}
        <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center gap-3">
          <span className="text-emerald-400 font-bold text-sm">$&gt;</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInputSubmit(inputValue);
            }}
            className="flex-1 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                stage === 'opcao'
                  ? 'Digite 1, 2, 3, 4 ou 5 e pressione Enter...'
                  : stage === 'paused'
                  ? 'Pressione Enter para continuar...'
                  : 'Digite o número e pressione Enter...'
              }
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 transition cursor-pointer"
            >
              <span>Enviar</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
