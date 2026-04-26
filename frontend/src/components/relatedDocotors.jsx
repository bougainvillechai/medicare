import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDocotors = ({docId, speciality}) => {
    console.log(docId, speciality)
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );
      setRelDocs(doctorsData);
    }
  }, [docId, speciality, doctors]);




  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900md:mx-10">
      <h1 className="text-3xl font-bold">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0,5).map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="border border-blue-50 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 "
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="bg-blue-50 px-8 py-3 rounded-full cursor-pointer mt-10 transition-all duration-200 hover:font-semibold"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        View All
      </button>
    </div>
  );
};

export default RelatedDocotors;
