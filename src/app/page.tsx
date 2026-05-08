export default function HomePage() {
  return (
    <main className="relative h-screen w-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-xl">
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
          className="text-5xl sm:text-7xl md:text-8xl"
        >
          MEETHRIL
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
            fontStyle: "italic",
          }}
          className="mt-6 text-lg sm:text-xl md:text-2xl"
        >
          a quieter place to think
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-muted)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
          className="mt-4 text-xs sm:text-sm"
        >
          coming soon · may 2026
        </p>

        <form
          className="mt-12 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <input
            type="email"
            placeholder="your email"
            className="flex-1 h-12 px-4 rounded-md border outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            className="h-12 px-6 rounded-md font-medium transition-colors"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
            }}
          >
            Join waitlist
          </button>
        </form>
      </div>
    </main>
  );
}
