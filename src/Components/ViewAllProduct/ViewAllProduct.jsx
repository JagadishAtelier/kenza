import React,{useState} from 'react'
import './ViewAllProduct.css'
import { useNavigate } from 'react-router-dom'
import vegImage from '../../Assets/view-all-wall-veg.webp'
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p1.webp'
import TPImage8 from '../../Assets/p8.webp'
import banner from '../../Assets/view-all-banner.webp'
const featuredProducts = [
    { image: TPImage1,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage2, text: "Aliqunaim Retrum Mollis", price: "$ 18.00",type:"organics" },
    { image: TPImage2,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage3, text: "American Grapes", price: "$ 17.00",type:"organics" },
    { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage4, text: "Autum Eua Guide", price: "$ 16.00",type:"organics" },
    { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage5, text: "Consectuar Adipicing", price: "$ 15.00",type:"organics" }, 
    { image: TPImage7,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage6, text: "Fuse Fermentum", price: "$ 12.00",type:"organics" },
    { image: TPImage8,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage1, text: "Maruis Bibendum", price: "$ 10.00" ,type:"organics"},
    { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage7, text: "Mustard", price: "$ 15.00",type:"organics" },
    { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage8, text: "Organic Chilli", price: "$ 14.00" ,type:"organics"}
  ]
const newProducts = [
    { image: TPImage1,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage2, text: "Aliqunaim Retrum Mollis", price: "$ 18.00",type:"organics" },
    { image: TPImage2,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage3, text: "American Grapes", price: "$ 17.00",type:"organics" },
    { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage4, text: "Autum Eua Guide", price: "$ 16.00",type:"organics" },
  ]
  const categories = [
    "cucumber",
    "cherry tomatoes",
    "broccoli",
    "cabbage",
    "brussels sprouts",
    "aubergine",
  ];
