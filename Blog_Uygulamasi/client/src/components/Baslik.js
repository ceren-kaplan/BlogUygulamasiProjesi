import React from "react";
import { Link } from "react-router-dom";

export default function baslik() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Makale Listesi</Link>
        </li>
        <li>
          <Link to="/ekle">Makale Ekle</Link>
        </li>
      </ul>
    </nav>
  );
}
