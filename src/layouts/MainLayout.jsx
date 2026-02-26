import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import ScrollToTop from '../components/utils/ScrollToTop'
const MainLayout = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <Navbar />
      <div className='pt-15 min-h-[calc(100vh-300px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
