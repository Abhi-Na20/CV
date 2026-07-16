const PHRASE = "ABHINAV NALATWAD   ";

const ROWS = 6;

export default function MarqueeBackground() {
  return (
    <div className="marquee" aria-hidden="true">
      {Array.from({ length: ROWS }).map((_, row) => (
        <div
          key={row}
          className="marquee__row"
          // alternate direction + vary speed per row for an organic drift
          style={{
            animationDuration: `${45 + row * 8}s`,
            animationDirection: row % 2 === 0 ? "normal" : "reverse",
          }}
        >
          <span>{PHRASE.repeat(5)}</span>
          <span>{PHRASE.repeat(5)}</span>
        </div>
      ))}
    </div>
  );
}
