import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// same flip feel as the old HTML pages — outgoing page swings away on its
// edge, incoming one swings in. dir is +1 going forward, -1 going back.
const flipVariants = {
  enter: (dir) => ({ rotateY: dir > 0 ? -75 : 75, opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit: (dir) => ({ rotateY: dir > 0 ? 75 : -75, opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function PdfViewer({ file, pageNumber, dir, onLoaded }) {
  // pdf.js wants a pixel width, not CSS percentages, so we measure the inner
  // frame ourselves and re-measure on resize. Crude but keeps the render crisp.
  const frameRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const measure = () => setWidth(frameRef.current ? frameRef.current.clientWidth : 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="paper paper--pdf">
      <div className="pdf-frame" ref={frameRef}>
        <Document
          file={file}
          // parent needs the page count for the pager buttons/dots
          onLoadSuccess={(pdf) => onLoaded(pdf.numPages)}
          loading={<div className="pdf-loading">Loading CV…</div>}
          error={<div className="pdf-loading">Couldn&apos;t load the PDF :(</div>}
        >
          {/* mode="wait" so the old page finishes flipping out before the new
              one flips in — otherwise both canvases stack and it looks broken */}
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={pageNumber}
              className="pdf-page"
              custom={dir}
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* text/annotation layers off — we just want a crisp canvas, and
                  the selectable-text overlay never lines up nicely on dark UIs */}
              {width > 0 && (
                <Page
                  pageNumber={pageNumber}
                  width={width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading=""
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Document>
      </div>
    </div>
  );
}
