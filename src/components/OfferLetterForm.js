import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { OfferLetterContext } from "../context/OfferLetterContext";
import * as offerService from "../services/offerLetterService";

const OfferLetterSchema = Yup.object().shape({
  name: Yup.string().required("Candidate name is required"),
  designation: Yup.string().required("Designation is required"),
  joiningDate: Yup.date().required("Joining date is required"),
  offeredCtc: Yup.number().required("CTC is required").positive("Must be positive"),
});

const OfferLetterForm = () => {
  const { addOffer } = useContext(OfferLetterContext);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Generate Offer Letter</h3>

      <Formik
        initialValues={{
          name: "",
          designation: "",
          joiningDate: "",
          offeredCtc: "",
        }}
        validationSchema={OfferLetterSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            // Match backend expected field names
            const payload = {
              employeeName: values.name,
              designation: values.designation,
              joiningDate: values.joiningDate,
              offeredCtc: values.offeredCtc,
            };

            const created = await offerService.createOffer(payload);

            // Add to context
            await addOffer(created);
            resetForm();

            if (created.pdfUrl) {
              // Auto-download PDF
              const link = document.createElement("a");
              link.href = created.pdfUrl;
              link.download = `${values.name}_OfferLetter.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              alert("✅ Offer Letter generated and downloaded successfully!");
            } else {
              alert("⚠️ Offer Letter generated but PDF link not found!");
            }
          } catch (err) {
            console.error("Failed to generate offer letter:", err);
            alert("❌ Failed to generate offer letter. Check backend or network.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Candidate Name</label>
              <Field
                name="name"
                className="mt-1 block w-full border px-2 py-1 rounded"
              />
              <ErrorMessage name="name" component="div" className="text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm font-medium">Designation</label>
              <Field
                name="designation"
                className="mt-1 block w-full border px-2 py-1 rounded"
              />
              <ErrorMessage name="designation" component="div" className="text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm font-medium">Joining Date</label>
              <Field
                type="date"
                name="joiningDate"
                className="mt-1 block w-full border px-2 py-1 rounded"
              />
              <ErrorMessage name="joiningDate" component="div" className="text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm font-medium">Offered CTC (₹)</label>
              <Field
                type="number"
                name="offeredCtc"
                className="mt-1 block w-full border px-2 py-1 rounded"
              />
              <ErrorMessage name="offeredCtc" component="div" className="text-xs text-red-500" />
            </div>

            <div className="md:col-span-2 text-right mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Generate & Download
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OfferLetterForm;
