import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../../views/frontapplication/Navbar'
export default function index() {
    return (
        <div>
               <div>
      <NavBar />
      <div >
        <div >
          <div >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}
