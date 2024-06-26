import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link href="/timers" style={linkStyle}>Timers</Link>
          </li>
          <li style={navItemStyle}>
            <Link href="/about" style={linkStyle}>About</Link>
          </li>
          <li style={navItemStyle}>
            <Link href="/news" style={linkStyle}>News</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#333',
  padding: '10px 20px',
  color: '#fff',
  textAlign: 'center'
};

const navListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center'
};

const navItemStyle = {
  margin: '0 10px'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
};

export default Header;