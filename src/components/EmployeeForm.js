import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EmployeeContext } from "../context/EmployeeContext";

const EmployeeSchema = Yup.object().shape({
  employeeId: Yup.string().required("Employee ID is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string(),
  designation: Yup.string(),
  department: Yup.string(),
});

const EmployeeForm = ({ initialValues = null, onClose }) => {
  const { addEmployee, updateEmployee } = useContext(EmployeeContext);

  const startValues = initialValues || {
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joiningDate: "",
    leavingDate: "",
    currentCtc: "",
    status: "Active",
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Add / Edit Employee</h3>

      <Formik
        initialValues={startValues}
        validationSchema={EmployeeSchema}
        enableReinitialize
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            if (initialValues && initialValues._id) {
              await updateEmployee(initialValues._id, values);
              onClose && onClose();
            } else {
              await addEmployee(values);
              resetForm();
            }
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Basic Info */}
            {[
              { label: "Employee ID", name: "employeeId" },
              { label: "Name", name: "name" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone" },
              { label: "Designation", name: "designation" },
              { label: "Department", name: "department" },
              { label: "Joining Date", name: "joiningDate", type: "date" },
              { label: "Leaving Date", name: "leavingDate", type: "date" },
              { label: "Current CTC", name: "currentCtc", type: "number" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {f.label}
                </label>
                <Field
                  name={f.name}
                  type={f.type || "text"}
                  className="mt-1 block w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name={f.name}
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
            ))}

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="mt-1 block w-full border rounded px-2 py-1"
              >
                <option value="Active">Active</option>
                <option value="Left">Left</option>
              </Field>
            </div>

            {/* Buttons */}
            <div className="md:col-span-3 flex gap-2 justify-end mt-4">
              <button
                type="button"
                className="px-4 py-2 border rounded bg-gray-100"
                onClick={() => onClose && onClose()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                {initialValues ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
