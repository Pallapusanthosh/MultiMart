import React, { useState, useEffect, useRef } from "react";
import { APIpath } from "../helpers/Apipath";
import AddProduct from "../components/forms/AddProduct"; // import if you want inline add; otherwise navigate or toggle parent
// import AddProduct if you want inline add; otherwise navigate or toggle parent

function AllProductsByFirm({ vendorId: vendorIdProp, onAddProduct ,showallproducts }) {
  const [firmBlocks, setFirmBlocks] = useState([]); // [{firm, products, deletingId:null}]
  const [loading, setLoading] = useState(true);
  const initRef = useRef(false);
const [showAddProduct, setShowAddProduct] = useState(false);
const [selectedFirm, setSelectedFirm] = useState(null);
  const vendorId = vendorIdProp || localStorage.getItem("vendorid");

  const fetchVendorWithFirms = async () => {
    if (!vendorId) {
      setFirmBlocks([]);
      setLoading(false);
      return;
    }
    try {
      const vr = await fetch(`${APIpath}/vendor/getvendorbyid/${vendorId}`);
      const vd = await vr.json();
      const firms = vd?.vendor.firm || [];
    
      // parallel fetch products for each firm
      const blocks = await Promise.all(
        firms.map(async (f) => {
          try {
            const pr = await fetch(`${APIpath}/product/${f._id}/products`);
            const pd = await pr.json();
            return { firm: f, products: pd?.products || [], deletingId: null };
          } catch {
            return { firm: f, products: [], deletingId: null };
          }
        })
      );
      setFirmBlocks(blocks);
    } catch (err) {
      console.error("Failed to load vendor firms", err);
      setFirmBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (firmId, productId) => {
    if (!window.confirm("Delete this product?")) return;
    setFirmBlocks((prev) =>
      prev.map((b) =>
        b.firm._id === firmId ? { ...b, deletingId: productId } : b
      )
    );
    try {
      const resp = await fetch(`${APIpath}/product/${productId}`, { method: "DELETE" });
      const data = await resp.json();
      if (resp.ok) {
        alert("Product deleted.");
        setFirmBlocks((prev) =>
          prev.map((b) =>
            b.firm._id === firmId
              ? { ...b, products: b.products.filter((p) => p._id !== productId), deletingId: null }
              : b
          )
        );
      } else {
        alert(data.message || "Delete failed");
        setFirmBlocks((prev) =>
          prev.map((b) =>
            b.firm._id === firmId ? { ...b, deletingId: null } : b
          )
        );
      }
    } catch (err) {
      console.error("Delete failed", err);
      setFirmBlocks((prev) =>
        prev.map((b) =>
          b.firm._id === firmId ? { ...b, deletingId: null } : b
        )
      );
    }
  };

  const handleAddProduct = (firm) => {
    // store for AddProduct component to use
    localStorage.setItem("firmid", firm._id);
    localStorage.setItem("firmname", firm.firmname || "");
    setSelectedFirm(firm);
    setShowAddProduct(true);
    if (onAddProduct) onAddProduct(firm); // let parent swap to AddProduct view
  };
  const handleBackToProducts = () => {
    setShowAddProduct(false);
    setSelectedFirm(null);
    fetchVendorWithFirms(); // Refresh products after adding
  };

useEffect(() => {
  fetchVendorWithFirms();
}, [showallproducts]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">All Products</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!firmBlocks.length) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">All Products</h2>
        <p className="text-gray-500">No firms found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12">
      {showAddProduct ? (<> <button
            onClick={handleBackToProducts}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ← Back to All Products
          </button>
  <AddProduct firm={selectedFirm} onClose={() => setShowAddProduct(false)} /></>
) : (<>
      {firmBlocks.map(({ firm, products, deletingId }) => (
        <div key={firm._id} className="space-y-4">
          {/* Firm header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-indigo-700">FirmName : {firm.firmname}</h3>
              <p className="text-sm text-gray-600">Firm Area :{firm.area}</p>
            </div>
            <div className="flex items-center gap-2">
              {firm.offer && (
                <span className="px-2 py-0.5 text-xs font-semibold text-pink-700 bg-pink-100 rounded">
                  {firm.offer}
                </span>
              )}
              <button
                type="button"
                onClick={() => handleAddProduct(firm)}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700"
              >
                + Add Product
              </button>
            </div>
          </div>

          {/* Firm tags */}
          <div className="flex flex-wrap gap-1">
            {(firm.category || []).map((c) => (
              <span key={c} className="px-1.5 py-0.5 text-[10px] rounded bg-indigo-100 text-indigo-700">
                {c}
              </span>
            ))}
            {(firm.region || []).map((r) => (
              <span key={r} className="px-1.5 py-0.5 text-[10px] rounded bg-purple-100 text-purple-700">
                {r}
              </span>
            ))}
          </div>

          {/* Products table for this firm */}
          {products.length === 0 ? (
            <p className="text-gray-500 text-sm">No products added.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Product Name</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-left">Bestseller</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p._id}
                      className="border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-4 py-3">{p.productName}</td>
                      <td className="px-4 py-3">₹{p.price}</td>
                      <td className="px-4 py-3">
                        {p.image && (
                          <img
                            src={`${APIpath}/uploads/${p.image}`}
                            alt={p.productName}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            p.bestSeller
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {p.bestSeller ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(firm._id, p._id)}
                          disabled={deletingId === p._id}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded shadow hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          {deletingId === p._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      ))}</>
      )}
    </div>
  );
}

export default AllProductsByFirm;
