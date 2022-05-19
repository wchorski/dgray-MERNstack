import React from 'react'
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <>
      <div>You're Logged out</div>
      <Link to="/" > Back to Homepage </Link>
    </>
  )
}

export default Logout