import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'modern-css-reset/dist/reset.min.css';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarBlack from './Components/NavbarBlack/NavbarBlack';
import Wallpaper from './Components/Wallpaper/Wallpaper';
import Banner from './Components/Banner/Banner';
import TreandingProduct from './Components/TreandingProduct/TreandingProduct';
import BackgroundImage from './Components/BackgroundImage/BackgroundImage';
import TrendingNow from './Components/TrendingNow/TrendingNow';
import TopCategories from './Components/TopCategories/TopCategories';
import Testimonial from './Components/Testimonial/Testimonial';
import BrandLogo from './Components/BrandLogo/BrandLogo';
import SpecialProduct from './Components/SpecialProduct/SpecialProduct';
import SmartBlog from './Components/SmartBlog/SmartBlog';
import Footer from './Components/Footer/Footer';
import LatestBlog from './Components/LatestBlog/LatestBlog';
import ViewAllProduct from './Components/ViewAllProduct/ViewAllProduct';

function HomePage() {
  return (
    <>
      <NavbarBlack />
      <Wallpaper />
      <Banner />
      <TreandingProduct />
      <BackgroundImage />
      <TopCategories />
      <Testimonial />
      <BrandLogo />
      <SpecialProduct />
      <LatestBlog />
      <SmartBlog />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <NavbarBlack/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:name" element={<TrendingNow />} />
        <Route path="/all-product" element={<ViewAllProduct />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
