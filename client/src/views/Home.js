import { Link } from "react-router-dom";
import { ImHome3 } from 'react-icons/im'

import Navbar from "../components/Navbar";

const Home = (props, req, res) => {

  return (
    <>
      <Navbar />
      <section>
        <h1>Welcome Home</h1>
        <br />
        <Link to="/login">login</Link>
        <Link to="/links">links</Link>
        <br />
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>
        <p><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /><ImHome3 /></p>


      </section>
    </>
  )
}

export default Home
