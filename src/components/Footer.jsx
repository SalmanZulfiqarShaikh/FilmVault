import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent text-white py-6 mt-8 flex flex-col items-center gap-4">
      <p className="text-center text-sm">© {year} FilmVault, All Rights Reserved.</p>

      <div className="flex gap-6">
        <a
          href="https://github.com/SalmanZulfiqarShaikh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaGithub size={28} />
        </a>
        <a
          href="https://linkedin.com/in/SalmanZulfiqarShaikh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaLinkedin size={28} />
        </a>
        <a
          href="https://instagram.com/salmanzulfiqar_"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaInstagram size={28} />
        </a>
      </div>
        <p>Made by Salman Zulfiqar Shaikh</p>
    </footer>
  );
}
