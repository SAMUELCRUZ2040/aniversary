"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ------------------- EDITABLE CONTENT -------------------
const NAMES = { a: "Samu", b: "Fer" };
const DATE_LABEL = "Nuestro aniversario";
const DATE_VALUE = "16 de noviembre";
const START_DATE = "2024-11-16"; // ← ajusta a la fecha real
const START_LABEL = "desde el 16 de noviembre de 2024";

const SONG = {
  title: "Nuestra canción",
  artist: "",
  youtubeId: "bx-FrNoav5o",
  cover: `https://img.youtube.com/vi/bx-FrNoav5o/hqdefault.jpg`,
};

type Moment = { src: string; caption: string; kind?: "video" };

const _HISTORY: { file: string; caption: string }[] = [
  { file: "m01.jpg", caption: "Nuestro segundo encuentro, dándonos nuestros primeros besos de amor 🥰. Ese día supe que esto iba muy en serio." },
  { file: "m02.jpg", caption: "Dándote uno de los regalos más bonitos de esta vida: pedirte ser tu novio ❤️." },
  { file: "m03.jpg", caption: "Nuestros primeros regalos 🥹. Me encantan las gomitas, pero mucho más me encantas tú." },
  { file: "m04.mp4", caption: "Siempre estaré en tus logros, mi amor 🥰. Siempre voy a apoyarte, celebrarte y amarte por siempre." },
  { file: "m05.jpg", caption: "Siempre brillando a tu lado, mientras te superas cada día más ✨. Qué orgullo verte crecer." },
  { file: "m06.jpg", caption: "Uno de nuestros primeros viajes juntos, donde la pasamos súper bien 🥰." },
  { file: "m07.jpg", caption: "Pasando momentos de calidad juntos, y disfrutando nuestros cuerpos al máximo 😍❤️." },
  { file: "m08.jpg", caption: "Regalo de cumpleaños 🎁. Amo que me consientas tanto, mi amor. Gracias por todos esos regalos tan hermosos." },
  { file: "m09.jpg", caption: "En el circo contigo 🎪. Un momento súper agradable a tu lado, riéndonos sin parar 😍." },
  { file: "m10.jpg", caption: "Viendo una de nuestras mejores \"películas\" que \"disfrutamos\" muchísimo 😂. Lo más importante es que siempre estamos juntos ❤️." },
  { file: "m11.jpg", caption: "Disfrutando cada una de nuestras comidas 🥰. Contigo hasta el sabor cambia." },
  { file: "m12.jpg", caption: "Tú y yo siempre, para todo lado. Sin importar el momento ni el lugar ❤️." },
  { file: "m13.jpg", caption: "Nos encontramos un Michi 🐱. Nuestro pequeño espectador." },
  { file: "m14.mp4", caption: "Tú y yo, nuestras bromas y tonterías por siempre 😍 #gatico." },
  { file: "m15.jpg", caption: "Amándote por siempre, mi niña preciosa ❤️." },
  { file: "m16.jpg", caption: "Conociendo nuevos lugares juntos, de la mano 🥰." },
  { file: "m17.jpg", caption: "Amo tomarme fotos contigo, y más si son así 😍." },
  { file: "m18.jpg", caption: "De compras junticos 🛍️. Consintiéndote siempre, mi amor." },
  { file: "m19.jpg", caption: "Un viaje inolvidable contigo, donde me mostraste el amor verdadero 🥹. Gracias por todo, mi amor." },
  { file: "m20.jpg", caption: "Siempre trabajando juntos, de la mano 🥰." },
  { file: "m21.jpg", caption: "Amo tocarte todo 🔥." },
  { file: "m22.jpg", caption: "Siempre trataré de consentirte al máximo, mi princesa 👑. Y más si es tu cumpleaños." },
  { file: "m23.jpg", caption: "Una fecha y un momento muy especial: llegó a nuestras vidas un ser maravilloso 🥹❤️." },
  { file: "m24.jpg", caption: "Siempre viajando juntos para todo lado, de la mano, sonriéndonos y amándonos 🥰. Uno de los mejores viajes, mi 16 bonito." },
  { file: "m25.jpg", caption: "Siempre recordando nuestros mejores momentos ❤️. Te amo, mi amor." },
  { file: "m26.jpg", caption: "Adoro poder pasar tiempo de calidad contigo, viajando para todo lado 😍." },
  { file: "m27.jpg", caption: "Me encantan nuestras fotos y las tonterías que hacemos 🥰." },
  { file: "m28.jpg", caption: "Nuestros viajes juntos siempre serán mi mejor hobby ❤️." },
  { file: "m29.jpg", caption: "Tomando chicha y riéndonos de los chistes 🤭." },
  { file: "m30.jpg", caption: "Amándonos bajo la lluvia y disfrutando el concierto juntos ☔🎶." },
  { file: "m31.jpg", caption: "Emprendiendo juntos, de la mano 🥹." },
  { file: "m32.jpg", caption: "Me encanta vestirme contigo y hacer todas nuestras locuras juntos. Amé ese 31 🥰." },
  { file: "m33.jpg", caption: "Me encanta tu cuerpo, mi amor 🔥. Me encantan tus tetas, tu culo, tu piel; cada parte de ti me fascina. La forma en la que me miras, en la que te mueves, en la que me vuelves loco… tú eres mi vicio favorito ❤️." },
  { file: "m34.jpg", caption: "Amé hacerlo en el jacuzzi contigo 🔥." },
  { file: "m35.jpg", caption: "Pasando nuestra Navidad juntos y amándonos por siempre 🎄❤️." },
  { file: "m36.jpg", caption: "Pasando uno de nuestros primeros 31s. Te amo mucho 🥰." },
  { file: "m37.mp4", caption: "Te felicito por tus logros, mi amor 🥹. Siempre voy a estar aquí para ti. Te amo demasiado. Me alegró muchísimo verte tan feliz ese día ❤️." },
  { file: "m38.jpg", caption: "Uno de nuestros primeros viajes, mi niña preciosa 😍." },
  { file: "m39.jpg", caption: "Un viajecito más con los bikers 🏍️." },
  { file: "m40.jpg", caption: "Tomándonos unas fotos a nuestras babies 🥰." },
  { file: "m41.jpg", caption: "Asando nuestros primeros malvaviscos juntos 🔥✨." },
  { file: "m42.jpg", caption: "Jamás me cansaré de besar tus lindos labios, mi amor 😍. Te amo demasiado." },
  { file: "m43.jpg", caption: "Viendo a la Sele juntos ⚽❤️." },
  { file: "m44.jpg", caption: "Cómo olvidar nuestras primeras manualidades juntos 🥹. Amé ese día, qué bien la pasé. Te amo demasiado." },
  { file: "m45.jpg", caption: "Amo a mi mimo hermosa 🥰❤️." },
  { file: "m46.jpg", caption: "Retomando nuestras vidas juntos, avanzando y superando cada uno de nuestros problemas, mano con mano 🥹. Te amo demasiado." },
  { file: "m47.jpg", caption: "Recuerda que yo siempre voy a estar para ti, en los momentos buenos y en los malos ❤️. Tienes una persona que te ama demasiado, que haría cualquier cosa por estar contigo. Siempre te cuidaré en tus peores momentos y en tus peores pesadillas. Siempre estaré aquí, amándote y cuidándote. Por siempre, mi amor." },
  { file: "m48.jpg", caption: "Recuerda nuestra promesa de siempre tenernos el uno al otro 🥹. No importa la situación en la que estemos, siempre trataremos de estar juntos, apoyándonos mutuamente. Te amo mucho, mi niña preciosa. Nunca, pero nunca te soltaré de la mano, sin importar el momento ni el lugar ❤️." },
  { file: "m49.mp4", caption: "Mi amor… este video es un video bastante duro para mí, pero bonito. Mirándolo me recuerda lo felices que somos, lo felices que podemos llegar a ser 🥹. Cada risa, cada beso, cada abrazo, ese amor verdadero que unía nuestras almas y que se reflejaba en cada mirada. Gracias por todos esos momentos que tú y yo compartimos, por todo lo que planeamos juntos para estar el uno con el otro. Cada minuto a tu lado me hace el hombre más feliz del mundo. Te amo muchísimo, nunca lo olvides ❤️. Recuerda siempre que tienes un hombre que te ama, te cuida y te protege. Gracias por todo, mi niña preciosa. Y aquí, cocinando unos tacos riquísimos, demostrándonos amor, pasando un buen rato tú y yo… ahí está todo lo que siento. Te amo demasiado, mi amor 🥰❤️." },
];

