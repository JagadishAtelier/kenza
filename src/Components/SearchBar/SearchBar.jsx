import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const inputRef = useRef();

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults({ products: [], categories: [] });
      return;
    }

    setLoading(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      axios
        .get(`${API_URL}/api/search?query=${encodeURIComponent(query)}`)
        .then((res) => {
          setResults(res.data);
          setShowDropdown(true);
        })
        .catch((err) => {
          console.error("Search error:", err);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  const handleSelect = (productId) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border rounded-md bg-white overflow-hidden shadow-sm focus-within:ring-2 ring-indigo-500">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Search products or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
        <SearchIcon className="mx-3 text-gray-400" size={18} />
      </div>

      {/* Results Dropdown */}
      {showDropdown && (results.products.length > 0 || results.categories.length > 0) && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-y-auto"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="px-4 py-2 border-b text-xs uppercase text-gray-500">
            Products
          </div>
          {results.products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleSelect(product._id)}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
            >
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <div className="font-medium text-sm">{product.name}</div>
                <div className="text-xs text-gray-500">{product.category}</div>
              </div>
            </div>
          ))}

          {results.categories.length > 0 && (
            <>
              <div className="px-4 py-2 border-t text-xs uppercase text-gray-500">
                Categories
              </div>
              {results.categories.map((cat, index) => (
                <div
                  key={cat._id || index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setQuery("");
                    setShowDropdown(false);
                    navigate(`/category/${cat.name}`);
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {loading && (
        <div className="absolute top-full mt-1 bg-white text-center text-sm text-gray-500 w-full py-2">
          Searching...
        </div>
      )}
    </div>
  );
}
