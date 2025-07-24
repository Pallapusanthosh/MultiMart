import React, { useState, useEffect } from "react";
import { APIpath } from "../helpers/Api_path";
import { FiShoppingCart } from "react-icons/fi";

export default function Home({ username }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState([]);

  // Fetch products
  useEffect(() => {
    const token = localStorage.getItem("logintoken") || "";
    fetch(`${APIpath}/product/all-products`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) return setErr(data.message || "Error fetching products");
        const products = Array.isArray(data) ? data : data.products || [];
        setItems(products);
        setFilteredItems(products);
      })
      .catch(() => setErr("Network Error"))
      .finally(() => setLoading(false));
  }, []);

  // Filters & search
  useEffect(() => {
    let updated = [...items];
    if (filter !== "all") {
      updated = updated.filter(p => p.category?.includes(filter));
    }
    if (search.trim()) {
      const lowerSearch = search.trim().toLowerCase();
      updated = updated.filter(p => p.productName.toLowerCase().includes(lowerSearch));
    }

    // Group & sort by product name and price
    const grouped = {};
    for (let p of updated) {
      const key = p.productName.toLowerCase();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(p);
    }
    const sorted = Object.values(grouped).flatMap(group =>
      group.sort((a, b) => Number(a.price) - Number(b.price))
    );

    setFilteredItems(sorted);
  }, [filter, search, items]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p._id === product._id);
      if (existing) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setAddedToCart(prev => [...prev, product._id]);
  };

  // Decrease quantity / remove
  const handleDecrement = (productId) => {
    setCart(prev => {
      const updated = prev
        .map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      // If item removed, also allow "Add to Cart" again
      if (!updated.find(item => item._id === productId)) {
        setAddedToCart(prev => prev.filter(id => id !== productId));
      }
      return updated;
    });
  };

  const incrementQuantity = (id) => {
    setCart(prev => prev.map(p =>
      p._id === id ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
    setAddedToCart(prev => prev.filter(pid => pid !== id));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (err) return <div className="text-center text-red-500 py-10">{err}</div>;

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-6 bg-gray-50 relative">
      {/* Cart Button */}
      <div className="absolute top-6 right-6">
        <button onClick={() => setShowCart(prev => !prev)} className="relative">
          <FiShoppingCart className="text-3xl text-indigo-700" />
          {cart.length > 0 && (
            <span className="absolute top-[-6px] right-[-8px] bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        Welcome {username || "User"}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {["all", "veg", "non-veg"].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full ${filter === type
              ? type === "veg"
                ? "bg-green-600 text-white"
                : type === "non-veg"
                  ? "bg-red-600 text-white"
                  : "bg-indigo-600 text-white"
              : "bg-gray-200"
              }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Cart Page */}
      {showCart && (
        <div className="fixed top-20 right-6 bg-white shadow-xl p-6 rounded-lg w-full max-w-md z-50 max-h-[80vh] overflow-auto border-4 border-indigo-400">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Your Cart</h3>
            <button
              onClick={() => setShowCart(false)}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              ← Back to Products
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            <ul>
              {cart.map(item => (
                <li key={item._id} className="flex justify-between items-center mb-4 border-b pb-2">
                  <div>
                    <p className="font-bold">{item.productName}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-md font-medium">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item._id)}
                      className="px-2 py-1 text-sm bg-indigo-500 text-white rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-2 py-1 text-sm bg-gray-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Confirm Order
            </button>
          )}
        </div>
      )}

      {/* Product Grid */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredItems.map(p => (
            <div key={p._id} className="p-4 rounded-xl shadow bg-white">
              {p.image && (
                <img
                  src={`${APIpath}/uploads/${p.image}`}
                  alt={p.productName}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font-semibold">{p.productName}</h4>
              <p className="text-sm text-gray-500">Category: {p.category?.join(", ")}</p>
              <p className="text-sm text-gray-500">{p.firm?.[0]?.firmname ? `From: ${p.firm[0].firmname}` : "Firm: N/A"}</p>
              <p className="text-lg font-bold text-indigo-700 mt-1">₹{p.price}</p>
              <p className="text-sm text-gray-500">{p.description || "No description available"}</p>
              {p.bestSeller && (
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-600">
                  Best Seller
                </span>
              )}
              <button
                onClick={() => handleAddToCart(p)}
                disabled={addedToCart.includes(p._id)}
                className={`mt-2 px-3 py-1 text-sm font-semibold rounded-xl shadow ${
                  addedToCart.includes(p._id)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {addedToCart.includes(p._id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
