import { motion } from "framer-motion";
import { profile } from "../cvData.js";

const linkList = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
  { key: "portfolio", label: "Portfolio" },
];

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="header__name">{profile.name}</h1>
      <p className="header__title">{profile.title}</p>

      <nav className="header__links">
        {linkList.map((link) => (
          <a
            key={link.key}
            href={profile.links[link.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="header__link"
          >
            {link.label}
          </a>
        ))}

        <a
          href="/ABHINAV_NALATWAD_CV.pdf"
          download
          className="header__link header__link--download"
        >
          ↓ Download CV
        </a>
      </nav>
    </motion.header>
  );
}
