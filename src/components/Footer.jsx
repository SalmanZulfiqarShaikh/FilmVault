import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-yellow-400 w-full py-6">
      <div className="flex flex-col items-center">
        <p className="text-gray-900 mb-4">
          © 2025, Copyright Salman Zulfiqar Shaikh. All rights reserved.
        </p>
        <div className="flex gap-6 text-gray-900 text-2xl">
          <a
            href="https://github.com/SalmanZulfiqarShaikh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-transform transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/salmanzulfiqarshaikh/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com/salmanzulfiqar_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
