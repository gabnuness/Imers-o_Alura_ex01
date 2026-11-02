import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  FileText,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const TypeHintsExplainer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'vazia' | 'normal' | 'typed'>('typed');
  const [activeToken, setActiveToken] = useState<string | null>('typeA');

  const tokensInfo: Record<
    string,
    { title: string; subtitle: string; description: string; analogy: string; example: string }
  > = {
    def: {
      title: 'def (Define Function)',
      subtitle: 'Palavra-chave reservada do Python',
      description:
        'Avisa ao interpretador Python: "Atenção, a partir daqui estou criando uma receita/função reutilizável chamada x".',
      analogy: 'É como escrever o título de uma receita no seu caderno.',
      example: 'def minha_funcao():',
    },
    name: {
      title: 'x (Nome da Função)',
      subtitle: 'Identificador escolhido por você',
      description:
        'O nome que você usará depois para chamar a função (ex: x(10, 5) ou adicao(10, 5)).',
      analogy: 'É o nome do botão no controle remoto.',
      example: 'def calcular_total(...):',
    },
    paramA: {
      title: 'a (Parâmetro de Entrada)',
      subtitle: 'Variável que recebe o primeiro argumento',
      description:
        'Funciona como uma gaveta que vai guardar o primeiro número que alguém enviar para a função.',
      analogy: 'A fenda de entrada da máquina onde você coloca a primeira moeda.',
      example: 'a = 15.5',
    },
    typeA: {
      title: ': float (Anotação de Tipo do Parâmetro a)',
      subtitle: 'Type Hint (Dica de Tipo)',
      description:
        'Os dois-pontos seguidos de `float` indicam formalmente: "Esta função foi projetada para receber um número real/decimal neste parâmetro".',
      analogy: 'Uma etiqueta de instrução na entrada: "Aceita moedas de R$ 1,00".',
      example: 'num: float  # Espera números como 10.5, 3.14 ou 2.0',
    },
    paramB: {
      title: 'b (Segundo Parâmetro)',
      subtitle: 'Variável que recebe o segundo argumento',
      description:
        'A gaveta que vai guardar o segundo valor a ser utilizado na operação.',
      analogy: 'A segunda moeda que você insere na máquina.',
      example: 'b = 4.0',
    },
    typeB: {
      title: ': float (Anotação de Tipo do Parâmetro b)',
      subtitle: 'Type Hint do Segundo Parâmetro',
      description:
        'Indica que o segundo valor também deve ser do tipo número decimal (float).',
      analogy: 'Outra etiqueta garantindo que você não coloque uma ficha de papel.',
      example: 'divisor: float',
    },
    arrow: {
      title: '-> (Seta de Retorno)',
      subtitle: 'Indicador de Saída (Return Type Annotation)',
      description:
        'A combinação do traço com sinal de maior (->) aponta para o tipo do resultado que a instrução `return` vai produzir.',
      analogy: 'Uma seta na esteira de saída indicando o que a máquina entrega.',
      example: 'def func() -> int:  # Devolve um número inteiro',
    },
    returnType: {
      title: 'float (Tipo de Retorno)',
      subtitle: 'O formato do dado devolvido',
      description:
        'Garante que quem chamar esta função receberá de volta um número decimal (`float`), e não um texto ou booleano.',
      analogy: 'A garantia de que da máquina sairá um suco e não uma torrada.',
      example: 'return a + b  # O resultado será do tipo float',
    },
    colon: {
      title: ': (Dois-Pontos Obrigatório)',
      subtitle: 'Delimitador de Bloco do Python',
      description:
        'Toda estrutura em Python (funções, if, while, for) termina o cabeçalho com `:`. As linhas seguintes precisam estar indentadas (4 espaços).',
      analogy: 'A porta de entrada para o corpo da função.',
      example: '    return a + b',
    },
  };

  const selectedInfo = activeToken ? tokensInfo[activeToken] : tokensInfo['typeA'];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Entendendo Type Hints no Python (PEP 484)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Desvendando a Sintaxe: <code className="text-indigo-400 font-mono">def x(a: float, b: float) -&gt; float</code>
          </h2>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            Se você já conhece funções vazias (<code className="text-indigo-300 font-mono">def x():</code>) ou funções com parâmetros normais (<code className="text-indigo-300 font-mono">def x(a, b):</code>), você está a apenas <strong>um passo</strong> de dominar o Python moderno! As anotações de tipo (<code className="text-emerald-400 font-mono">: float</code> e <code className="text-amber-400 font-mono">-&gt; float</code>) são como <strong>etiquetas inteligentes</strong> que documentam o que entra e o que sai da sua função.
          </p>
        </div>
      </div>

      {/* 3-Stage Comparison: Vazia vs Normal vs Tipada */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          A Evolução: Do Básico ao Profissional (Compare os 3 Estágios)
        </h3>

        {/* Stage Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setActiveStage('vazia')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              activeStage === 'vazia'
                ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
            }`}
          >
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Nível 1 (O que você conhece)
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Função Vazia (Sem Parâmetros)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Não recebe nada de fora. Executa uma tarefa estática e repetitiva.
              </p>
            </div>
            <div className="mt-3 font-mono text-xs text-indigo-300 bg-slate-900 p-2 rounded border border-slate-800">
              def exibir_menu():
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveStage('normal')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              activeStage === 'normal'
                ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
            }`}
          >
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Nível 2 (O que você conhece)
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Parâmetros Tradicionais</h4>
              <p className="text-xs text-slate-400 mt-1">
                Recebe variáveis, mas o Python não avisa qual tipo de dado é esperado.
              </p>
            </div>
            <div className="mt-3 font-mono text-xs text-sky-300 bg-slate-900 p-2 rounded border border-slate-800">
              def adicao(a, b):
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveStage('typed')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              activeStage === 'typed'
                ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
            }`}
          >
            <div>
              <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block">
                Nível 3 (Python Moderno)
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Com Type Hints</h4>
              <p className="text-xs text-slate-300 mt-1">
                O mesmo cálculo, porém documentado com o tipo de entrada e o tipo de saída.
              </p>
            </div>
            <div className="mt-3 font-mono text-xs text-emerald-300 bg-slate-900 p-2 rounded border border-slate-800">
              def adicao(a: float, b: float) -&gt; float:
            </div>
          </button>
        </div>

        {/* Detailed Stage Breakdown Card */}
        <div className="mt-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-4">
          {activeStage === 'vazia' && (
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Como funciona a Função Vazia: <code className="text-indigo-400 font-mono">def exibir_menu():</code>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Dentro dos parênteses <code className="font-mono text-slate-100">()</code> não há nada. Isso significa que a função não precisa de nenhuma informação externa para realizar seu trabalho.
              </p>
              <div className="bg-slate-900 p-3.5 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 my-3">
                {`def exibir_menu():\n    print("1. Adição")\n    print("2. Subtração")\n\n# Como você chama:\nexibir_menu()  # Sem passar nada dentro dos parênteses`}
              </div>
              <p className="text-slate-400">
                <strong>Limitação:</strong> Ela não consegue fazer contas personalizadas, pois não tem como receber números vindos do usuário.
              </p>
            </div>
          )}

          {activeStage === 'normal' && (
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Como funciona a Função com Parâmetros Normais: <code className="text-sky-400 font-mono">def adicao(a, b):</code>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Aqui você colocou duas variáveis dentro dos parênteses: <code className="font-mono text-slate-100">a</code> e <code className="font-mono text-slate-100">b</code>. Quem chamar a função é obrigado a passar 2 valores.
              </p>
              <div className="bg-slate-900 p-3.5 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 my-3">
                {`def adicao(a, b):\n    return a + b\n\n# Chamando com números:\nres1 = adicao(10, 5)     # 15\n\n# Mas e se alguém chamar com textos por engano?\nres2 = adicao("10", "5") # "105" (juntou os textos sem somar!)`}
              </div>
              <p className="text-slate-400 leading-relaxed">
                <strong>O problema:</strong> Olhando apenas para <code className="font-mono text-slate-200">def adicao(a, b):</code>, outro programador (ou até você daqui a 6 meses) não sabe se <code className="font-mono text-slate-200">a</code> deve ser um número inteiro, um decimal, um texto ou uma lista.
              </p>
            </div>
          )}

          {activeStage === 'typed' && (
            <div>
              <h4 className="text-sm font-bold text-emerald-400 mb-1">
                A Mágica do Type Hints: <code className="text-white font-mono">def adicao(a: float, b: float) -&gt; float:</code>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Esta sintaxe faz <strong>EXATAMENTE o mesmo cálculo</strong> que a anterior! O interpretador Python continua somando <code className="font-mono text-slate-100">a + b</code> na mesma velocidade. A diferença é que agora o código tem <strong>autodocumentação oficial</strong>.
              </p>
              <div className="bg-slate-900 p-3.5 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 my-3">
                {`def adicao(a: float, b: float) -> float:\n    """Soma dois números decimais e devolve o resultado."""\n    return a + b`}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <span className="font-bold text-indigo-400 block mb-0.5">a: float</span>
                  "O parâmetro 'a' deve ser um número (com ou sem vírgula)."
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <span className="font-bold text-indigo-400 block mb-0.5">b: float</span>
                  "O parâmetro 'b' também deve ser um número."
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                  <span className="font-bold text-amber-400 block mb-0.5">-&gt; float</span>
                  "A função promete que o que sai pelo return é um número."
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Anatomy Dissector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          Anatomia Interativa: Clique em Qualquer Parte da Função
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Clique nas peças coloridas abaixo para ver o que cada caractere faz na prática:
        </p>

        {/* Big Code Bar with Clickable Tokens */}
        <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex items-center justify-center font-mono text-base sm:text-xl font-semibold gap-1 select-none">
          <button
            type="button"
            onClick={() => setActiveToken('def')}
            className={`px-2 py-1 rounded transition cursor-pointer ${
              activeToken === 'def'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-2 ring-indigo-400'
                : 'text-indigo-400 hover:bg-slate-800'
            }`}
          >
            def
          </button>

          <button
            type="button"
            onClick={() => setActiveToken('name')}
            className={`px-2 py-1 rounded transition cursor-pointer ${
              activeToken === 'name'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400'
                : 'text-blue-300 hover:bg-slate-800'
            }`}
          >
            x
          </button>

          <span className="text-slate-500">(</span>

          <button
            type="button"
            onClick={() => setActiveToken('paramA')}
            className={`px-1 py-1 rounded transition cursor-pointer ${
              activeToken === 'paramA'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/40 ring-2 ring-sky-400'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            a
          </button>

          <button
            type="button"
            onClick={() => setActiveToken('typeA')}
            className={`px-1.5 py-1 rounded transition cursor-pointer ${
              activeToken === 'typeA'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400 animate-pulse'
                : 'text-emerald-400 hover:bg-slate-800'
            }`}
          >
            : float
          </button>

          <span className="text-slate-500">,</span>

          <button
            type="button"
            onClick={() => setActiveToken('paramB')}
            className={`px-1 py-1 rounded transition cursor-pointer ${
              activeToken === 'paramB'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/40 ring-2 ring-sky-400'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            b
          </button>

          <button
            type="button"
            onClick={() => setActiveToken('typeB')}
            className={`px-1.5 py-1 rounded transition cursor-pointer ${
              activeToken === 'typeB'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400'
                : 'text-emerald-400 hover:bg-slate-800'
            }`}
          >
            : float
          </button>

          <span className="text-slate-500">)</span>

          <button
            type="button"
            onClick={() => setActiveToken('arrow')}
            className={`px-1.5 py-1 rounded transition cursor-pointer ${
              activeToken === 'arrow'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/40 ring-2 ring-amber-400'
                : 'text-amber-400 hover:bg-slate-800'
            }`}
          >
            -&gt;
          </button>

          <button
            type="button"
            onClick={() => setActiveToken('returnType')}
            className={`px-1.5 py-1 rounded transition cursor-pointer ${
              activeToken === 'returnType'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400'
                : 'text-emerald-400 hover:bg-slate-800'
            }`}
          >
            float
          </button>

          <button
            type="button"
            onClick={() => setActiveToken('colon')}
            className={`px-1 py-1 rounded transition cursor-pointer ${
              activeToken === 'colon'
                ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            :
          </button>
        </div>

        {/* Selected Token Explanatory Panel */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                {selectedInfo.subtitle}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                {selectedInfo.title}
              </h4>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              {selectedInfo.example}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                O que significa no código:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedInfo.description}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Analogia do dia a dia:
              </span>
              <p className="text-slate-300 leading-relaxed bg-amber-950/20 border border-amber-900/40 p-3 rounded-xl">
                {selectedInfo.analogy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Real Superpowers of Type Hints */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Mas se o Python é dinâmico, por que todo mundo usa Type Hints hoje?
        </h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          O Python foi criado como uma linguagem de tipagem dinâmica. No entanto, em 2015 (com a <strong>PEP 484</strong> no Python 3.5), foram adicionados os Type Hints pelos seguintes 4 motivos cruciais:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-white">Super Autocomplete no VS Code e PyCharm</h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Quando você avisa que a variável é <code className="text-indigo-300 font-mono">float</code> ou <code className="text-indigo-300 font-mono">str</code>, sua IDE sabe instantaneamente quais funções e propriedades sugerir ao apertar ponto (<code className="text-indigo-300 font-mono">.</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-white">Documentação Viva que Nunca Fica Velha</h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Você não precisa escrever comentários longos explicando: <em>"recebe dois números decimais e devolve outro número"</em>. A própria assinatura da função já conta a história inteira de forma limpa.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-white">Detecção de Erros Antes de Rodar (Linters / MyPy)</h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Ferramentas como MyPy leem seu código antes de colocá-lo em produção. Se você tentar passar uma lista para uma função que pede <code className="text-indigo-300 font-mono">float</code>, o linter avisa na hora!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="font-bold text-white">Zero Queda de Performance</h4>
            </div>
            <p className="text-slate-400 leading-relaxed">
              O Python não perde 1 milissegundo sequer. Em tempo de execução, o interpretador lê as anotações sem custo de CPU e executa a velocidade máxima nativa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