const MOMENTS: Moment[] = _HISTORY.map((h) => ({
  src: `/photos/history/${h.file}`,
  caption: h.caption,
  kind: h.file.toLowerCase().endsWith(".mp4") ? "video" : undefined,
}));

const LETTER_PARAGRAPHS = [
  "Mi amor, no sé muy bien por dónde empezar ❤️. Cada vez que intento escribirte algo bonito, me doy cuenta de que las palabras siempre se quedan cortas contigo.",
  "Desde el primer momento supe que tú tenías algo distinto 🥹. Esa forma tuya de reír, de mirarme, de callarme con un abrazo y hacerme sentir en casa en cualquier parte del mundo.",
  "Mi niña preciosa 🥰, me enseñaste lo que de verdad significa amar. Antes de ti yo creía saberlo; ahora entiendo que amar es esto: elegirte cada día, hasta en los días difíciles ❤️.",
  "Me enamoran tus ojos cuando me miran despacio 😍, tu sonrisa cuando te hago reír sin querer, y esa carita tuya media dormida en las mañanas. No hay vista en el mundo que me guste más.",
  "Me encanta tu cuerpo, mi amor bonito ❤️. Me encanta abrazarte, besarte el cuello, perderme en tu piel y sentir cómo todo encaja cuando estás cerca 🥰. Contigo todo es piel, calor y ternura.",
  "Y cuando tenemos intimidad, cuando somos solo tú y yo sin ruido ni mundo alrededor, siento una pasión que no había sentido con nadie 😍. Es amor puro, deseo y confianza al mismo tiempo. Eres mi favorita en todo.",
  "Hemos pasado por tantas cosas juntos, mi 16 🥹. Momentos lindos, divertidos, viajes, tonterías nuestras, risas que duelen de tan reales. Y también hemos pasado por lo difícil: los problemas, las dudas, los días en los que ninguno de los dos sabía qué decir.",
  "Y aun así, siempre encontramos la forma ❤️. Siempre volvemos. Porque cuando a ti te pasa algo, yo estoy ahí; y cuando a mí me pasa algo, tú estás ahí sin que te lo tenga que pedir. Eso, mi amor, no se encuentra en cualquier lado.",
  "Me enseñaste 🥹 a pedir perdón sin orgullo, a escuchar antes de hablar, a abrazar cuando sobran las palabras. Me has hecho mejor persona, y no sé si te lo digo lo suficiente.",
  "Gracias por tu paciencia cuando yo no la tengo. Gracias por escucharme incluso cuando hablo puras tonterías 🥰. Gracias por apretarme fuerte cuando lo necesito y por hacerme reír cuando todo se siente gris.",
  "Eres mi lugar favorito ❤️. En ti encuentro paz. Cada vez que me abrazas, el mundo baja de volumen y todo vuelve a tener sentido. Tus brazos son mi casa, mi amor bonito.",
  "Me encanta hacer planes contigo 😍, los grandes y los chiquitos. Una serie juntos, una canción compartida, un viaje por decidir, un futuro por construir. Todo contigo sabe mejor.",
  "Me gusta cómo nos cuidamos en los momentos malos 🥹. Cómo nos damos un abrazo sin decir nada, cómo encontramos siempre la forma de hacer sentir bien al otro. Ese apoyo tuyo vale más que cualquier cosa.",
  "Prometo seguir eligiéndote ❤️. En los días bonitos y en los difíciles. Cuando estemos de acuerdo y cuando no. Cuando todo fluya y cuando toque arreglar. No me pienso cansar de ti 🥰.",
  "Te amo, mi niña preciosa. Mi amor bonito. Mi 16 ❤️. Hoy, mañana, y todos los aniversarios que nos quedan por delante 😍.",
];

