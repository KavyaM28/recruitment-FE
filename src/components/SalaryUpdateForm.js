import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PayrollContext } from "../context/PayrollContext";
import api from "../services/api";

const SalarySchema = Yup.object().shape({
  employeeId: Yup.string().required("Employee selection is required"),
  month: Yup.string().required("Month is required"),
  year: Yup.number().required("Year is required"),
});

const SalaryUpdateForm = () => {
  const { addPayroll } = useContext(PayrollContext);
  const [employees, setEmployees] = useState([]);

  // Fetch employee list from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Generate Payroll / Payslip</h3>

      <Formik
        initialValues={{
          employeeId: "",
          month: "",
          year: new Date().getFullYear(),
          basic: 0,
          hra: 0,
          allowances: 0,
          bonus: 0,
          deductions: 0,
        }}
        validationSchema={SalarySchema}
        onSubmit={async (vals, { setSubmitting, resetForm }) => {
          const gross =
            Number(vals.basic) +
            Number(vals.hra) +
            Number(vals.allowances) +
            Number(vals.bonus);
          const net = gross - Number(vals.deductions);
          try {
            await addPayroll({
              employeeId: vals.employeeId,
              month: vals.month,
              year: vals.year,
              basic: vals.basic,
              hra: vals.hra,
              allowances: vals.allowances,
              bonus: vals.bonus,
              deductions: vals.deductions,
              grossSalary: gross,
              netSalary: net,
              status: "Generated",
            });
            resetForm();
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* ✅ Employee dropdown instead of text input */}
            <div>
              <label className="text-sm">Employee</label>
              <Field
                as="select"
                name="employeeId"
                className="mt-1 block w-full border px-2 py-1 rounded"
              >
                <option value="">-- Select Employee --</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.designation})
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="employeeId"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            {[
              { label: "Month", name: "month", placeholder: "e.g., October" },
              { label: "Year", name: "year", type: "number" },
              { label: "Basic", name: "basic", type: "number" },
              { label: "HRA", name: "hra", type: "number" },
              { label: "Allowances", name: "allowances", type: "number" },
              { label: "Bonus", name: "bonus", type: "number" },
              { label: "Deductions", name: "deductions", type: "number" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-sm">{f.label}</label>
                <Field
                  name={f.name}
                  type={f.type || "text"}
                  placeholder={f.placeholder || ""}
                  className="mt-1 block w-full border px-2 py-1 rounded"
                />
                <ErrorMessage
                  name={f.name}
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
            ))}

            <div className="md:col-span-3 text-right mt-3">
              <div className="text-sm mb-2">
                Computed Gross: ₹
                {Number(values.basic || 0) +
                  Number(values.hra || 0) +
                  Number(values.allowances || 0) +
                  Number(values.bonus || 0)}
              </div>
              <div className="text-sm mb-2">
                Net Payable: ₹
                {Number(values.basic || 0) +
                  Number(values.hra || 0) +
                  Number(values.allowances || 0) +
                  Number(values.bonus || 0) -
                  Number(values.deductions || 0)}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Generate Payslip
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SalaryUpdateForm;
