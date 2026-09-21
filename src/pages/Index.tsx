import heroImage from '@/assets/hero-image.jpg';

const sectionLink =
  'text-[11px] uppercase tracking-[0.2em] text-stone-700 transition-opacity hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-4';

const Index = () => {
  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#151515]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f0e9]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="font-display text-base font-semibold tracking-[-0.02em] sm:text-lg"
          >
            Veronika Dimitrova
          </a>

          <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
            <a href="#about" className={sectionLink}>About</a>
            <a href="#work" className={sectionLink}>Work</a>
            <a href="#contact" className={sectionLink}>Contact</a>
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[1600px] grid-cols-1 border-x border-black/10 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="flex min-h-[46svh] items-end border-b border-black/10 p-5 sm:min-h-[52svh] sm:p-8 lg:min-h-0 lg:border-b-0 lg:border-r lg:p-12">
          <h1 className="max-w-[12ch] font-display text-[clamp(3.6rem,11vw,10.5rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
            Veronika
            <br />
            Dimitrova
          </h1>
        </div>

        <figure className="relative min-h-[54svh] overflow-hidden lg:min-h-0">
          <img
            src={heroImage}
            alt="Veronika Dimitrova"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
        </figure>
      </section>

      <section
        id="about"
        aria-label="About"
        className="mx-auto grid w-full max-w-[1600px] grid-cols-1 border-x border-b border-black/10 lg:grid-cols-[0.34fr_0.66fr]"
      >
        <div className="border-b border-black/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
          <p className="text-[11px] uppercase tracking-[0.2em]">01 / About</p>
        </div>
        <div className="min-h-[52svh] p-5 sm:p-8 lg:p-12">
          <div className="max-w-4xl space-y-5 pt-8 sm:pt-16" aria-hidden="true">
            <div className="h-px w-full bg-black/20" />
            <div className="h-px w-[88%] bg-black/20" />
            <div className="h-px w-[72%] bg-black/20" />
          </div>
        </div>
      </section>

      <section
        id="work"
        aria-label="Selected work"
        className="mx-auto w-full max-w-[1600px] border-x border-b border-black/10"
      >
        <div className="grid grid-cols-1 border-b border-black/10 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="border-b border-black/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
            <p className="text-[11px] uppercase tracking-[0.2em]">02 / Work</p>
          </div>
          <div className="p-5 sm:p-8 lg:p-12" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="group relative aspect-[4/5] border-b border-black/10 p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r"
            >
              <span className="text-[11px] tabular-nums tracking-[0.18em]">
                0{item}
              </span>
              <div className="absolute inset-x-5 bottom-5 top-14 border border-black/15 bg-black/[0.025]" />
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        aria-label="Contact"
        className="mx-auto grid min-h-[62svh] w-full max-w-[1600px] grid-cols-1 border-x border-b border-black/10 lg:grid-cols-[0.34fr_0.66fr]"
      >
        <div className="border-b border-black/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
          <p className="text-[11px] uppercase tracking-[0.2em]">03 / Contact</p>
        </div>
        <div className="flex items-end p-5 sm:p-8 lg:p-12">
          <p className="font-display text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
            Veronika
            <br />
            Dimitrova
          </p>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-[1600px] items-center justify-between border-x border-black/10 px-5 py-6 text-[10px] uppercase tracking-[0.18em] sm:px-8 lg:px-12">
        <span>Veronika Dimitrova</span>
        <span aria-hidden="true">© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
};

export default Index;
