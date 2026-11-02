import React, { useState } from 'react';
import { Copy, Check, Download, FileCode2, BookOpen, CheckCircle2 } from 'lucide-react';
import { PYTHON_SCRIPTS, PythonScriptOption } from '../utils/pythonCodeSnippets';

export const CodeViewer: React.FC = () => {
  const [selectedScriptId, setSelectedScriptId] = useState<string>('modular');
  const [copied, setCopied] = useState<boolean>(false);

  const activeScript: PythonScriptOption =
    PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([activeScript.code], {
      type: 'text/x-python;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = activeScript.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lines = activeScript.code.split('\n');

  return (
    <div className="space-y-6">
      {/* Top Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PYTHON_SCRIPTS.map((script) => {
          const isSelected = script.id === selectedScriptId;
          return (
            <button
              key={script.id}
              type="button"
              onClick={() => setSelectedScriptId(script.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {script.badge}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-2.5">
                  {script.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {script.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                  {script.filename}
                </span>
                <span className="text-slate-500">
                  {script.code.split('\n').length} linhas
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Code Display Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Action Header */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs font-mono text-slate-300">
              {activeScript.filename}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Código
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Baixar .py
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-4 overflow-x-auto max-h-[600px] font-mono text-xs leading-relaxed">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="flex items-start hover:bg-slate-900/40 rounded px-1 transition-colors"
            >
              <span className="w-10 text-right pr-4 select-none text-slate-600 flex-shrink-0 text-[11px]">
                {idx + 1}
              </span>
              <span className="text-slate-300 whitespace-pre">
                {line || ' '}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Highlights for Selected Script */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Destaques Técnicos Desta Implementação
        </h3>

        {selectedScriptId === 'modular' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-indigo-400 block mb-1">
                Type Hints (PEP 484)
              </span>
              Definições como <code className="text-slate-100 font-mono">def adicao(a: float, b: float) -&gt; float:</code> documentam formalmente os tipos esperados e aumentam a robustez do código.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-rose-400 block mb-1">
                ZeroDivisionError &amp; ValueError
              </span>
              Proteção dupla com <code className="text-slate-100 font-mono">try...except</code>: impede falhas se o usuário digitar texto ou tentar dividir por 0.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-emerald-400 block mb-1">
                Menu Interativo em Loop
              </span>
              O laço <code className="text-slate-100 font-mono">while True:</code> mantém o programa em execução e só finaliza quando a opção 5 é selecionada com <code className="text-slate-100 font-mono">break</code>.
            </div>
          </div>
        )}

        {selectedScriptId === 'simples' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-indigo-400 block mb-1">
                Execução Sequencial Linear
              </span>
              Ideal para quem está nos primeiros passos com Python: segue um fluxo direto de cima para baixo.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-amber-400 block mb-1">
                input() com float()
              </span>
              Demonstra de forma clara como converter o texto digitado pelo usuário em número antes de calcular.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-sky-400 block mb-1">
                if / elif / else
              </span>
              Estruturas condicionais avaliam qual símbolo matemático (+, -, *, /) o usuário digitou.
            </div>
          </div>
        )}

        {selectedScriptId === 'oop' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-indigo-400 block mb-1">
                Classe Calculadora
              </span>
              Agrupa o estado interno (como o histórico de operações) e o comportamento (métodos aritméticos) em uma única classe.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-emerald-400 block mb-1">
                Histórico em Memória
              </span>
              O método privado <code className="text-slate-100 font-mono">_registrar()</code> salva cada operação em uma lista interna (<code className="text-slate-100 font-mono">self.historico</code>).
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="font-bold text-purple-400 block mb-1">
                Padrão de Design Escalável
              </span>
              Permite instanciar múltiplas calculadoras independentes e exportar relatórios no futuro.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
