import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ImHome3 } from 'react-icons/im'

import Navbar from "../components/Navbar";
import { Jokes } from "../components/Jokes";

const Home = (props, req, res) => {

  const [homies, setHomies] = useState([])


  useEffect(() => {

    let homieArray = []

    for(let i=0; i<5000; i++){(
      homieArray.push(<ImHome3 />)
    )}

    setHomies(homieArray)


  }, [])

  return (
    <>
      <Navbar />
      <section>
        <h1>Welcome Home</h1>
        <p><Link to='/login'>Login</Link> or <Link to='/signup'>Signup</Link> to view posts</p>
        <br />
        <Jokes />
        <br />

        <p className="homies">
          {homies}
        </p>


      </section>
    </>
  )
}

export default Home
