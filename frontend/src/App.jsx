import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import JewelryPage from './pages/JewelryPage'
import LegacyPage from './pages/LegacyPage'
import LehengaPage from './pages/LehengaPage'
import LoginPage from './pages/LoginPage'
import LookbookPage from './pages/LookbookPage'
import RegisterPage from './pages/RegisterPage'
import SareePage from './pages/SareePage'
import ShopPage from './pages/ShopPage'

const pages = [
  { slug: 'home', file: 'index.html', label: 'Home' },
  { slug: 'shop', file: 'shop.html', label: 'Shop', route: '/shop' },
  { slug: 'lookbook', file: 'lookbook.html', label: 'Lookbook', route: '/lookbook' },
  { slug: 'contact', file: 'contact.html', label: 'Contact', route: '/contact' },
  { slug: 'lehenga', file: 'lehenga.html', label: 'Lehengas', route: '/lehenga' },
  { slug: 'jewelry', file: 'jewelry.html', label: 'Jewelry', route: '/jewelry' },
  { slug: 'saree', file: 'saree.html', label: 'Sarees', route: '/saree' },
  { slug: 'checkout', file: 'checkout.html', label: 'Checkout', route: '/checkout' },
  { slug: 'login', file: '.idea/login.html', label: 'Login' },
  { slug: 'register', file: '.idea/register.html', label: 'Register' },
  { slug: 'admin', file: '.idea/admin.html', label: 'Admin' },
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage pages={pages} />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/saree" element={<SareePage />} />
      <Route path="/lehenga" element={<LehengaPage />} />
      <Route path="/jewelry" element={<JewelryPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/lookbook" element={<LookbookPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/site/:slug" element={<LegacyPage pages={pages} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
