import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Job from "./pages/Job";
import JobDescription from "./pages/JobDescription";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Job />} />
        <Route path="job-description" element={<JobDescription />} />
      </Routes>
    </>
  );
};

export default App;
