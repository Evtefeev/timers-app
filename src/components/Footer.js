import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            TokensTimer 2025
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: '#fff',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%'
};


export default Footer;