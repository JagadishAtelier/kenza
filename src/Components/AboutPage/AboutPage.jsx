import React from 'react'
import './AboutPage.css'
import image from '../../Assets/aboutImage.webp'
import image2 from '../../Assets/aboutImage2.webp'
import icon1 from '../../Assets/ab1.webp' 
import icon2 from '../../Assets/ab2.webp' 
import icon3 from '../../Assets/ab3.webp' 
import LocationMap from '../LocationMap/LocationMap'
import contactImage from '../../Assets/contactImage.webp'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const iconContent = [
    {image : icon1 ,head : "FREE RESOURCES",para : "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward"},
    {image : icon2 ,head : "MULTI-PURPOSE",para : "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward"},
    {image : icon3 ,head : "FULLY RESPONSIVE",para : "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward"},
]
function AboutPage() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100); // Delay to allow DOM to finish rendering
        }
      }
    }, [location]);
  
  return (
    <div className='about-page-contaniner'>
      <div className='about-us-heading'>
        <h1>About Us</h1>
      </div>
      <div id="about-us" className='about-us-image-and-content'>
      <div className="animated-image-wrapper">
  <img src={image} alt="about" className="animated-image" />
  <div className="overlay top-overlay"></div>
  <div className="overlay bottom-overlay"></div>
</div>

        <div className='about-us-content'>
            <h1>We Have Everything You Need ?</h1>
            <p>Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!</p>
            <div>
                <h4>Sample Unordered List</h4>
                <ul className='unordered-list'>
                    <li>Lorem ipsum, or lipsum as it is sometimes known</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                    <li>The passage is attributed to.</li>
                    <li>Proin molestie egestas orci ac suscipit risus posuere loremou.</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                </ul>
            </div>
        </div>
      </div>

      <div  className='about-page-icon-conatainer'>
        {iconContent.map((data,index)=>(
            <div className='about-page-icon-text'>
                <img src={data.image}/>
                <h3>{data.head}</h3>
                <p>{data.para}</p>
            </div>
        ))}
      </div>


      <div className='about-us-image-and-content'>
        <div className='about-us-content'>
            <h1>We Have Everything You Need ?</h1>
            <p>Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!</p>
            <div>
                <h4>Sample Unordered List</h4>
                <ul className='unordered-list'>
                    <li>Lorem ipsum, or lipsum as it is sometimes known</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                    <li>The passage is attributed to.</li>
                    <li>Proin molestie egestas orci ac suscipit risus posuere loremou.</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                </ul>
            </div>
        </div>
        <div className="animated-image-wrapper">
  <img src={image2} alt="about" className="animated-image" />
  <div className="overlay top-overlay"></div>
  <div className="overlay bottom-overlay"></div>
</div>

      </div>


      <div  id="contact-us" className='contact-us-container'>
        <div className='contact-us-heading'>
            <h1>Contact Us</h1>
        </div>
        <div className='contact-us-image-content'>
            <div className='contact-us-image'>
                <img src={contactImage}/>
                <div className='contact-us-image-background'></div>
            </div>
            <div className='contact-us-right-side'>
                <h1>GET IN TOUCH</h1>
                <p>We'd Love to Hear From You, Lets Get In Touch!</p>
                <div className='contact-address-grid'>
                    <div className='contact-us-address'>
                        <h5>Address</h5>
                        <p>4005, Silver business point</p>
                        <p>France</p>
                    </div>
                    <div className='contact-us-address'>
                        <h5>Phone</h5>
                        <p>+00 900 123456789</p>
                    </div>
                    <div className='contact-us-address'>
                        <h5>Email</h5>
                        <p>info@gmail.com</p>
                    </div>
                    <div className='contact-us-address'>
                        <h5>Additional Information</h5>
                        <p>We are open: Monday -</p>
                        <p>Saturday, 10AM - 5PM and</p>
                        <p>closed on sunday sorry for that.</p>
                    </div>
                </div>
                <div className='conntact-us-social-icons'>
                    <h5>Social</h5>
                    <div className="social-icons">
            <div className="icon facebook"><i className="bi bi-facebook"></i></div>
            <div className="icon instagram"><i className="bi bi-instagram"></i></div>
            <div className="icon tiktok"><i className="bi bi-tiktok"></i></div>
            <div className="icon snapchat"><i className="bi bi-snapchat"></i></div>
            <div className="icon vimeo"><i className="bi bi-vimeo"></i></div>
          </div>
                </div>
            </div>
        </div>

      </div>
      <LocationMap/>
    </div>
  )
}

export default AboutPage
