import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDocotors from "../components/relatedDocotors";

const Appointment = () => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const { doc_id } = useParams();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = React.useState(null);
  const [docSlots, setDocSlots] = React.useState([]);
  const [slotIndex, setSlotIndex] = React.useState(0); //user picks day
  const [slotTime, setSlotTime] = React.useState(""); // user picks time
  const fetchDocInfo = async () => {
    const doc_info = doctors.find((doc) => doc._id.toString() === doc_id);
    setDocInfo(doc_info);
  };

  const getAvailableSLots = async () => {
    setDocSlots([]);
    //getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with respect to current date
      let date = new Date(today);
      date.setDate(today.getDate() + i);
      //setting end time of the date
      let endTime = new Date(date);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === date.getDate()) {
        date.setHours(date.getHours() > 10 ? date.getHours() + 1 : 10);
        date.setMinutes(date.getMinutes() > 30 ? 30 : 0);
      } else {
        date.setHours(10);
        date.setMinutes(0);
      }
      let timeslots = [];
      while (date < endTime) {
        let formattedTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        timeslots.push({
          datetime: new Date(date),
          time: formattedTime,
        });
        //increment current time by 30min
        date.setMinutes(date.getMinutes() + 30);
      } 

      setDocSlots((prev) => [...prev, timeslots]);
    }
  };
  useEffect(() => {
    getAvailableSLots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, doc_id]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    <div>
      {docInfo ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gary-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} -{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 test-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-175 mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 max-w-175 mt-1">Doctor not found</p>
      )}

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(slotTime === item.time ? "" : item.time)} className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "border border-gray-200"}`} key={index}>
              {item.time.toLowerCase()} 
            </p>
          ))}
        </div>
        <button className="bg-primary text-white py-3 px-14 rounded-full mt-4 hover:bg-blue-600 font-light">
          Book an Appointment
        </button>
      </div>

      {docInfo && (
        <RelatedDocotors docId={docInfo._id} speciality={docInfo.speciality} />
      )}

    </div>
  );
};

export default Appointment;
