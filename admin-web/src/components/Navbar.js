import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/doctors" style={styles.link}>Doctors</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/patients" style={styles.link}>Patients</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/hospitals" style={styles.link}>Hospitals</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/logs" style={styles.link}>Logs</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    padding: '10px 20px',
    marginBottom: '20px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
