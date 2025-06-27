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
    <div className="position-relative w-100" style={{ maxWidth: "300px", margin: "0 auto" }}>
      <div className="input-group shadow-sm">
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          placeholder="Search products or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
        <span className="input-group-text bg-success border-start-0">
          <SearchIcon size={18} className="text-white" />
        </span>
      </div>

      {/* Results Dropdown */}
      {showDropdown && (results.products.length > 0 || results.categories.length > 0) && (
        <div
          className="position-absolute w-100 mt-1 bg-white border rounded shadow overflow-auto"
          style={{ maxHeight: "320px", zIndex: 1050 }}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="px-3 py-2 border-bottom text-uppercase text-muted small fw-bold">
            Products
          </div>
          {results.products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleSelect(product._id)}
              className="d-flex align-items-center gap-3 px-3 py-2 hover-bg-light cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="rounded object-cover"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <div className="fw-medium small">{product.name}</div>
                <div className="text-muted small">{product.category}</div>
              </div>
            </div>
          ))}

          {results.categories.length > 0 && (
            <>
              <div className="px-3 py-2 border-top text-uppercase text-muted small fw-bold">
                Categories
              </div>
              {results.categories.map((cat, index) => (
                <div
                  key={cat._id || index}
                  onClick={() => {
                    setQuery("");
                    setShowDropdown(false);
                    navigate(`/category/${cat.name}`);
                  }}
                  className="px-3 py-2 text-body small hover-bg-light cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  {cat.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {loading && (
        <div className="position-absolute mt-1 w-100 text-center text-muted small py-2 bg-white">
          Searching...
        </div>
      )}
    </div>
  );
}
