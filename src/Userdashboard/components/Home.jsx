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
  const [vendorGroups, setVendorGroups] = useState([]);
  const [showVendorModal, setShowVendorModal] = useState(false);


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
        // console.log("Fetched products:", products);
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
  const lower = search.trim().toLowerCase();

  updated = updated.filter(p => {
    const nameMatch = p.productName?.toLowerCase().includes(lower);
    const descMatch = p.description?.toLowerCase().includes(lower);
    const firmMatch = p.firm?.firmname?.toLowerCase().includes(lower);
    const priceMatch = String(p.price).toLowerCase().includes(lower);

    return nameMatch || descMatch || firmMatch || priceMatch;
  });
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
      
    const prepareOrderFromBackend = async () => {
      try {
        const response = await fetch(`${APIpath}/vendor/getvendorinfo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart: cart.map(c => ({
              productId: c._id,
              quantity: c.quantity
            }))
          })
        });

        const data = await response.json();
        const groups = Object.values(data);

        setVendorGroups(groups);         // <-- store vendor group data
        setShowVendorModal(true); 
        setShowCart(false);       // <-- show vendor selection popup

      } catch (err) {
        console.error(err);
      }
};


  const sendWhatsApp = (vendorOrder) => {
  let msg = `🛒 *New Order from ${username}*%0A%0A`;
  msg += `*Firm:* ${vendorOrder.firmName}%0A%0A`;

  vendorOrder.items.forEach(item => {
    msg += `• ${item.productName} x ${item.quantity}%0A`;
  });

  const total = vendorOrder.items.reduce(
    (sum, i) => sum + i.quantity * Number(i.price),
    0
  );

  msg += `%0A*Total:* ₹${total}`;

  const phone = "91" + vendorOrder.vendorPhone;
  const whatsappUrl = `https://wa.me/${phone}?text=${msg}`;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // ✔ Opens WhatsApp APP in mobile
    window.location.href = whatsappUrl;
  } else {
    // ✔ Opens WhatsApp in NEW TAB on laptop
    window.open(whatsappUrl, "_blank");
  }
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
  <div className="min-h-[calc(100vh-80px)] px-6 py-6 bg-gray-100 relative">

    {/* Cart Button */}
    <div className="absolute top-6 right-6">
      <button
        onClick={() => setShowCart(prev => !prev)}
        className="p-3 bg-indigo-600 rounded-full text-white shadow hover:bg-indigo-700 transition"
      >
        <FiShoppingCart className="text-2xl" />
      </button>

      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 
        rounded-full flex items-center justify-center shadow">
          {cart.length}
        </span>
      )}
    </div>

    <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
      Welcome {username || "User"}
    </h2>

    {/* Filters */}
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {["all", "veg", "non-veg"].map(type => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition
            ${filter === type
              ? type === "veg"
                ? "bg-green-600 text-white"
                : type === "non-veg"
                  ? "bg-red-600 text-white"
                  : "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>

    {/* Search */}
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 
        rounded-lg shadow-sm focus:outline-none focus:ring-2 
        focus:ring-indigo-500 bg-white"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>

    {/* Cart Page */}
    {showCart && (
      <div className="fixed top-20 right-6 bg-white shadow-xl p-6 rounded-xl w-full 
      max-w-md z-50 max-h-[80vh] overflow-auto border border-indigo-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-indigo-700">Your Cart</h3>
          <button
            onClick={() => setShowCart(false)}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            ← Back
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Cart is empty.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li
                key={item._id}
                className="flex justify-between items-center mb-4 border-b pb-3"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.productName}</p>
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
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <button
            className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            onClick={prepareOrderFromBackend}
          >
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
        <div
            key={p._id}
            className="p-4 rounded-xl bg-white shadow-sm border border-gray-200 
                      transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >

            {p.image ? (
              <img
                src={`${APIpath}/uploads/${p.image}`}
                alt={p.productName}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}

            <h4 className="font-semibold text-gray-800">{p.productName}</h4>
            <p className="text-sm text-gray-500">Category: {p.category?.join(", ")}</p>
            <p className="text-sm text-gray-500">{p.firm?.firmname || "N/A"}</p>
            <p className="text-lg font-bold text-indigo-700 mt-1">₹{p.price}</p>
            <p className="text-sm text-gray-600">{p.description || "No description available"}</p>

            {p.bestSeller && (
              <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full mt-1 inline-block">
                Best Seller
              </span>
            )}

            <button
              onClick={() => handleAddToCart(p)}
              disabled={addedToCart.includes(p._id)}
              className={`mt-3 px-4 py-2 rounded-lg text-sm font-semibold shadow 
                ${addedToCart.includes(p._id)
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

    {/* Vendor Modal */}
    {showVendorModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-96 shadow-lg border border-gray-200">

          <h3 className="text-lg font-bold text-indigo-700 mb-4 text-center">
            Send Order to Vendors
          </h3>

          <div className="space-y-3">
            {vendorGroups.map((vendor, idx) => (
              <button
                key={idx}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                onClick={() => sendWhatsApp(vendor)}
              >
                Send to {vendor.vendorName}
              </button>
            ))}
          </div>

          <button
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg mt-4 hover:bg-gray-400 transition"
            onClick={() => setShowVendorModal(false)}
          >
            Close
          </button>

        </div>
      </div>
    )}

  </div>
);

}
