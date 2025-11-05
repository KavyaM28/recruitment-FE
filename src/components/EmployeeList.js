import React, { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = ({ employees = [], onSelect }) => {
  const { removeEmployee } = useContext(EmployeeContext);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const filtered = employees.filter((e) =>
    `${e.name} ${e.email} ${e.employeeId}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <input
          placeholder="Search by name, email or id..."
          className="border px-3 py-2 rounded w-1/3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {editing && (
        <EmployeeForm initialValues={editing} onClose={() => setEditing(null)} />
      )}

      <div className="bg-white shadow rounded overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Designation</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">CTC</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr key={e._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{e.name}</td>
                  <td className="p-2">{e.email}</td>
                  <td className="p-2">{e.designation || "-"}</td>
                  <td className="p-2">{e.department || "-"}</td>
                  <td className="p-2">₹{e.currentCtc || "-"}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        e.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        className="text-sm px-2 py-1 bg-yellow-100 rounded"
                        onClick={() => setEditing(e)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm px-2 py-1 bg-red-100 rounded"
                        onClick={() => removeEmployee(e._id)}
                      >
                        Delete
                      </button>
                      {onSelect && (
                        <button
                          className="text-sm px-2 py-1 bg-blue-100 rounded"
                          onClick={() => onSelect(e)}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
