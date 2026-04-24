import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
const Footer = () => {
  const footerLinkClass = "transition-colors duration-200 hover:text-blue-600";

  return (
    <div>
      <div className="flex md:mx-10flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm mb-10">
        <div className="">
          <img className="md:mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
            nisi veritatis fugit autem, quae voluptatum ipsa corrupti voluptate
            voluptas. Facilis praesentium nobis facere quis, dolorem doloremque
            enim perspiciatis. Exercitationem, error.
          </p>
        </div>
        <div className="">
          <h3 className="text-xl font-medium mb-5">COMPANY</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link className={footerLinkClass} to="/">Home</Link>
            </li>
            <li>
              <Link className={footerLinkClass} to="/about">About Us</Link>
            </li>
            <li>
              <Link className={footerLinkClass} to="/contact">Contact Us</Link>
            </li>
            <li>
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-xl font-medium mb-5">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>123 Street, New York, USA</li>
            <li>+012 345 67890</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="text-center text-gray-600 py-5">
        &copy; 2026 Medicare. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
