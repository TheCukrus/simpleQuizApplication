import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import "../assets/styles/Header.css"

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quizzes">Quizzes</Link></li>
          <li><Link to="/questions">Questions</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
