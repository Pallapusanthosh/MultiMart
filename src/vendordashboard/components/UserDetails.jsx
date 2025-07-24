import React, { useEffect, useState } from "react";
import { APIpath } from "../helpers/Apipath";

const UserDetails = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingFirm, setDeletingFirm] = useState(null);

  const vendorId = localStorage.getItem("vendorid");

  const fetchVendorDetails = async () => {
    if (!vendorId) return;
    try {
      const response = await fetch(`${APIpath}/vendor/getvendorbyid/${vendorId}`);
      const data = await response.json();
      setVendor(data.vendor);
    } catch (error) {
      console.error("Failed to fetch vendor details:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFirm = async (firmId) => {
    if (!window.confirm("Are you sure you want to delete this firm?")) return;
    setDeletingFirm(firmId);
    try {
      const response = await fetch(`${APIpath}/firm/${firmId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setVendor((prev) => ({
          ...prev,
          firm: prev.firm.filter((f) => f._id !== firmId),
        }));
        alert("Firm deleted successfully.");
      } else {
        alert("Failed to delete the firm.");
      }
    } catch (error) {
      console.error("Delete firm error:", error);
      alert("An error occurred while deleting.");
    } finally {
      setDeletingFirm(null);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 text-center">
        Vendor Details
      </h2>
      {vendor ? (
        <>
          <div className="space-y-2 text-gray-700">
            {/* <p>
              <span className="font-semibold text-gray-900">Vendor ID:</span> {vendor._id}
            </p> */}
            <p>
              <span className="font-semibold text-gray-900">Username:</span> {vendor.username}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email:</span> {vendor.email}
            </p>
          </div>

          <h3 className="text-xl font-bold text-indigo-600 mt-6 mb-2">Firm Details</h3>
          {vendor.firm && vendor.firm.length > 0 ? (
            <div className="space-y-4">
              {vendor.firm.map((f) => (
                <div
                  key={f._id}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* <p><span className="font-semibold">Firm ID:</span> {f._id}</p> */}
                  <p><span className="font-semibold">Firm Name:</span> {f.firmname}</p>
                  {f.products && <p><span className="font-semibold">Products Count :</span> {f.products.length}</p>}
                  {f.category && <p><span className="font-semibold">Firm Type :</span> {f.category[0]}   {f.category[1]}</p>}
                  {f.region&& <p><span className="font-semibold">Food-Types :</span> {f.region[0]} {f.region[1]} {f.region[2]} {f.region[3]} </p>}
                  {f.area && <p><span className="font-semibold">Address:</span> {f.area}</p>}
                  {f.contactnumber && <p><span className="font-semibold">Contact Number:</span> {f.contactnumber}</p>}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteFirm(f._id)}
                    disabled={deletingFirm === f._id}
                    className={`mt-3 px-4 py-2 text-white rounded-lg transition ${
                      deletingFirm === f._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingFirm === f._id ? "Deleting..." : "Delete Firm"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No firm details available.</p>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">Vendor not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
