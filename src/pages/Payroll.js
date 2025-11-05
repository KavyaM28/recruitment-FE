import React, { useContext, useEffect } from "react";
import { PayrollContext } from "../context/PayrollContext";
import SalaryUpdateForm from "../components/SalaryUpdateForm";
import { downloadPayslip } from "../services/payrollService";

const Payroll = () => {
  const { payrolls, getPayrolls } = useContext(PayrollContext);

  useEffect(() => {
    getPayrolls();
  }, []);

  // ✅ Download PDF directly when clicking "View Payslip"
  const handleViewPayslip = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payroll/${id}/payslip`);
      if (!response.ok) throw new Error("PDF download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Payslip.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading payslip:", error);
      alert("Could not download payslip");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
      <SalaryUpdateForm />

      <div className="mt-6 grid gap-4">
        {payrolls.length > 0 ? (
          payrolls.map((p) => (
            <div key={p._id} className="p-4 border rounded-lg shadow">
              <p><strong>Employee ID:</strong> {p.employeeId?.employeeId}</p>
              <p><strong>Name:</strong> {p.employeeId?.name}</p>
              <p><strong>Month:</strong> {p.month} {p.year}</p>
              <p><strong>Net Salary:</strong> ₹{p.netSalary}</p>
              <p><strong>Status:</strong> {p.status}</p>

              <button
                onClick={() => downloadPayslip(p._id)}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Payslip (PDF)
              </button>
            </div>
          ))
        ) : (
          <p>No payroll records yet.</p>
        )}
      </div>
    </div>
  );
};

export default Payroll;
