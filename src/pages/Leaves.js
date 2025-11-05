// src/pages/Leaves.js
import React, { useContext, useEffect } from "react";
import { LeaveContext } from "../context/LeaveContext";
import LeaveForm from "../components/LeaveForm";
import LeaveApproval from "../components/LeaveApproval"; // Approval UI (approve/reject)

const Leaves = () => {
  const { leaves, getLeaves } = useContext(LeaveContext);

  useEffect(() => {
    getLeaves();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Management</h1>

      {/* Apply Leave Form */}
      <LeaveForm />

      {/* Pending Approvals (separate component) */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Pending Leaves</h2>
        <LeaveApproval />
      </div>

      {/* Leave History */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Leave History</h2>
      <div className="grid gap-4">
        {leaves.length === 0 ? (
          <p className="text-gray-500">No leave records found.</p>
        ) : (
          leaves.map((leave) => (
            <div key={leave._id} className="p-4 border rounded-lg shadow">
              <p>
                <strong>{leave.employeeId?.name || leave.employeeId}</strong> - {leave.leaveType}
              </p>
              <p>
                {new Date(leave.fromDate).toLocaleDateString()} → {new Date(leave.toDate).toLocaleDateString()}
              </p>
              <p>Status: {leave.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaves;
 