import React from 'react';

const Footer = () => {
  return (
    <footer className="text-black text-center py-3" style={{backgroundColor: "#e3f2fd"}}>
      <p>&copy; {new Date().getFullYear()} Car Bidding. All rights reserved.</p>
    </footer>
  );
};

export default Footer;