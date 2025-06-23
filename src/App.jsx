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
import { CartProvider } from './Components/CartContext/CartContext';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import NewsletterPopup from './Components/NewsletterPopup/NewsletterPopup';
import ShopPage from './Components/ShopPage/ShopPage';
import CartPage from './Components/CartPage/CartPage';
import BlogPage from './Components/BlogPage/BlogPage';
import AboutPage from './Components/AboutPage/AboutPage';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import { WishlistProvider } from './Components/WishlistContext/WishlistContext';
import TermsAndCondition from './Components/TermsAndCondition/TermsAndCondition';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import RefundPolicy from './Components/RefundPolicy/RefundPolicy';
function HomePage() {
  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
    <CartProvider>

      <Router>
        <ScrollToTop/>
        <NavbarBlack />
        <NewsletterPopup/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<TrendingNow />} />
          <Route path="/all-product" element={<ViewAllProduct />} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/shop" element={<ShopPage/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/about-us" element={<AboutPage/>} />
          <Route path="/profile-page" element={<ProfilePage/>} />
          <Route path="/terms-and-condition" element={<TermsAndCondition/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          {/* <Route path="/cart" element={<CartPage/>} /> */}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;
