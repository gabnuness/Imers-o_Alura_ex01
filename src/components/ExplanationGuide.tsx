import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  ShieldAlert,
  Type,
  Repeat,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  CONCEPT_EXPLANATIONS,
  PYTHON_QUIZ,
} from '../utils/pythonCodeSnippets';

export const ExplanationGuide: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  const handleSelectOption = (quizId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionIdx }));
  };

  return (
    <div className="space-y-8">
      {/* Introduction Hero */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Guia Didático Completo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Como a Calculadora em Python Funciona?
          </h2>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            Uma calculadora pode parecer um projeto simples, mas ela reúne os pilares fundamentais da ciência da computação e do desenvolvimento em Python: <strong>modularização em funções</strong>, <strong>conversão de tipos de dados</strong>, <strong>estruturas de controle de fluxo</strong> e <strong>tratamento defensivo de exceções</strong>.
          </p>
        </div>
      </div>

      {/* Visual Execution Flow Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          O Fluxo de Execução da Aplicação (Step-by-Step)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-2">
                1
              </span>
              <h4 className="font-bold text-white mb-1">Início &amp; Menu</h4>
              <p className="text-slate-400 text-[11px]">
                O interpretador entra no laço <code className="text-indigo-300 font-mono">while True</code> e exibe as 5 opções do menu.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-2">
                2
              </span>
              <h4 className="font-bold text-white mb-1">Escolha</h4>
              <p className="text-slate-400 text-[11px]">
                O usuário digita a opção (1-5). Se digitar "5", a instrução <code className="text-indigo-300 font-mono">break</code> encerra o programa.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-2">
                3
              </span>
              <h4 className="font-bold text-white mb-1">Entrada e Cast</h4>
              <p className="text-slate-400 text-[11px]">
                <code className="text-indigo-300 font-mono">float(input())</code> converte a digitação em números reais, protegidos por <code className="text-indigo-300 font-mono">try...except ValueError</code>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-2">
                4
              </span>
              <h4 className="font-bold text-white mb-1">Decisão (if/elif)</h4>
              <p className="text-slate-400 text-[11px]">
                A estrutura condicional encaminha para a função correspondente: <code className="text-indigo-300 font-mono">adicao</code>, <code className="text-indigo-300 font-mono">subtracao</code>, <code className="text-indigo-300 font-mono">multiplicacao</code> ou <code className="text-indigo-300 font-mono">divisao</code>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-2">
                5
              </span>
              <h4 className="font-bold text-white mb-1">Cálculo &amp; Erros</h4>
              <p className="text-slate-400 text-[11px]">
                A função retorna o resultado via <code className="text-indigo-300 font-mono">return</code>. Se <code className="text-rose-300 font-mono">b == 0</code>, dispara <code className="text-rose-300 font-mono">ZeroDivisionError</code> capturado com segurança.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mb-2">
                6
              </span>
              <h4 className="font-bold text-white mb-1">Saída (f-string)</h4>
              <p className="text-slate-400 text-[11px]">
                O resultado é impresso na tela via f-string <code className="text-indigo-300 font-mono">f"Resultado: {`{resultado}`}"</code> e o loop reinicia!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CONCEPT_EXPLANATIONS.map((concept, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                {concept.title}
              </h3>
              <p className="text-xs text-indigo-300 font-medium mb-3">
                {concept.summary}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {concept.details}
              </p>

              {/* Code Box */}
              <div className="bg-slate-950 rounded-xl p-3 font-mono text-xs text-slate-200 border border-slate-800/80 mb-4 whitespace-pre overflow-x-auto">
                {concept.example}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Benefícios Desta Abordagem:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {concept.benefits.map((b, bIdx) => (
                  <span
                    key={bIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The Crucial if __name__ == "__main__" explanation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400" />
          Por que usamos <code className="font-mono text-indigo-300">if __name__ == "__main__":</code>?
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mt-2">
          No final do arquivo <code className="font-mono text-indigo-300">calculadora_modular.py</code>, você encontra o bloco:
        </p>
        <div className="bg-slate-950 rounded-xl p-3.5 font-mono text-xs text-emerald-300 border border-slate-800 my-3">
          {`if __name__ == "__main__":\n    main()`}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Esta é uma das convenções mais importantes do ecossistema Python! Quando você executa o arquivo diretamente (<code className="font-mono text-slate-100">python calculadora.py</code>), o Python define a variável especial interna <code className="font-mono text-indigo-300">__name__</code> como <code className="font-mono text-indigo-300">"__main__"</code>, disparando a função <code className="font-mono text-slate-100">main()</code>. Porém, se outro arquivo ou módulo importar as suas funções com <code className="font-mono text-slate-100">from calculadora import adicao</code>, o código da função <code className="font-mono text-slate-100">main()</code> NÃO será executado automaticamente. Isso torna suas funções reutilizáveis em qualquer outro projeto sem efeitos colaterais indesejados!
        </p>
      </div>

      {/* Interactive Knowledge Quiz */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Teste Seus Conhecimentos
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Quiz Rápido de Python
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmittedQuiz(true);
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/30"
          >
            Verificar Respostas
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {PYTHON_QUIZ.map((q) => {
            const chosen = selectedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3"
              >
                <div className="font-semibold text-sm text-white">
                  {q.id}. {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let style = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60';

                    if (isSelected) {
                      style = 'bg-indigo-600/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500';
                    }

                    if (submittedQuiz) {
                      if (opt.correct) {
                        style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                      } else if (isSelected && !opt.correct) {
                        style = 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${style}`}
                      >
                        <span>{opt.text}</span>
                        {submittedQuiz && opt.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                        )}
                        {submittedQuiz && isSelected && !opt.correct && (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submittedQuiz && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
