import React, { useState } from 'react';
import { Header } from './components/Header';
import { CalculatorVisual } from './components/CalculatorVisual';
import { LineVisualizer } from './components/LineVisualizer';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ExplanationGuide } from './components/ExplanationGuide';
import { TypeHintsExplainer } from './components/TypeHintsExplainer';
import { OperationType } from './utils/calculator';
import { Code2, Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('calculadora');
  const [visualizerParams, setVisualizerParams] = useState<{
    a: number;
    b: number;
    op: OperationType;
  }>({
    a: 12,
    b: 4,
    op: 'adicao',
  });

  const handleInspectInVisualizer = (a: number, b: number, op: OperationType) => {
    setVisualizerParams({ a, b, op });
    setActiveTab('visualizador');
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'calculadora' && (
          <CalculatorVisual onInspectInVisualizer={handleInspectInVisualizer} />
        )}

        {activeTab === 'visualizador' && (
          <LineVisualizer
            initialA={visualizerParams.a}
            initialB={visualizerParams.b}
            initialOp={visualizerParams.op}
          />
        )}

        {activeTab === 'terminal' && <TerminalSimulator />}

        {activeTab === 'codigo' && <CodeViewer />}

        {activeTab === 'guia' && <ExplanationGuide />}

        {activeTab === 'typehints' && <TypeHintsExplainer />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">
              Calculadora Python das 4 Operações Básicas
            </span>
            <span>•</span>
            <span>Adição, Subtração, Multiplicação e Divisão</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>PEP 8 &amp; Type Hints</span>
            <span>•</span>
            <span>ZeroDivisionError &amp; ValueError</span>
            <span>•</span>
            <span>Python 3.12+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
