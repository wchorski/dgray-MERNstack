import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";

import { UserTable } from '../components/UserTable'
import Navbar from "../components/Navbar";
import UserCreate from "./UserCreate";


const Admin = () => {
    return (
      <>
        <Navbar />
        <UserCreate />
        <section>
            <h1>Admins Page</h1>
            <br />

            <button>Add a User <BsPlusSquare /></button>
            {/* <Users /> */}
            <UserTable />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
      
      </>
    )
}

export default Admin
