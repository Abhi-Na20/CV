// Subtle drifting text behind the CV. Pure CSS animation (see index.css) so it
// stays cheap and never competes with the readable foreground.
const PHRASE = "ABHINAV NALATWAD · SOFTWARE ENGINEER · ";

const ROWS = 7;

export default function MarqueeBackground() {
  return (
    <div className="marquee" aria-hidden="true">
      {Array.from({ length: ROWS }).map((_, row) => (
        <div
          key={row}
          className="marquee__row"
          // alternate direction + vary speed per row for an organic drift
          style={{
            animationDuration: `${38 + row * 6}s`,
            animationDirection: row % 2 === 0 ? "normal" : "reverse",
          }}
        >
          <span>{PHRASE.repeat(8)}</span>
          <span>{PHRASE.repeat(8)}</span>
        </div>
      ))}
    </div>
  );
}
