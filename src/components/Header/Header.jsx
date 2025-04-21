import React, {useState} from 'react'
import {Container, Logo, LogoutBtn, Select} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);


  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus
    },
    {
      name: "Signup",
      slug: '/signup',
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: "Add Post",
      slug: '/add-post',
      active: authStatus
    }
  ]

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 relative">
        
        <Link to="/" className="text-2xl font-bold">
          <Logo width="60px" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <ul
          className={`absolute md:relative top-full left-0 w-full md:w-auto bg-blue-700 md:bg-transparent md:flex md:items-center shadow-lg md:shadow-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} className="w-full md:w-auto text-center">
                <Link to={item.slug} className="block px-6 py-3 hover:bg-blue-600 md:hover:bg-transparent">
                  {item.name}
                </Link>
              </li>
            ) : null
          )}

          {/* Logout Button (If User is Logged In) */}
          {authStatus && (
            <li className="w-full md:w-auto text-center">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header