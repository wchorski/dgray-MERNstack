import { Link } from "react-router-dom";
import { ImSpinner9 } from 'react-icons/im'
import { BsPlusSquare } from "react-icons/bs";

import { UserTable } from '../components/UserTable'
import Navbar from "../components/Navbar";
import Users from '../components/Users';
import UserEditor from "../components/UserEditor";



const Admin = () => {
    return (
      <>
        <Navbar />
        <section>
            <h1>Admins Page</h1>
            <br />

            <UserEditor />

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
