import React, { useState, useEffect, useContext } from "react"
import Cookies from 'js-cookie'
import { RiUser5Line, RiLogoutBoxRLine } from 'react-icons/ri';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios'

import { useLogout } from "../hooks/useLogout";
import logo from '../logo.svg'
import { StyledNavBar } from '../styles/Navbar.styled'

const Navbar = () => {

  const { setAuth } = useContext(AuthContext);
  const logout = useLogout()
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('--usernm--')

  useEffect((req, res) => {
    setUsername(Cookies.get('username'))
    // console.log('---navbar.jsx');
  }, [])

  const signOut = async () => {
    await logout()
    navigate('/logout');
  }


  return (
    <>
      <StyledNavBar>
        <nav className="main">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <ul>
            <li><a href="/"         > Home </a></li>
            <li><a href="/login"    > Login </a></li>
            <li><a href="/linkpage" > Linkpage </a></li>
            <li><a href="/posts" > Posts </a></li>

            <li><a href="/editor"   > Editor </a></li>
            <li><a href="/admin"    > Admin </a></li>
            <li><a href="/lounge"   > Lounge </a></li>
          </ul>
        </nav>


        <nav className="sub">
          <ul>
            <li><input type="text" placeholder="search..."/> <button><BiSearchAlt /> </button></li>
            {username && (  
              <li className='userCred'><RiUser5Line /> 
                <span> {username} </span> 
                <button onClick={signOut}><RiLogoutBoxRLine />logout</button>
              </li>
            )}
          </ul>
        </nav>
      </StyledNavBar>
      
    </>
  )
}

export default Navbar