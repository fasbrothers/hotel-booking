import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__left">
        <Link to="/">
          <p className="footer__logo">Travel.uz</p>
        </Link>
          <p className="footer__text">Your favorite hotel booking experience since 2023</p>
          <p className="footer__copyright">Travel.uz @2023</p>
        </div>
        <div className="footer__right">
          <li>Help</li>
          <li>FAQ</li>
          <li>Customer service</li>
          <li>How to guide</li>
          <li>Contact us</li>
        </div>
      </div>
    </div>
  );
}

export default Footer;
