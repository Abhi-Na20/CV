import { useState } from "react";
import Header from "./components/Header.jsx";
import MarqueeBackground from "./components/MarqueeBackground.jsx";
import PdfViewer from "./components/PdfViewer.jsx";

// lives in /public — same file the Download button in the header points at
const CV_FILE = "/ABHINAV_NALATWAD_CV.pdf";

export default function App() {
  // pdf.js counts pages from 1, so no zero-indexing games here
  const [pageNumber, setPageNumber] = useState(1);
  const [dir, setDir] = useState(1);
  // don't hardcode 2 pages — the PDF tells us once it loads
  const [numPages, setNumPages] = useState(null);

  const go = (next) => {
    if (next === pageNumber || next < 1 || next > numPages) return;
    setDir(next > pageNumber ? 1 : -1);
    setPageNumber(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <MarqueeBackground />

      <main className="content">
        <Header />

        <div className="paper-stage">
          <PdfViewer
            file={CV_FILE}
            pageNumber={pageNumber}
            dir={dir}
            onLoaded={setNumPages}
          />
        </div>

        {/* only show the pager once we actually know the page count */}
        {numPages && (
          <div className="pager">
            <button
              className="pager__btn"
              onClick={() => go(pageNumber - 1)}
              disabled={pageNumber === 1}
              aria-label="Previous page"
            >
              ← Previous
            </button>

            <div className="pager__dots">
              {Array.from({ length: numPages }).map((_, i) => (
                <button
                  key={i}
                  className={
                    "pager__dot" + (i + 1 === pageNumber ? " is-active" : "")
                  }
                  onClick={() => go(i + 1)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="pager__btn"
              onClick={() => go(pageNumber + 1)}
              disabled={pageNumber === numPages}
              aria-label="Next page"
            >
              Turn page →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
