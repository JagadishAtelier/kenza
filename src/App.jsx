import 'modern-css-reset/dist/reset.min.css';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarBlack from './Components/NavbarBlack/NavbarBlack';
import Wallpaper from './Components/Wallpaper/Wallpaper';
import Banner from './Components/Banner/Banner';
import TreandingProduct from './Components/TreandingProduct/TreandingProduct';
import BackgroundImage from './Components/BackgroundImage/BackgroundImage';
// import TrendingNow from './Components/TrendingNow/TrendingNow';
import Reviews from './Components/Reviews/Reviews';
import TopCategories from './Components/TopCategories/TopCategories';
import Testimonial from './Components/Testimonial/Testimonial';
import BrandLogo from './Components/BrandLogo/BrandLogo';
import SpecialProduct from './Components/SpecialProduct/SpecialProduct';
import SmartBlog from './Components/SmartBlog/SmartBlog';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div>
      <NavbarBlack/>
      <Wallpaper/>
      <Banner/>
      <TreandingProduct/>
      <BackgroundImage/>
      {/* <TrendingNow/> */}
      <Reviews/>
      <TopCategories/>
      <Testimonial/>
      <BrandLogo/>
      <SpecialProduct/>
      <SmartBlog/>
      <Footer/>
    </div>
  )
}

export default App
