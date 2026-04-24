import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact"; 
import MyAppointments from "./pages/myappointments";
import MyProfile from "./pages/myprofile"; 
import Doctors from "./pages/doctors";
import Login from "./pages/login";
import Appointment from './pages/appointment';
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/about" element={ <About /> }/>
        <Route path="/contact" element={ <Contact /> }/>
        <Route path="/myappointments" element={ <MyAppointments /> }/>
        <Route path="/appointment/:doctor_name" element={ <Appointment /> }/>
        <Route path="/myprofile" element={ <MyProfile /> }/>
        <Route path="/doctors" element={ <Doctors /> }/>
        <Route path="/doctor/:speciality" element={ <Doctors /> }/>
        <Route path="/login" element={ <Login /> } />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
