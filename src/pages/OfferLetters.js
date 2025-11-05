import React, { useContext, useEffect } from "react";
import { OfferLetterContext } from "../context/OfferLetterContext";
import OfferLetterForm from "../components/OfferLetterForm";

const OfferLetters = () => {
  const { offers, getOffers, deleteOffer, loading } = useContext(OfferLetterContext);

  useEffect(() => {
    getOffers();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offer Letter Management</h1>

      {/* Form to generate new offer letters */}
      <OfferLetterForm />

      {/* Table of existing offer letters */}
      <div className="mt-6 bg-white rounded shadow overflow-x-auto">
        <h3 className="text-lg font-semibold px-4 pt-4">Generated Offer Letters</h3>
        <table className="min-w-full border border-gray-300 mt-2 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">#</th>
              <th className="px-3 py-2 border">Candidate Name</th>
              <th className="px-3 py-2 border">Designation</th>
              <th className="px-3 py-2 border">Joining Date</th>
              <th className="px-3 py-2 border">Offered CTC (₹)</th>
              <th className="px-3 py-2 border">PDF</th>
              <th className="px-3 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-4 border"
                >
                  No offer letters found.
                </td>
              </tr>
            ) : (
              offers.map((offer, idx) => (
                <tr key={offer._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border text-center">{idx + 1}</td>
                  <td className="px-3 py-2 border">{offer.employeeName}</td>
                  <td className="px-3 py-2 border">{offer.designation}</td>
                  <td className="px-3 py-2 border">
                    {new Date(offer.joiningDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 border text-right">
                    ₹{offer.offeredCtc}
                  </td>
                  <td className="px-3 py-2 border text-center">
                    {offer.pdfUrl ? (
                      <a
                        href={`http://localhost:5000${offer.pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 border text-center">
                    <button
                      onClick={() => deleteOffer(offer._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️ Delete
                    </button>
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

export default OfferLetters;
