import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header.jsx";
import MarqueeBackground from "./components/MarqueeBackground.jsx";
import { PageOne, PageTwo } from "./components/CVSections.jsx";

const PAGES = [PageOne, PageTwo];

// Framer variants for the "turning a page" feel: the outgoing page rotates away
// on its left edge, the incoming page rotates in. `custom` = flip direction.
const flipVariants = {
  enter: (dir) => ({
    rotateY: dir > 0 ? -75 : 75,
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit: (dir) => ({
    rotateY: dir > 0 ? 75 : -75,
    opacity: 0,
    x: dir > 0 ? -60 : 60,
  }),
};

export default function App() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    if (next === page) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CurrentPage = PAGES[page];

  return (
    <div className="app">
      <MarqueeBackground />

      <main className="content">
        <Header />

        <div className="paper-stage">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={page}
              className="paper"
              custom={dir}
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <CurrentPage />
              <footer className="paper__footer">
                <span>Abhinav Nalatwad</span>
                <span>
                  {page + 1} / {PAGES.length}
                </span>
              </footer>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="pager">
          <button
            className="pager__btn"
            onClick={() => go(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
          >
            ← Previous
          </button>

          <div className="pager__dots">
            {PAGES.map((_, i) => (
              <button
                key={i}
                className={"pager__dot" + (i === page ? " is-active" : "")}
                onClick={() => go(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="pager__btn"
            onClick={() => go(page + 1)}
            disabled={page === PAGES.length - 1}
            aria-label="Next page"
          >
            Turn page →
          </button>
        </div>
      </main>
    </div>
  );
}
