import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const right_list = `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-200 cursor-pointer hover:bg-primary hover:text-white`;
  console.log(speciality);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const specialities = [
    "General physician",
    "Gynaecologist",
    "Dermatologist",
    "Pediatricians",
    "Gastroenterologist",
    "Neurologist",
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  const handleSpecialityClick = (selectedSpeciality) => {
    if (speciality === selectedSpeciality) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${selectedSpeciality}`);
    }

    scrollTo(0, 0);
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div>
      <p className="text-gray-600">Browse through doctors specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 border px-3 rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev =>!prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${showFilter ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 sm:max-h-[800px] sm:opacity-100'}`}>
          {specialities.map((item) => (
            <p key={item} className={`${right_list} ${ speciality === item ? "bg-primary text-white" : "bg-white" }`} onClick={() => handleSpecialityClick(item)}> {item} </p>
          ))}
        </div>

        <div
          className={`w-full grid grid-cols-auto gap-4 gap-y-6 transition-opacity duration-300`}>
          {filterDoc.map((item, index) => {
            return (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-50 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 ">
                <img className="bg-blue-50" src={item.image} alt={item.name} />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
