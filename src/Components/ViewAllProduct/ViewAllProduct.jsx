import React, { useState, useEffect } from 'react';
import './ViewAllProduct.css';
import { getAllProducts } from '../../Api/productApi';
import { useNavigate, useLocation } from 'react-router-dom';
import vegImage from '../../Assets/view-all-wall-veg.webp';
import banner from '../../Assets/view-all-banner.webp';

const categories = [
  "cucumber", "cherry tomatoes", "broccoli", "cabbage", "brussels sprouts", "aubergine"
];
const fruits = [
  { text: "peach" }, { text: "kiwi" }, { text: "apple" }, { text: "Banana" }, { text: "Blueberry" }
];
const organicProduct = [
  { text: "dry fruits" }, { text: "dairy products" }, { text: "beverages" }, { text: "Grains" }, { text: "Legumes" }
];

function ViewAllProduct() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();

  const [hoverIndex, setHoverIndex] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showFruits, setShowFruits] = useState(false);
  const [showOragnicProduct, setShowOragnicProduct] = useState(false);
  const [columnCount, setColumnCount] = useState(3);
  const [sortOption, setSortOption] = useState("Featured");
  const [allProducts, setAllProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        const fetched = res.data;
        setAllProducts(fetched);
        setSortedProducts(fetched);
        setNewProducts(fetched.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sorted = [...allProducts];

    switch (option) {
      case "Alphabeticall A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabeticall Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Price Low-High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price High-Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted = [...allProducts];
    }

    setSortedProducts(sorted);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setColumnCount(2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImage = (product, hover = false) => {
    if (!product?.images?.length) return '/fallback.png';
    return hover && product.images[1] ? product.images[1] : product.images[0];
  };

  const renderProductGrid = (products) => (
    products.map((data, index) => (
      <div className='view-all-data-grid' key={index}>
        <div className='view-all-image-wrapper'>
          <img src={getImage(data)} alt={`product-${index}`} />
          <div className='view-all-star-overlay'>
            {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
          </div>
          <div className='view-all-hover-icons'>
            <i className="bi bi-heart"></i>
            <i className="bi bi-eye"></i>
          </div>
        </div>
        <div className='view-all-para-text'>
          <p>{data.name}</p>
          <p>₹ {data.price}</p>
        </div>
      </div>
    ))
  );

  const DoubleVerticalLine = () => (
    <svg width="20" height="20" viewBox="0 0 20 40"><line x1="5" y1="0" x2="5" y2="40" stroke="black" strokeWidth="5" /><line x1="15" y1="0" x2="15" y2="40" stroke="black" strokeWidth="5" /></svg>
  );

  const ThreeVerticalLines = () => (
    <svg width="30" height="20" viewBox="0 0 30 40"><line x1="5" y1="0" x2="5" y2="40" stroke="black" strokeWidth="5" /><line x1="15" y1="0" x2="15" y2="40" stroke="black" strokeWidth="5" /><line x1="25" y1="0" x2="25" y2="40" stroke="black" strokeWidth="5" /></svg>
  );
  if (loading) {
  return (
    <div className="kenzo-loader-wrapper">
      {"kenzo...".split("").map((letter, index) => (
        <span
          key={index}
          className="kenzo-letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

  return (
    <div className='view-all-container'>
      <div className='view-all-left-side'>
        <div className='view-all-cat-section-left'>
          <h5 className='view-all-categories-container-heading'>CATEGORIES</h5>
          <div onClick={() => setShowCategories(!showCategories)}>
            <h5 className='view-all-categories-container-inner-heading'>Vegitables</h5>
          </div>
          {showCategories && (
            <ul className="view-all-categories-dropdown">{categories.map((c, i) => <p key={i}>{c}</p>)}</ul>
          )}

          <div onClick={() => setShowFruits(!showFruits)}>
            <h5 className='view-all-categories-container-inner-heading'>Fruits</h5>
          </div>
          {showFruits && (
            <ul className="view-all-categories-dropdown">{fruits.map((c, i) => <p key={i}>{c.text}</p>)}</ul>
          )}

          <div onClick={() => setShowOragnicProduct(!showOragnicProduct)}>
            <h5 className='view-all-categories-container-inner-heading'>Organic Product</h5>
          </div>
          {showOragnicProduct && (
            <ul className="view-all-categories-dropdown">{organicProduct.map((c, i) => <p key={i}>{c.text}</p>)}</ul>
          )}
        </div>

        <br />

        <div className='view-all-cat-section-left'>
          <h5 className='view-all-categories-container-heading'>FILTER</h5>
          <h5 style={{ padding: "10px" }}>Availability</h5>
          <div className='input-checkbox'><input type='checkbox' /><p>In Stock</p></div>
          <div className='input-checkbox'><input type='checkbox' /><p>Out Of Stock</p></div>
          <hr />
          <h5 style={{ padding: "10px" }}>PRICE</h5>
          <div className='input-text-container-left'>
            <div className='input-text'><p>₹</p><input type='text' placeholder='FROM' /></div>
            <div className='input-text'><p>₹</p><input type='text' placeholder='TO' /></div>
          </div>
          <hr />
          <h5 style={{ padding: "10px" }}>Color</h5>
          <div className='input-text-container-left'>
            <div className='color-red-round'></div>
            <div className='color-green-round'></div>
            <div className='color-blue-round'></div>
            <div className='color-orange-round'></div>
          </div>
        </div>

        <br />

        <div className='view-all-cat-section-left'>
          <h5 className='view-all-categories-container-heading'>NEW PRODUCTS</h5>
          <div className='view-all-grid-box-container'>
            {renderProductGrid(newProducts)}
          </div>
        </div>

        <br />
        <div className='view-all-left-banner'><img src={banner} alt="side-banner" /></div>
        <br />

        <div className='view-all-cat-section-left'>
          <h5 className='view-all-categories-container-heading'>SPECIAL PRODUCTS</h5>
          <div className='view-all-grid-box-container'>
            {renderProductGrid(newProducts)}
          </div>
        </div>
      </div>

      <div className='view-all-right-side'>
        <h3>{product?.name}</h3>
        <p className='view-all-right-para'></p>
        <img src={vegImage} alt="veg" />

        <div className='view-all-right-align-icon'>
          <div onClick={() => setColumnCount(2)}><DoubleVerticalLine /></div>
          <div onClick={() => setColumnCount(3)} className="hide-on-mobile"><ThreeVerticalLines /></div>
          <h6 className="hide-on-mobile">View Products By Your Wish</h6>
          <div className='view-all-sort-by-right'>
            <h6 className="hide-on-mobile">Sort By</h6>
            <select value={sortOption} onChange={handleSortChange}>
              <option>Featured</option>
              <option>Best Selling</option>
              <option>Alphabeticall A-Z</option>
              <option>Alphabeticall Z-A</option>
              <option>Price Low-High</option>
              <option>Price High-Low</option>
            </select>
          </div>
        </div>

        <div className='trending-product-container'>
          <div className='view-all-right-grid-box-container' style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            gap: '20px'
          }}>
            {sortedProducts.map((data, index) => (
              <div className='data-grid' key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className='image-wrapper' onClick={() => navigate(`/product/${data._id}`, { state: { product: data } })}>
                  <img src={getImage(data, hoverIndex === index)} alt={data.name} />
                  <div className='star-overlay'>
                    {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
                  </div>
                  <div className='hover-icons'>
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-eye"></i>
                  </div>
                </div>
                <p>{data.name}</p>
                <p>{data.price}</p>
                <div className="dots-container">
                  <span className={`dot ${hoverIndex === index ? 'active' : ''}`}></span>
                  <span className={`dot ${hoverIndex !== index ? 'active' : ''}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllProduct;
