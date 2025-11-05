import React, { createContext, useState } from "react";
import * as payrollService from "../services/payrollService";

export const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);

  const getPayrolls = async () => {
    const data = await payrollService.getAllPayrolls();
    setPayrolls(data);
  };

  const addPayroll = async (record) => {
    const newRec = await payrollService.addPayroll(record);
    setPayrolls([...payrolls, newRec]);
  };

  return (
    <PayrollContext.Provider value={{ payrolls, getPayrolls, addPayroll }}>
      {children}
    </PayrollContext.Provider>
  );
};