const TIMELINE = [
  {
    title: "Eres mi vida entera",
    date: "Gracias por todo, mi amor",
    img: "/photos/1.jpg",
    text:
      "Gracias por regalarme tu tiempo, tu amor y tu paciencia. Gracias por enseñarme lo que es querer bonito, con calma, sin medidas. Eres mi vida entera, mi niña preciosa, y no cambio un solo día contigo por nada en este mundo. Te amo muchísimo ❤️.",
  },
  {
    title: "Hemos superado todo juntos",
    date: "Somos equipo, siempre",
    img: "/photos/2.jpg",
    text:
      "Hemos pasado por momentos duros, mi amor. Días grises, discusiones, miedos, caídas. Y aun así, siempre encontramos la manera de volver, de pedirnos perdón, de abrazarnos fuerte y empezar otra vez. Hoy miro atrás y agradezco cada tropiezo porque me enseñó lo fuerte que es lo nuestro 🥹.",
  },
  {
    title: "Te amo más cada día",
    date: "Y así va a ser siempre",
    img: "/photos/3.jpg",
    text:
      "Te lo he dicho mil veces y te lo seguiré diciendo: te amo. Te amo cuando ríes, cuando lloras, cuando no te aguantas a ti misma, cuando me cuidas sin que te lo pida. Mi amor bonito, prometo seguir eligiéndote todos los días, en los buenos y en los difíciles. Contigo, para siempre 🥰❤️.",
  },
];

