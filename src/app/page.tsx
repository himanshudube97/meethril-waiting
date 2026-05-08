import { Wordmark, Tagline, ComingSoon, FormReveal } from "@/components/PageReveal";

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-xl w-full">
        <Wordmark>MEETHRIL</Wordmark>
        <Tagline>a quieter place to think</Tagline>
        <ComingSoon>coming soon · may 2026</ComingSoon>

        <FormReveal>
          <form
            className="flex flex-col sm:flex-row gap-3 w-full"
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
        </FormReveal>
      </div>
    </main>
  );
}
