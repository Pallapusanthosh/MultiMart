import React, { useEffect, useState } from "react";
import { APIpath } from "../helpers/Apipath";
import AddProduct from "../components/forms/AddProduct";

function Firms({ vendorId: vidProp  , showFirms : showFirms   }) {
  const [firms, setFirms] = useState([]);
  const [view, setView] = useState("list"); // list | detail | addProduct
  const [selFirm, setSelFirm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingFirms, setLoadingFirms] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [username ,setusername] = useState("");
  const vendorId = vidProp || localStorage.getItem("vendorid");
  const name = localStorage.getItem("vendorname").toLocaleUpperCase();

    useEffect(() => {
    if (view === "list") {
    //   setView("list");
      setSelFirm(null);
      setusername(name || "None");
      setProducts([]);
      setLoadingFirms(true);
      fetchVendorFirms();
    }
  }, [view, vendorId, name]);

  const fetchVendorFirms = async () => {
    if (!vendorId) { setFirms([]); setLoadingFirms(false); return; }
    try {
      const r = await fetch(`${APIpath}/vendor/getvendorbyid/${vendorId}`);
      const d = await r.json();
      setFirms(d?.vendor.firm || []);
      
    } catch (_) {
      setFirms([]);
    } finally {
      setLoadingFirms(false);
    }
  };

  const fetchFirmProducts = async (fid) => {
    setLoadingProducts(true);
    try {
      const r = await fetch(`${APIpath}/product/${fid}/products`);
      const d = await r.json();
      setProducts(d?.products || []);
    } catch (_) {
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSelectFirm = (f) => {
    setSelFirm(f);
    setView("detail");
    fetchFirmProducts(f._id);
  };



  const handleAddProduct = (f) => {
    localStorage.setItem("firmid", f._id);
    localStorage.setItem("firmname", f.firmname || "");
    setSelFirm(f);
    setView("addProduct");
  };

  const backToList = () => {
    setSelFirm(null);
    setProducts([]);
    setView("list");
  };

 

  if (view === "addProduct" && selFirm) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-indigo-700">Add Product • {selFirm.firmname}</h2>
          <button onClick={() => handleSelectFirm(selFirm)} className="hover:underline px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold shadow hover:bg-red-900 transition-colors">Back To Firms </button>
        </div>
        <AddProduct />
      </div>
    );
  }

  if (view === "detail" && selFirm) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <button onClick={backToList} className="hover:underline px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold shadow hover:bg-red-900 transition-colors ">← All Firms</button>
          <button onClick={() => handleAddProduct(selFirm)} className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700">Add Product</button>
        </div>

        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow p-6 mb-8 max-w-3xl">
          <div className="flex gap-6">
            {selFirm.image ? (
              <img
                src={`${APIpath}/uploads/${selFirm.image}`}
                alt={selFirm.firmname}
                className="w-32 h-32 object-cover rounded-xl border"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No Image</div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-700">{selFirm.firmname}</h2>
              <p className="text-gray-600 mt-1">{selFirm.area}</p>
              {selFirm.offer && (
                <p className="mt-2 inline-block px-2 py-1 text-xs font-semibold text-pink-700 bg-pink-100 rounded">{selFirm.offer}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {(selFirm.category || []).map((c) => (
                  <span key={c} className="px-2 py-0.5 text-xs rounded bg-indigo-100 text-indigo-700">{c}</span>
                ))}
                {(selFirm.region || []).map((r) => (
                  <span key={r} className="px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">Products</h3>
        {loadingProducts ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col"
              >
                {p.image ? (
                  <img
                    src={`${APIpath}/uploads/${p.image}`}
                    alt={p.productName}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                ) : (
                  <div className="w-full h-32 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs mb-3">No Image</div>
                )}
                <h4 className="font-semibold text-gray-800 truncate">{p.productName}</h4>
                <p className="text-sm text-gray-600 mt-1">₹{p.price}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {(p.category || []).map((c) => (
                    <span key={c} className="px-1.5 py-0.5 text-[10px] rounded bg-indigo-100 text-indigo-700">{c}</span>
                  ))}
                </div>
                {p.bestseller && (
                  <span className="mt-2 inline-block px-2 py-0.5 text-[10px] rounded bg-green-100 text-green-700">Bestseller</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6"> Mr . {username} Firms</h2>
      {loadingFirms ? (
        <p className="text-gray-500">Loading firms...</p>
      ) : firms.length === 0 ? (
        <p className="text-gray-500">No firms yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {firms.map((f) => (
            <div
              key={f._id}
              className="group bg-white/90 border border-gray-200 rounded-2xl shadow hover:shadow-lg transition cursor-pointer p-4 flex flex-col"
              onClick={() => handleSelectFirm(f)}
            >
              {f.image ? (
                <img
                  src={`${APIpath}/uploads/${f.image}`}
                  alt={f.firmname}
                  className="w-full h-32 object-cover rounded-xl mb-4"
                />
              ) : (
                <div className="w-full h-32 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-4">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800 truncate">{f.firmname}</h3>
              <p className="text-sm text-gray-600 mt-1 truncate">{f.area}</p>
              {f.offer && (
                <p className="mt-2 inline-block px-2 py-0.5 text-xs font-semibold text-pink-700 bg-pink-100 rounded">
                  {f.offer}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-1">
                {(f.category || []).slice(0, 3).map((c) => (
                  <span key={c} className="px-1.5 py-0.5 text-[10px] rounded bg-indigo-100 text-indigo-700">
                    {c}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleAddProduct(f); }}
                className="mt-4 px-3 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700"
              >
                Add Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Firms;