const VOICE_SRC = "/audio/voice.mp3"; // opcional
// --------------------------------------------------------

type Stage = "invite" | "fill" | "reveal";

export default function Experience() {
  const [stage, setStage] = useState<Stage>("invite");

  if (stage === "invite") return <InviteScreen onOpen={() => setStage("fill")} />;
  if (stage === "fill") return <FillScreen onDone={() => setStage("reveal")} />;
  return <Reveal />;
}

function InviteScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <main
      className="min-h-dvh w-full flex items-center justify-center px-6 py-10"
      style={{ background: "#fdf3f5" }}
    >
      <div className="w-full max-w-sm text-center fade-in">
        <div className="rounded-[28px] p-10 shadow-[0_25px_60px_-30px_rgba(0,0,0,.18)]">
          <p className="text-[10px] tracking-[0.42em] text-neutral-500">TIENES UN REGALO</p>
          <p className="mt-10 text-[10px] tracking-[0.42em] text-neutral-500">PARA</p>
          <h1 className="italic text-3xl text-neutral-900 leading-none mt-3" style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}>
            Mi princes<span className="relative">a<sup className="text-[0.4em] font-normal not-italic ml-0.5 -top-3 relative text-neutral-700">16</sup></span>
          </h1>
          <p className="mt-8 text-[13px] text-neutral-700">
            De <span className="font-semibold">{NAMES.a}</span>
          </p>
          <p className="mt-7 italic text-neutral-700 leading-relaxed text-[14px]">
            “Espero te guste mucho, mi amor <span style={{ color: "#e11d48" }}>❤</span> Lo hice con mucho cariño para ti <span style={{ color: "#e11d48" }}>❤</span>”
          </p>
        </div>

        <p className="mt-10 text-[10px] tracking-[0.4em] text-neutral-500">
          TOCA PARA ABRIR TU REGALO
        </p>
        <button
          onClick={onOpen}
          aria-label="Abrir regalo"
          className="mt-5 mx-auto block"
        >
          <span className="inline-block beat">
            <HeartOutline className="w-14 h-14" style={{ color: "#e11d48" }} />
          </span>
        </button>
      </div>
    </main>
  );
}

