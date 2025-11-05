import React, { createContext, useState } from "react";
import axios from "axios";

export const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([]);

  // Fetch all leaves
  const getLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  // Add a new leave
  const addLeave = async (leaveData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/leaves", leaveData);
      setLeaves((prev) => [...prev, res.data]); // add new leave locally
      return res.data;
    } catch (err) {
      console.error("Error adding leave:", err);
      throw err;
    }
  };

  // Update leave status
  const updateLeaveStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/leaves/${id}`, { status });
      // Update local list
      setLeaves((prev) => prev.map((l) => (l._id === id ? res.data : l)));
    } catch (err) {
      console.error("Error updating leave status:", err);
    }
  };

  return (
    <LeaveContext.Provider value={{ leaves, getLeaves, addLeave, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
};