const fruits = [
    {text:"peach"},
    {text:"kiwi"},
    {text:"apple"},
    {text:"Banana"},
    {text:"Blueberry"},
]
const organicProduct = [
    {text:"dry fruits"},
    {text:"dairy products"},
    {text:"beverages"},
    {text:"Grains"},
    {text:"Legumes"},
]
function ViewAllProduct() {
    const [hoverIndex, setHoverIndex] = useState(null)
    const[showCategories,setShowCategories] = useState(false)
    const[showFruits,setShowFruits] = useState(false)
    const[showOragnicProduct,setShowOragnicProduct] = useState(false)
    const navigate = useNavigate()

    const DoubleVerticalLine = () => (
        <svg width="20" height="20" viewBox="0 0 20 40" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="0" x2="5" y2="40" stroke="black" strokeWidth="5" />
          <line x1="15" y1="0" x2="15" y2="40" stroke="black" strokeWidth="5" />
        </svg>
      );
      
      const ThreeVerticalLines = () => (
        <svg width="30" height="20" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="0" x2="5" y2="40" stroke="black" strokeWidth="5" />
          <line x1="15" y1="0" x2="15" y2="40" stroke="black" strokeWidth="5" />
          <line x1="25" y1="0" x2="25" y2="40" stroke="black" strokeWidth="5" />
        </svg>
      );
      
      const FourVerticalLines = () => (
        <svg width="40" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="0" x2="5" y2="40" stroke="black" strokeWidth="5" />
          <line x1="15" y1="0" x2="15" y2="40" stroke="black" strokeWidth="5" />
          <line x1="25" y1="0" x2="25" y2="40" stroke="black" strokeWidth="5" />
          <line x1="35" y1="0" x2="35" y2="40" stroke="black" strokeWidth="5" />
        </svg>
      );
        
      const ThreeHorizontalLines = () => (
        <svg width="20" height="30" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="5" x2="40" y2="5" stroke="black" strokeWidth="5" />
          <line x1="0" y1="15" x2="40" y2="15" stroke="black" strokeWidth="5" />
          <line x1="0" y1="25" x2="40" y2="25" stroke="black" strokeWidth="5" />
        </svg>
      );
      
  return (
    <div className='view-all-container'>
      <div className='view-all-left-side'>
        <div className='view-all-cat-section-left'>
        <h3 className='view-all-categories-container-heading'>CATEGORIES</h3>
        <div onClick={() => setShowCategories(!showCategories)}>
            <h5 className='view-all-categories-container-inner-heading'>Vegitables</h5></div>
            {showCategories && (
          <ul className="view-all-categories-dropdown">
            {categories.map((category, index) => (
                <p>{category}</p>
            ))}
          </ul>
        )}
        <div onClick={() => setShowFruits(!showFruits)}>
            <h5 className='view-all-categories-container-inner-heading'>Fruits</h5></div>
            {showFruits && (
          <ul className="view-all-categories-dropdown">
            {categories.map((category, index) => (
                <p>{category}</p>
            ))}
          </ul>
        )}
        <div onClick={() => setShowOragnicProduct(!showOragnicProduct)}>
            <h5 className='view-all-categories-container-inner-heading'>Organic Product</h5></div>
            {showOragnicProduct && (
          <ul className="view-all-categories-dropdown">
            {categories.map((category, index) => (

                <p>{category}</p>
 
            ))}
          </ul>
        )}
        </div>
                <br/>
        <div className='view-all-cat-section-left'>
            <h3 className='view-all-categories-container-heading'>FILTER</h3>
            <h5 style={{padding:"10px"}}>Availability</h5>
            <div className='input-checkbox'>
                <input type='checkbox'/>
                <p>In Stock</p>
            </div>
            <div className='input-checkbox'>
                <input type='checkbox'/>
                <p>Out Of Stock</p>
            </div>
            <hr/>

            <h5 style={{padding:"10px"}}>PRICE</h5>
            <div className='input-text-container-left'>
            <div className='input-text'>
                <p>$</p>
                <input type='text'placeholder='FROM'/>
 
            </div>
            <div className='input-text'>
                <p>$</p>
                <input type='text' placeholder='TO'/>
            </div>
            </div>

            <hr/>

            <h5 style={{padding:"10px"}}>Color</h5>
            <div className='input-text-container-left'>
                <div className='color-red-round'></div>
                <div className='color-green-round'></div>
                <div className='color-blue-round'></div>
                <div className='color-orange-round'></div>
            </div>
            
        </div>

        <br/>

        <div className='view-all-cat-section-left'>
            <h3 className='view-all-categories-container-heading'>NEW PRODUCTS</h3>
            <div className='view-all-grid-box-container'>
    {newProducts.map((data, index) => (
      <div className='view-all-data-grid' key={index}>
        <div className='view-all-image-wrapper'>
          <img src={data.image} alt={`view-all-product-${index}`} />
          <div className='view-all-star-overlay'>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </div>
          <div className='view-all-hover-icons'>
            <i className="bi bi-heart"></i>
            <i className="bi bi-eye"></i>
          </div>
        </div>
        <div className='view-all-para-text'>
        <p>{data.text}</p>
        <p>{data.price}</p>
        </div>
      </div>
    ))}
  </div>
            
        </div>

        <br/>

        <div className='view-all-left-banner'>
            <img src={banner}/>
        </div>

        
        <br/>

        <div className='view-all-cat-section-left'>
            <h3 className='view-all-categories-container-heading'>SPECIAL PRODUCTS</h3>
            <div className='view-all-grid-box-container'>
    {newProducts.map((data, index) => (
      <div className='view-all-data-grid' key={index}>
        <div className='view-all-image-wrapper'>
          <img src={data.image} alt={`view-all-product-${index}`} />
          <div className='view-all-star-overlay'>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </div>
          <div className='view-all-hover-icons'>
            <i className="bi bi-heart"></i>
            <i className="bi bi-eye"></i>
          </div>
        </div>
        <div className='view-all-para-text'>
        <p>{data.text}</p>
        <p>{data.price}</p>
        </div>
      </div>
    ))}
  </div>
            
        </div>
      </div>

      <div className='view-all-right-side'>
        <h3>Vegetables</h3>
        <p>Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!</p>
        <br/>
        <p>Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer! Accessorize with a straw hat and you're ready for summer! Accessorize with a straw hat and you're ready for summer!...</p>
        <img src={vegImage}/>
        <div>
        <div className='view-all-right-align-icon'>
        <DoubleVerticalLine/>
        <ThreeVerticalLines/>
        <FourVerticalLines/>
        <ThreeHorizontalLines/>
        <h6>View Products By Your Wish</h6>
        <div className='view-all-sort-by-right'>
        <h6>Sort By</h6>
        <select>
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
      <div className='grid-box-container'>
        {featuredProducts.map((data, index) => {
          const activeDot = hoverIndex === index ? 1 : 0;

          return (
            <div 
              className='data-grid' 
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className='image-wrapper' onClick={() => navigate(`/product/${data.text}`, { state: { product: data } })}>
                <img 
                  src={hoverIndex === index ? data.hoverImage : data.image} 
                  alt={`product-${index}`} 
                />
                <div className='star-overlay'>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <div className='hover-icons'>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-eye"></i>
                </div>
              </div>
              <p>{data.text}</p>
              <p>{data.price}</p>

              {/* Dots */}
              <div className="dots-container">
                <span className={`dot ${activeDot === 0 ? 'active' : ''}`}></span>
                <span className={`dot ${activeDot === 1 ? 'active' : ''}`}></span>
              </div>
            </div>
          )
        })}
      </div>
    </div>

      </div>
      </div>
    </div>
  )
}

export default ViewAllProduct