function HeartOutline({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 3c0 5.6-7.5 10.2-7.5 10.2Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function FillScreen({ onDone }: { onDone: () => void }) {
  const TAPS_NEEDED = 8;
  const [taps, setTaps] = useState(0);
  const [phase, setPhase] = useState<"tap" | "boom" | "msg">("tap");
  const [pieces, setPieces] = useState<{ id: number; dx: number; dy: number; r: number }[]>([]);
  const pid = useRef(0);
  // First click does nothing; fill grows from click 2 to click 8 → 7 steps
  const progress = Math.max(0, Math.min((taps - 1) / (TAPS_NEEDED - 1), 1));

  function tap() {
    if (phase !== "tap") return;
    setTaps((t) => {
      const next = Math.min(t + 1, TAPS_NEEDED);
      if (next >= TAPS_NEEDED) {
        setPieces(
          Array.from({ length: 16 }).map(() => ({
            id: ++pid.current,
            dx: (Math.random() - 0.5) * 380,
            dy: (Math.random() - 0.5) * 380 - 40,
            r: (Math.random() - 0.5) * 540,
          }))
        );
        setPhase("boom");
        window.setTimeout(() => setPhase("msg"), 900);
        window.setTimeout(() => onDone(), 2400);
      }
      return next;
    });
  }

  return (
    <main
      className="min-h-dvh w-full flex flex-col items-center justify-center px-6 py-10 relative"
      style={{ background: "#fdf3f5" }}
    >
      {phase !== "msg" && (
        <>
          <button
            onClick={tap}
            aria-label="Toca el corazón"
            className="relative w-56 h-56 flex items-center justify-center select-none"
          >
            <svg
              viewBox="0 0 24 24"
              className={`absolute inset-0 w-full h-full ${
                phase === "boom" ? "opacity-0 scale-0 transition-all duration-500" : ""
              }`}
              aria-hidden
            >
              <defs>
                <clipPath id="heart-clip">
                  <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 3c0 5.6-7.5 10.2-7.5 10.2Z" />
                </clipPath>
              </defs>
              <path
                d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 3c0 5.6-7.5 10.2-7.5 10.2Z"
                fill="none"
                stroke="#e11d48"
                strokeWidth="0.6"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <g clipPath="url(#heart-clip)">
                <rect
                  x="0"
                  y={24 - 24 * progress}
                  width="24"
                  height={24 * progress}
                  fill="#e11d48"
                  style={{ transition: "y 350ms ease, height 350ms ease" }}
                />
              </g>
            </svg>
            {pieces.map((p) => (
              <span
                key={p.id}
                className="absolute text-2xl burst"
                style={
                  {
                    color: "#e11d48",
                    ["--dx" as string]: `${p.dx}px`,
                    ["--dy" as string]: `${p.dy}px`,
                    ["--r" as string]: `${p.r}deg`,
                  } as React.CSSProperties
                }
              >
                ❤
              </span>
            ))}
          </button>

          <p className="mt-10 text-sm text-neutral-700 italic">
            Cada toque abre un pedacito del recuerdo <span style={{ color: "#e11d48" }}>❤</span>
          </p>
        </>
      )}

      {phase === "msg" && (
        <div className="text-center fade-in">
          <span className="inline-block beat mx-auto"><HeartOutline className="w-14 h-14" style={{ color: "#e11d48" }} /></span>
          <p className="mt-6 font-script text-5xl text-neutral-900">
            Has abierto tu regalo
          </p>
          <p className="mt-3 text-sm italic text-neutral-600">para ti, mi amor</p>
        </div>
      )}
    </main>
  );
}

function Reveal() {
  return (
    <main className="w-full fade-in" style={{ background: "var(--bg)" }}>
      <HeroCouple />
      <SongStrip />
      <MomentsCarousel />
      <Letter />
      <Timeline />
      <VoiceMessage />
      <SorpresaTeaser />
      <FinalSurprise />
    </main>
  );
}

function SorpresaTeaser() {
  function scrollToSurprise() {
    const el = document.getElementById("sorpresa");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <section className="relative w-full min-h-[85dvh] overflow-hidden">
      <img
        src="/photos/4.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.55) 75%, rgba(0,0,0,.8) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,243,245,0) 0%, rgba(253,243,245,.9) 70%, #fdf3f5 100%)",
        }}
      />
      <div className="relative z-10 min-h-[85dvh] flex flex-col items-center justify-end text-center px-6 pb-24 text-white">
        <p className="italic text-white/90 text-sm max-w-xs">
          Pero esto no termina aquí, mi amor…
        </p>
        <button
          onClick={scrollToSurprise}
          className="mt-5 inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full shadow-lg hover:scale-[1.02] transition"
        >
          Una última sorpresa 🤍
        </button>
      </div>
    </section>
  );
}

