import React, { useEffect, useState } from 'react';
import './SpecialProduct.css';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../Api/productApi';
import { useWishlist } from '../WishlistContext/WishlistContext';

function SpecialProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Failed to load products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="special-container">
      <div className="spl-heading">
        <h1>SPECIAL PRODUCT</h1>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <div className="spl-grid-box-container">
          {products.map((product) => {
            const mainImage = product.images?.[0] || '/fallback-image.jpg';

            return (
              <div
                className="spl-data-grid card-view"
                key={product._id}
                onClick={() =>
                  navigate(`/product/${product._id}`, { state: { product } })
                }
              >
                <div className="spl-image-wrapper">
                  <img
                    src={mainImage}
                    alt={product.name}
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                  <div className="spl-hover-icons">
                    <i
                      className="bi bi-heart"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                      }}
                    ></i>
                    <i className="bi bi-eye"></i>
                  </div>
                </div>

                <div className="spl-star-overlay center-stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>

                <div className="spl-para-text">
                  <p className="spl-product-name">{product.name}</p>
                  <p className="spl-product-price">{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="spl-view-btn">
        <button
          className="spl-trending-product-view-all-btn"
          onClick={() => navigate('/all-product')}
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default SpecialProduct;
