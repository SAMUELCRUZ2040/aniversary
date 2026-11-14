"use client";

import { useState } from "react";

type Question =
  | { kind: "choice"; q: string; options: string[]; correct: number }
  | { kind: "free"; q: string; hint?: string };

const QUIZ: Question[] = [
  {
    kind: "choice",
    q: "¿Dónde fue nuestro primer beso?",
    options: ["En un café", "En mi casa", "En el parque", "En la playa"],
    correct: 2,
  },
  {
    kind: "free",
    q: "¿Qué nos pasó en nuestro aniversario pasado?",
    hint: "Respóndeme en persona, mi amor 🤍",
  },
  {
    kind: "choice",
    q: "¿De qué color era la camiseta que yo llevaba el primer día de nuestra cita?",
    options: ["Blanco", "Negro", "Amarillo", "Gris"],
    correct: 0,
  },
];

type Phase = "intro" | "quiz" | "done";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<(number | string)[]>([]);
  const [freeAnswer, setFreeAnswer] = useState("");

  function next(value: number | string) {
    const nextPicks = [...picks, value];
    setPicks(nextPicks);
    setFreeAnswer("");
    if (step + 1 < QUIZ.length) {
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      setTimeout(() => setPhase("done"), 180);
    }
  }

  function reset() {
    setPicks([]);
    setStep(0);
    setFreeAnswer("");
    setPhase("quiz");
  }

  const allCorrect =
    picks.length === QUIZ.length &&
    picks.every((p, i) => {
      const q = QUIZ[i];
      if (q.kind === "free") return true; // se responde en persona
      return p === q.correct;
    });

  const current = QUIZ[step];

  return (
    <main
      className="min-h-dvh w-full px-5 py-10 flex items-center justify-center"
      style={{ background: "#fdf3f5" }}
    >
      <div className="w-full max-w-md">
        {phase === "intro" && (
          <div className="text-center fade-in">
            <div
              className="text-4xl"
              style={{ color: "#ffffff", textShadow: "0 0 1px #d4d4d4" }}
            >
              🤍
            </div>
            <h1
              className="mt-4 italic text-3xl text-neutral-900 leading-tight"
              style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
            >
              Para descubrir mi última sorpresa
            </h1>
            <p className="mt-3 text-sm text-neutral-600">
              Tendrás que responder unas preguntas sobre nosotros.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              className="mt-8 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full shadow-lg transition"
            >
              Empezar 🤍
            </button>
          </div>
        )}

        {phase === "quiz" && (
          <div className="fade-in">
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-6 bg-rose-500" : "w-1.5 bg-rose-200"
                  }`}
                />
              ))}
            </div>
            <div className="bg-white rounded-[22px] shadow-[0_18px_40px_-28px_rgba(0,0,0,.22)] p-6">
              <p className="text-[10px] tracking-[0.3em] text-rose-500/80">
                PREGUNTA {step + 1} DE {QUIZ.length}
              </p>
              <h2
                className="mt-2 italic text-2xl text-neutral-900 leading-tight"
                style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
              >
                {current.q}
              </h2>

              {current.kind === "choice" && (
                <div className="mt-6 space-y-2.5">
                  {current.options.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => next(i)}
                      className="w-full text-left px-4 py-3 rounded-2xl bg-white hover:bg-rose-50 border border-neutral-200 text-neutral-800 transition"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}

              {current.kind === "free" && (
                <div className="mt-6">
                  {current.hint && (
                    <p className="text-[12px] italic text-rose-500/80 mb-2">
                      {current.hint}
                    </p>
                  )}
                  <textarea
                    value={freeAnswer}
                    onChange={(e) => setFreeAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta aquí…"
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 text-neutral-800 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 resize-none"
                  />
                  <button
                    onClick={() => next(freeAnswer.trim() || "—")}
                    disabled={!freeAnswer.trim()}
                    className="mt-4 w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white px-6 py-3 rounded-full shadow-lg transition"
                  >
                    Siguiente 🤍
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="text-center fade-in">
            {allCorrect ? (
              <>
                <div className="text-5xl">🎁</div>
                <h2
                  className="mt-4 italic text-3xl text-neutral-900"
                  style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
                >
                  ¡Lo lograste, mi amor!
                </h2>
                <p className="mt-3 text-neutral-700">
                  Te has ganado tu regalo sorpresa 🤍
                </p>
                <p className="mt-6 text-sm italic text-neutral-600">
                  Tu regalo te lo entrego en persona, mi niña preciosa.
                </p>
                <p className="mt-10 text-[11px] text-neutral-400">
                  Con todo mi amor, Samu
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl">🙈</div>
                <h2
                  className="mt-4 italic text-3xl text-neutral-900"
                  style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
                >
                  No has superado la prueba
                </h2>
                <p className="mt-3 text-neutral-700">
                  Casi, casi… pero te equivocaste en alguna. Inténtalo otra vez, mi amor 🤍
                </p>
                <button
                  onClick={reset}
                  className="mt-8 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full shadow-lg transition"
                >
                  Volver a intentarlo
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
