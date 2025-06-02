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
import Reviews from './Components/Reviews/Reviews';
import TopCategories from './Components/TopCategories/TopCategories';
function App() {
  return (
    <div>
      <NavbarBlack/>
      <Wallpaper/>
      <Banner/>
      <TreandingProduct/>
      <BackgroundImage/>
      <TrendingNow/>
      <Reviews/>
      <TopCategories/>
    </div>
  )
}

export default App
