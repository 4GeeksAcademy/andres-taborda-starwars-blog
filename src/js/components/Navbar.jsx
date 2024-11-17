import React from "react"
import { useLocation } from "react-router"
import { Link, NavLink } from "react-router-dom"



export const Navbar = () => {
  
  return (
    <div className="d-flex flex-column flex-shrink-0 p-5 bg-dark" style={{width: "280"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span className="fs-4">Star Wars</span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="mb-2">
        <NavLink to="/people" 
          className={({isActive}) =>  `px-1 py-2 ${isActive ? 'active-link' : ''}` }>          
          Persons
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink to="/vehicles" className={({isActive}) =>  `px-1 py-2 ${isActive ? 'active-link' : ''}` }>
          Vehicles          
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink to="/planets" className={({ isActive }) =>  `px-1 py-2 ${isActive ? 'active-link' : ''}` }>
          Planets          
        </NavLink>
      </li>  
      <li>
        <hr className="text-white"/>
      </li>
      <li>
        <NavLink to="/favorites" className={({ isActive }) =>  `px-1 py-2 ${isActive ? 'active-link' : ''}` }>
          Favorites
        </NavLink>
      </li>     
    </ul>
    <hr/>
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>User</strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
        
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Sign in</a></li>
      </ul>
    </div>
  </div>
  )
}