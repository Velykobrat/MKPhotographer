// src/components/Navbar.js

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/">
            <a>Головна</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>Про нас</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Контакти</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
