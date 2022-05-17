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
import { StyledNavSub } from '../styles/NavSub.styled'

const Navbar = () => {

  const { setAuth } = useContext(AuthContext);
  const logout = useLogout()
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('--usernm--')

  useEffect((req, res) => {
    console.log(Cookies.get('username'));
    setUsername(Cookies.get('username'))
    console.log('---navbar.jsx');
  }, [])

  // const logoutOld = async () => {
  //   let response = await axios.get('/logout').then(({ data }) => data)
  //   Cookies.remove('username')
  //   Cookies.remove('jwt')
  //   setAuth({});
  //   // navigate('/linkpage');
  // }

  const signOut = async () => {
    await logout()
    navigate('/');
  }


  return (
    <>
      <StyledNavBar>
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <ul>
          <li><a href="/"         > Home </a></li>
          <li><a href="/login"    > Login </a></li>
          <li><a href="/register" > Register </a></li>
          <li><a href="/linkpage" > Linkpage </a></li>

          <li><a href="/editor"   > Editor </a></li>
          <li><a href="/admin"    > Admin </a></li>
          <li><a href="/lounge"   > Lounge </a></li>
        </ul>
      </StyledNavBar>


        <StyledNavSub>
          <ul>
            <li><input type="text" placeholder="search..."/> <button><BiSearchAlt /> </button></li>
            {username && (  
              <li className='userCred'><RiUser5Line /> 
                <span> {username} </span> 
                <button onClick={signOut}><RiLogoutBoxRLine />logout</button>
              </li>
            )}
          </ul>
        </StyledNavSub>
      
    </>
  )
}

export default Navbar