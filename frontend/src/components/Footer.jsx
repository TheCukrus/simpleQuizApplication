import React from 'react';
import "../assets/styles/Footer.css"

function Footer()
{
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} Your Quiz App</p>
        </footer>
    );
}

export default Footer;
