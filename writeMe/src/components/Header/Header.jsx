import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems =[
    {
      name: 'Home',
      slug:"/",
      active: !authStatus
    },
    {
      name: 'Login',
      slug:"/login",
      active: !authStatus
    },
    {
      name: 'SignUp',
      slug:"/signup",
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug:"/all-posts",
      active: authStatus
    },
    {
      name: 'Add Post',
      slug:"/add-post",
      active: authStatus
    },

  ]
  return (
    <header style={{backgroundColor:"#7AB2B2"}} className='sticky top-0 py-3 shadow-sm text-black z-50'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='50px'/>
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active? (<li key={item.name} >
              <button onClick={() => {navigate(item.slug)}} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full active:bg-blue-200'>
                {item.name}
              </button>
            </li>) : null
            )}
            {authStatus && (<li>
              <LogoutBtn />
            </li>)}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header