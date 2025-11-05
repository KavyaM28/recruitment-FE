import React from "react";

const MonthlyReport = ({ records = [] }) => {
  if (!records.length)
    return <p className="text-gray-500">No records found.</p>;

  const formatDate = (d) => d.toISOString().split("T")[0];

  const grouped = records.reduce((acc, rec) => {
    const emp = rec.employeeId?.name || rec.employeeId;
    if (!acc[emp]) acc[emp] = {};
    acc[emp][formatDate(new Date(rec.date))] = rec.status;
    return acc;
  }, {});

  const uniqueDates = [...new Set(records.map((r) => formatDate(new Date(r.date))))].sort();

  return (
    <div className="overflow-auto bg-white shadow rounded p-4">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Employee</th>
            {uniqueDates.map((date) => (
              <th key={date} className="p-2 text-center text-xs">{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([emp, recs]) => (
            <tr key={emp} className="border-t">
              <td className="p-2 font-medium">{emp}</td>
              {uniqueDates.map((date) => {
                const status = recs[date] || "-";
                const color =
                  status === "Present"
                    ? "bg-green-100 text-green-700"
                    : status === "Absent"
                    ? "bg-red-100 text-red-700"
                    : status === "Leave"
                    ? "bg-yellow-100 text-yellow-700"
                    : "";
                return (
                  <td key={date} className={`p-2 text-center text-sm ${color}`}>
                    {status[0] || "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReport;
