import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link, useNavigate } from "react-router-dom";

const SpecialityMenu = () => {
  const navigate = useNavigate();
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-bold">Find By Speciality</h1>
      <p className="md:w-2/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => {
          return (
            <div key={index}>
              <Link
                onClick={() => scrollTo(0, 0)}
                to={`/doctors/${item.speciality}`}
                className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  className="w-16 sm:w-24 mb-2"
                  src={item.image}
                  alt={item.speciality}
                />
                <h3>{item.speciality}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
