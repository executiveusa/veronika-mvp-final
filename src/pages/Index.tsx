import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Footprints,
  Menu,
  RotateCcw,
  Users,
  Wind,
  X,
} from "lucide-react";

const modules = [
  {
    code: "01",
    title: "MOVE",
    body: "Mobility, strength, and guided practice built to fit into real schedules.",
    icon: Footprints,
  },
  {
    code: "02",
    title: "RECOVER",
    body: "Downshift the system with breath, sleep support, and intentional recovery.",
    icon: Wind,
  },
  {
    code: "03",
    title: "RESET",
    body: "Immersive formats that interrupt routine long enough to establish a better one.",
    icon: RotateCcw,
  },
  {
    code: "04",
    title: "TEAMS",
    body: "Strategic wellness programs for groups, communities, and organizations.",
    icon: Users,
  },
];

const sessions = [
  ["06:40", "ARRIVE", "Breath + readiness check"],
  ["07:00", "MOVE", "Mobility + strength"],
  ["08:05", "RECOVER", "Downshift + refuel"],
  ["12:30", "RESET", "Midday nervous-system break"],
  ["17:45", "MOVE", "Low-friction evening practice"],
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="wellness-v1 min-h-screen bg-[#dfe1dc] text-[#111411] selection:bg-[#ff5938] selection:text-[#111411]">
      <style>{`
        .wellness-v1 {
          --ink: #111411;
          --paper: #dfe1dc;
          --paper-2: #cfd3cc;
          --signal: #ff5938;
          --blue: #244cff;
          --lime: #d9ff43;
          --line: rgba(17, 20, 17, 0.22);
          font-family: Arial, Helvetica, sans-serif;
        }
        .wellness-v1 .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        }
        .wellness-v1 .grid-field {
          background-image:
            linear-gradient(to right, rgba(17,20,17,.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(17,20,17,.10) 1px, transparent 1px);
          background-size: 42px 42px;
        }
        .wellness-v1 .scanline {
          background: linear-gradient(90deg, transparent, rgba(255,89,56,.25), transparent);
          animation: scan 6s linear infinite;
        }
        .wellness-v1 .tick {
          background-image: repeating-linear-gradient(
            to right,
            var(--ink) 0,
            var(--ink) 1px,
            transparent 1px,
            transparent 12px
          );
        }
        .wellness-v1 .route {
          background-image: radial-gradient(circle at center, var(--ink) 1.4px, transparent 1.5px);
          background-size: 18px 18px;
        }
        @keyframes scan {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(110%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wellness-v1 .scanline { animation: none; display: none; }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-black/20 bg-[#dfe1dc]/95 backdrop-blur-md">
        <div className="grid min-h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[220px_1fr_auto]">
          <a href="#top" className="flex h-full items-center border-r border-black/20 px-5 text-sm font-black tracking-[0.16em] md:px-7">
            WELLNESS/STUDIO
          </a>

          <nav className="hidden h-full items-center md:flex">
            {[
              ["SYSTEM", "#system"],
              ["DAY", "#day"],
              ["EXPERIENCE", "#experience"],
              ["FIELD NOTES", "#notes"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="flex h-full items-center border-r border-black/20 px-5 text-[11px] font-bold tracking-[0.14em] transition-colors hover:bg-[#244cff] hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#start"
            className="hidden h-full items-center gap-2 bg-[#111411] px-6 text-xs font-black tracking-[0.1em] text-white transition-colors hover:bg-[#ff5938] hover:text-[#111411] md:flex"
          >
            START <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-16 w-16 items-center justify-center border-l border-black/20 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/20 md:hidden">
            {[
              ["SYSTEM", "#system"],
              ["DAY", "#day"],
              ["EXPERIENCE", "#experience"],
              ["FIELD NOTES", "#notes"],
              ["START", "#start"],
            ].map(([label, href], index) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between border-b border-black/20 px-5 py-4 text-sm font-black tracking-[0.12em] ${
                  index === 4 ? "bg-[#111411] text-white" : ""
                }`}
              >
                {label}
                <ArrowDownRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-black/20">
          <div className="absolute inset-0 grid-field opacity-70" aria-hidden="true" />
          {!reduceMotion && <div className="scanline absolute inset-y-0 left-0 w-1/2" aria-hidden="true" />}

          <div className="relative grid min-h-[760px] lg:grid-cols-[minmax(0,1.2fr)_430px]">
            <div className="flex flex-col justify-between border-b border-black/20 lg:border-b-0 lg:border-r">
              <div className="grid grid-cols-[64px_1fr] border-b border-black/20 sm:grid-cols-[88px_1fr]">
                <div className="flex items-start justify-center border-r border-black/20 pt-7">
                  <span className="mono text-[10px] font-bold tracking-[0.18em] [writing-mode:vertical-rl]">
                    FIELD PRACTICE / V1
                  </span>
                </div>

                <div className="px-5 py-12 sm:px-8 md:px-12 md:py-16">
                  <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="bg-[#111411] px-3 py-2 text-[10px] font-black tracking-[0.14em] text-white">
                      MOVEMENT
                    </span>
                    <span className="bg-[#ff5938] px-3 py-2 text-[10px] font-black tracking-[0.14em]">
                      RECOVERY
                    </span>
                    <span className="bg-[#d9ff43] px-3 py-2 text-[10px] font-black tracking-[0.14em]">
                      PRACTICE
                    </span>
                  </div>

                  <motion.h1
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]"
                  >
                    BUILD
                    <br />
                    A BODY
                    <br />
                    THAT
                    <span className="ml-[0.08em] inline-block -rotate-2 bg-[#244cff] px-[0.08em] text-white">
                      LASTS.
                    </span>
                  </motion.h1>

                  <div className="mt-12 grid max-w-3xl gap-8 border-t border-black/25 pt-6 md:grid-cols-[1fr_240px]">
                    <p className="max-w-xl text-lg font-semibold leading-snug sm:text-xl">
                      A generic wellness practice for people who want more capacity, better recovery,
                      and routines that survive real life.
                    </p>
                    <div className="mono text-xs leading-6">
                      <div>STATUS / ACTIVE</div>
                      <div>FOCUS / DAILY CAPACITY</div>
                      <div>FORMAT / PRACTICE + IMMERSION</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3">
                {[
                  ["01", "NOTICE", "What is your system asking for?"],
                  ["02", "PRACTICE", "Do the smallest useful thing."],
                  ["03", "REPEAT", "Build capacity without drama."],
                ].map(([n, title, copy]) => (
                  <div key={n} className="border-t border-black/20 p-5 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0">
                    <div className="mono mb-8 text-[10px] font-bold">{n}</div>
                    <div className="text-xl font-black tracking-[-0.03em]">{title}</div>
                    <div className="mt-2 max-w-xs text-sm leading-5 text-black/70">{copy}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative bg-[#111411] text-white">
              <div className="route absolute inset-0 opacity-[0.12]" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-white/25 pb-4">
                  <span className="mono text-[10px] font-bold tracking-[0.18em]">LIVE SIGNAL / 001</span>
                  <Activity className="h-5 w-5 text-[#d9ff43]" />
                </div>

                <div className="my-12">
                  <div className="relative mx-auto aspect-square w-full max-w-[320px]">
                    <div className="absolute inset-[4%] rounded-full border border-white/20" />
                    <div className="absolute inset-[16%] rounded-full border border-white/25" />
                    <div className="absolute inset-[30%] rounded-full border border-white/30" />
                    <div className="absolute inset-x-[8%] top-1/2 h-px bg-white/25" />
                    <div className="absolute inset-y-[8%] left-1/2 w-px bg-white/25" />
                    <motion.div
                      animate={reduceMotion ? undefined : { rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[4%]"
                    >
                      <div className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom bg-[#ff5938]" />
                      <div className="absolute left-[calc(50%-5px)] top-[-5px] h-3 w-3 rounded-full bg-[#ff5938]" />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-black tracking-[-0.06em]">74</div>
                        <div className="mono mt-2 text-[10px] tracking-[0.18em] text-white/60">CAPACITY INDEX</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 border border-white/20">
                  {[
                    ["MOVE", "82"],
                    ["REST", "67"],
                    ["FOCUS", "73"],
                  ].map(([label, value]) => (
                    <div key={label} className="border-l border-white/20 p-3 first:border-l-0">
                      <div className="mono text-[9px] text-white/55">{label}</div>
                      <div className="mt-2 text-2xl font-black">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="system" className="border-b border-black/20">
          <div className="grid lg:grid-cols-[320px_1fr]">
            <div className="border-b border-black/20 bg-[#244cff] p-6 text-white lg:border-b-0 lg:border-r">
              <div className="mono text-[10px] font-bold tracking-[0.18em]">SYSTEM / FOUR MODES</div>
              <h2 className="mt-20 text-5xl font-black uppercase leading-[0.86] tracking-[-0.06em]">
                USE WHAT
                <br />
                YOU NEED.
              </h2>
              <p className="mt-6 max-w-[250px] text-sm leading-6 text-white/75">
                No lifestyle theater. Each mode solves a different problem and can stand alone.
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.article
                    key={module.code}
                    whileHover={reduceMotion ? undefined : { x: index % 2 === 0 ? 5 : -5 }}
                    className="group min-h-[300px] border-b border-black/20 p-6 sm:border-l sm:first:border-l-0 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0"
                  >
                    <div className="flex items-start justify-between">
                      <span className="mono text-[10px] font-bold">{module.code}</span>
                      <Icon className="h-6 w-6 transition-transform group-hover:rotate-6" />
                    </div>
                    <div className="mt-20">
                      <h3 className="text-4xl font-black tracking-[-0.055em]">{module.title}</h3>
                      <p className="mt-4 max-w-sm text-base leading-6 text-black/65">{module.body}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="day" className="border-b border-black/20 bg-[#111411] text-white">
          <div className="grid lg:grid-cols-[1fr_420px]">
            <div className="p-5 sm:p-8 md:p-12">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <span className="mono text-[10px] font-bold tracking-[0.18em]">DAY MAP / SAMPLE</span>
                <span className="mono text-[10px] text-[#d9ff43]">NO HEROICS REQUIRED</span>
              </div>

              <div className="mt-8">
                {sessions.map(([time, mode, detail], index) => (
                  <div
                    key={time}
                    className="grid grid-cols-[72px_82px_1fr] items-center border-b border-white/15 py-5 sm:grid-cols-[90px_120px_1fr]"
                  >
                    <span className="mono text-xs text-white/55">{time}</span>
                    <span className={`text-xs font-black tracking-[0.12em] ${
                      index === 1 || index === 4 ? "text-[#ff5938]" : index === 2 ? "text-[#d9ff43]" : "text-white"
                    }`}>
                      {mode}
                    </span>
                    <span className="text-sm text-white/75 sm:text-base">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/20 bg-[#ff5938] p-8 text-[#111411] lg:border-l lg:border-t-0">
              <div className="mono text-[10px] font-bold tracking-[0.18em]">RULE / 01</div>
              <div className="mt-14 text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                LESS
                <br />
                FRICTION.
                <br />
                MORE
                <br />
                RETURN.
              </div>
              <p className="mt-8 max-w-sm text-base font-semibold leading-6">
                The system is designed around coming back tomorrow, not winning today.
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="border-b border-black/20">
          <div className="grid min-h-[680px] lg:grid-cols-[44%_56%]">
            <div className="relative min-h-[420px] overflow-hidden border-b border-black/20 bg-[#d9ff43] lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 grid-field opacity-40" />
              <div className="absolute left-[8%] top-[10%] h-[58%] w-[58%] rounded-full border-[18px] border-[#111411]" />
              <div className="absolute bottom-[8%] right-[8%] h-[42%] w-[42%] bg-[#244cff]" />
              <div className="absolute bottom-[16%] left-[16%] h-[22%] w-[22%] bg-[#ff5938]" />
              <div className="absolute inset-x-0 bottom-0 tick h-3 opacity-70" />
              <div className="absolute left-5 top-5 mono text-[10px] font-bold tracking-[0.16em]">
                MEDIA ZONE / REPLACE WITH HUMAN MOVEMENT FILM
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 md:p-12">
              <div>
                <span className="mono text-[10px] font-bold tracking-[0.18em]">IMMERSION / SAMPLE FORMAT</span>
                <h2 className="mt-10 max-w-3xl text-[clamp(3.2rem,7vw,7.4rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                  LEAVE
                  <br />
                  DIFFERENT.
                </h2>
              </div>

              <div className="mt-16 grid gap-8 border-t border-black/20 pt-6 md:grid-cols-2">
                <p className="text-lg font-semibold leading-7">
                  A multi-day reset built around movement, sleep, food, recovery, and enough unstructured time to notice what is actually working.
                </p>
                <div className="mono text-xs leading-6 text-black/65">
                  <div>DURATION / FLEXIBLE</div>
                  <div>GROUP / SMALL FORMAT</div>
                  <div>OUTPUT / PERSONAL PRACTICE PLAN</div>
                  <div>FOLLOW-UP / INTEGRATION CHECK</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="notes" className="border-b border-black/20">
          <div className="grid md:grid-cols-3">
            {[
              ["FIELD NOTE 01", "A practice only works if it can survive your worst week."],
              ["FIELD NOTE 02", "Recovery is a training input, not time left over after training."],
              ["FIELD NOTE 03", "The goal is more usable energy, not more wellness tasks."],
            ].map(([label, copy], index) => (
              <div
                key={label}
                className={`min-h-[320px] border-b border-black/20 p-6 md:border-b-0 md:border-l md:first:border-l-0 ${
                  index === 1 ? "bg-[#244cff] text-white" : ""
                }`}
              >
                <div className="mono text-[10px] font-bold tracking-[0.16em]">{label}</div>
                <p className="mt-24 text-3xl font-black leading-[1.02] tracking-[-0.045em]">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="start" className="bg-[#111411] text-white">
          <div className="grid lg:grid-cols-[1fr_360px]">
            <div className="p-6 sm:p-8 md:p-12">
              <div className="mono text-[10px] font-bold tracking-[0.18em] text-white/55">NEXT / PICK ONE THING</div>
              <h2 className="mt-10 max-w-5xl text-[clamp(3.4rem,9vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
                START
                <br />
                SMALL.
                <br />
                <span className="text-[#d9ff43]">RETURN.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-between border-t border-white/20 bg-[#244cff] p-6 lg:border-l lg:border-t-0">
              <div className="mono text-[10px] font-bold tracking-[0.18em]">DEMO CTA / REPLACE LATER</div>
              <div className="mt-24">
                <p className="text-xl font-bold leading-snug">
                  Choose the next useful step: a practice, an immersive experience, or a team program.
                </p>
                <a
                  href="#system"
                  className="mt-8 flex items-center justify-between border border-white px-4 py-4 text-xs font-black tracking-[0.12em] transition-colors hover:bg-white hover:text-[#244cff]"
                >
                  EXPLORE THE SYSTEM <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <footer className="grid border-t border-white/20 md:grid-cols-[1fr_auto]">
            <div className="px-6 py-5 mono text-[10px] tracking-[0.14em] text-white/50">
              WELLNESS/STUDIO — GENERIC STRATEGIC WELLNESS DEMO — V1
            </div>
            <div className="border-t border-white/20 px-6 py-5 mono text-[10px] tracking-[0.14em] text-white/50 md:border-l md:border-t-0">
              SYSTEM / MOVE / RECOVER / RESET
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Index;
