import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-gray-700 font-medium text-center text-2xl pt-10">
        <p>CONTACT US</p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-90" src={assets.contact_image} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Office</p>
          <p className="text-gray-500">San Francisco, CA <br /> 123 Main Street, USA</p>
          <p className="text-gray-500">(Tel): 123 456 789 <br /> (Fax): 123 456 789</p>
          <p className="text-gray-600 font-semibold text-lg">Careers</p>
          <p className="text-gray-500">Get in touch with us.</p>
          <button className="border border-gray-300 py-3 px-8 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Job Openings</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