function HeroCouple() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      <img
        src="/photos/hero.jpg"
        alt="Nosotros"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.45) 75%, rgba(0,0,0,.65) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,243,245,0) 0%, rgba(253,243,245,.9) 70%, #fdf3f5 100%)",
        }}
      />
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-end text-center px-6 pb-20 text-white">
        <p className="text-[11px] tracking-[0.4em] text-white/85">PARA</p>
        <h2
          className="mt-2 italic text-5xl drop-shadow-lg"
          style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
        >
          Mi amor bonit<span className="relative">o<sup className="text-[0.4em] font-normal not-italic ml-0.5 -top-3 relative text-white/90">16</sup></span>
        </h2>
        <p className="mt-5 text-[11px] tracking-[0.35em] text-white/80">
          {DATE_VALUE.toUpperCase()}
        </p>
      </div>
    </section>
  );
}

function SongStrip() {
  const [playing, setPlaying] = useState(false);
  const bars = useMemo(() => Array.from({ length: 34 }, (_, i) => i), []);
  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-md rounded-3xl bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,.18)] p-5 flex items-center gap-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="relative w-20 h-20 shrink-0"
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          <span
            className={`absolute inset-0 rounded-full ${playing ? "spin-slow" : ""}`}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #1a1a1a 0 18%, #2a2a2a 18% 34%, #1a1a1a 34% 52%, #262626 52% 68%, #1a1a1a 68% 82%, #2a2a2a 82% 92%, #111 92% 100%)",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "#e11d48" }}
          />
          <span className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-neutral-900 text-sm shadow">
              {playing ? "❚❚" : "▶"}
            </span>
          </span>
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.3em] text-rose-500/80">NUESTRA CANCIÓN</p>
          <div className="mt-2 flex items-end gap-[3px] h-8">
            {bars.map((b) => (
              <span
                key={b}
                className={`w-[3px] rounded-full bg-rose-400 ${playing ? "bar" : ""}`}
                style={{
                  height: `${30 + Math.abs(Math.sin(b * 1.1)) * 70}%`,
                  animationDelay: `${(b % 10) * 70}ms`,
                }}
              />
            ))}
          </div>
          <p className="mt-1 text-[11px] text-neutral-400">
            {playing ? "Reproduciendo…" : "Toca para reproducir"}
          </p>
        </div>
      </div>

      {playing && (
        <iframe
          src={`https://www.youtube.com/embed/${SONG.youtubeId}?autoplay=1&controls=0&rel=0`}
          title="Nuestra canción"
          allow="autoplay; encrypted-media"
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
          aria-hidden
        />
      )}
    </section>
  );
}

