import React from 'react';
import { Terminal, Download, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { PYTHON_MODULAR_CODE } from '../utils/pythonCodeSnippets';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [downloaded, setDownloaded] = React.useState(false);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([PYTHON_MODULAR_CODE], { type: 'text/x-python;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const tabs = [
    { id: 'calculadora', label: 'Calculadora & Testes' },
    { id: 'visualizador', label: 'Simulador Passo a Passo' },
    { id: 'terminal', label: 'Terminal Python (CLI)' },
    { id: 'codigo', label: 'Código Fonte (.py)' },
    { id: 'guia', label: 'Como Funciona (Guia Didático)' },
    { id: 'typehints', label: 'Entendendo def x(a: float)' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Terminal className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Calculadora em Python
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-mono">
                    v3.12+
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Operações aritméticas (+, -, *, /, %), tratamento de exceções e guia didático interativo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition duration-150 cursor-pointer"
              title="Baixar arquivo calculadora.py"
            >
              <Download className="w-3.5 h-3.5" />
              {downloaded ? 'Baixado com Sucesso!' : 'Baixar Script .py'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