function MomentsCarousel() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  }

  return (
    <section className="py-14">
      <h3 className="text-center text-xs tracking-[0.35em] text-rose-500/80">NUESTRA</h3>
      <p
        className="text-center italic text-4xl text-neutral-900 mt-1"
        style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
      >
        vida juntos
      </p>

      <div className="relative mt-8">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {MOMENTS.map((m, idx) => {
            const isFlipped = !!flipped[idx];
            return (
              <div
                key={idx}
                className="snap-center shrink-0 w-[72%] max-w-[300px] aspect-[3/4] [perspective:1200px] cursor-pointer"
                onClick={() => setFlipped((f) => ({ ...f, [idx]: !f[idx] }))}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden bg-rose-100 shadow-lg [backface-visibility:hidden]">
                    {m.kind === "video" ? (
                      <video
                        src={m.src}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={m.src}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          el.style.display = "none";
                          const ph = el.nextElementSibling as HTMLElement | null;
                          if (ph) ph.style.display = "flex";
                        }}
                      />
                    )}
                    <div
                      className="w-full h-full items-center justify-center text-rose-300 text-xs tracking-widest"
                      style={{ display: "none" }}
                    >
                      FOTO {idx + 1}
                    </div>
                    {m.kind === "video" && (
                      <div className="absolute top-3 left-3 bg-black/55 text-white rounded-full px-2.5 py-1 text-[10px] tracking-wider">
                        ▶ VIDEO
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/85 rounded-full px-3 py-1 text-[10px] text-rose-600">
                      toca para voltear
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-50 to-rose-200 shadow-lg p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span
                      className="absolute top-3 left-4 italic text-rose-600/90 text-lg"
                      style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
                    >
                      Nº {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-neutral-800 italic leading-relaxed text-[14px] px-2 overflow-hidden"
                      style={{
                        fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
                        display: "-webkit-box",
                        WebkitLineClamp: 8,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {m.caption || "✨"}
                    </p>
                    {m.caption && m.caption.length > 170 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(idx);
                        }}
                        className="mt-3 text-[11px] tracking-wider uppercase text-rose-700 underline decoration-rose-300 underline-offset-2"
                      >
                        Ver texto completo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 shadow text-rose-600 hidden sm:flex items-center justify-center"
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 shadow text-rose-600 hidden sm:flex items-center justify-center"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      <p className="text-center text-[11px] text-neutral-400 mt-2">
        desliza para ver más
      </p>

      {expanded !== null && (
        <div
          onClick={() => setExpanded(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-5 fade-in"
          style={{
            background: "rgba(10,5,10,.65)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[26px] bg-[color:var(--cream)] shadow-2xl p-8"
          >
            <button
              onClick={() => setExpanded(null)}
              aria-label="Cerrar"
              className="absolute top-3 right-4 text-neutral-500 text-2xl leading-none"
            >
              ×
            </button>
            <p
              className="italic text-rose-600/90 text-lg"
              style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
            >
              Nº {String(expanded + 1).padStart(2, "0")}
            </p>
            <p
              className="mt-4 text-neutral-800 italic leading-7 text-[15px]"
              style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
            >
              {MOMENTS[expanded].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function Letter() {
  return (
    <section className="px-6 py-16">
      <div
        className="mx-auto max-w-xl rounded-[26px] shadow-[0_25px_60px_-30px_rgba(0,0,0,.2)] p-8 md:p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #fffaf5 0%, #fdf2e8 100%)",
        }}
      >
        <div className="absolute -top-8 -left-4 text-8xl text-rose-100 select-none leading-none">❝</div>
        <p
          className="italic text-neutral-900 text-2xl leading-tight"
          style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
        >
          Un pequeño detalle<br />para ti, mi amor…
        </p>
        <p className="mt-3 text-[11px] tracking-[0.3em] text-neutral-500">
          UN MENSAJE DE AMOR · PARA SIEMPRE
        </p>

        <div
          className="mt-8 space-y-5 text-[15px] leading-7 text-neutral-800 italic"
          style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
        >
          {LETTER_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <p
          className="mt-10 italic text-3xl text-right"
          style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif', color: "#e11d48" }}
        >
          — {NAMES.a}
        </p>
      </div>
    </section>
  );
}

function DaysTogether() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const start = new Date(START_DATE + "T00:00:00").getTime();
    const d = Math.max(0, Math.floor((Date.now() - start) / 86400000));
    setDays(d);
  }, []);
  return (
    <div className="mt-8 text-center">
      <p
        className="text-5xl font-semibold tracking-tight"
        style={{ color: "#e11d48", fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
      >
        {days ?? "—"}
      </p>
      <p className="text-[11px] tracking-[0.35em] text-rose-500/80 mt-1">DÍAS JUNTOS</p>
      <p className="text-[12px] italic text-neutral-500 mt-1">{START_LABEL}</p>
    </div>
  );
}

function Timeline() {
  return (
    <section className="px-6 py-16">
      <p className="text-center text-[11px] tracking-[0.3em] text-rose-500/80">NUESTRA</p>
      <p
        className="text-center italic text-4xl text-neutral-900 mt-1"
        style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
      >
        línea temporal
      </p>

      <DaysTogether />


      <div className="mx-auto mt-10 max-w-md space-y-5">
        {TIMELINE.map((t, i) => (
          <article
            key={i}
            className="rounded-[22px] p-5 bg-transparent border-b border-neutral-200 shadow-[0_18px_30px_-25px_rgba(0,0,0,.25)]"
          >
            <p className="text-[11px] tracking-[0.25em] text-rose-500/80">
              {`CITA ${i + 1}`.toUpperCase()} · {t.date.toUpperCase()}
            </p>
            <div className="mt-3 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-rose-100 bg-rose-100 shrink-0">
                <img
                  src={t.img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0">
                <h4
                  className="italic text-xl text-neutral-900 leading-tight"
                  style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
                >
                  {t.title}
                </h4>
                <p className="text-neutral-700 mt-2 text-[14px] leading-6">{t.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VoiceMessage() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bars = useMemo(() => Array.from({ length: 28 }, (_, i) => i), []);

  function toggle() {
    const el = audioRef.current;
    if (!el) {
      setPlaying((p) => !p); // visual-only si no hay audio
      return;
    }
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(true));
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-md rounded-3xl bg-white shadow-lg p-5 flex items-center gap-4">
        <button
          onClick={toggle}
          className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0"
          aria-label="Reproducir mensaje"
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.3em] text-rose-500/80">MENSAJE DE VOZ</p>
          <p className="text-sm text-neutral-600">De {NAMES.a}</p>
          <div className="mt-2 flex items-end gap-[3px] h-8">
            {bars.map((b) => (
              <span
                key={b}
                className={`w-[3px] rounded-full bg-rose-400 ${playing ? "bar" : ""}`}
                style={{
                  height: `${30 + Math.abs(Math.sin(b * 1.3)) * 70}%`,
                  animationDelay: `${(b % 8) * 80}ms`,
                }}
              />
            ))}
          </div>
        </div>
        <audio
          ref={audioRef}
          src={VOICE_SRC}
          onEnded={() => setPlaying(false)}
          preload="none"
        />
      </div>
    </section>
  );
}

function FinalSurprise() {
  return (
    <section id="sorpresa" className="px-6 py-20">
      <div
        className="mx-auto max-w-md relative rounded-[28px] overflow-hidden shadow-[0_25px_60px_-30px_rgba(0,0,0,.25)] bg-white"
      >
        <div className="p-10 text-center">
          <div className="text-3xl" style={{ color: "#ffffff", textShadow: "0 0 1px #d4d4d4" }}>🤍</div>
          <p
            className="mt-4 italic text-4xl text-neutral-900"
            style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
          >
            Una última sorpresa
          </p>
          <p className="mt-3 text-neutral-600 text-sm">
            Pensabas que el regalo había terminado…
          </p>
          <p className="italic text-neutral-700 mt-1">
            Pero todavía tengo algo preparado para ti.
          </p>

          <a
            href="/quiz"
            className="mt-8 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full shadow-lg transition"
          >
            Descubrir la sorpresa 🤍
          </a>
        </div>
      </div>
      <p className="text-center text-[11px] text-neutral-400 mt-10">
        Hecho con ❤ para mi amor · {new Date().getFullYear()}
      </p>
    </section>
  );
}
