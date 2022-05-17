import { Link } from "react-router-dom";
import { ImSpinner9 } from 'react-icons/im'

import { UserTable } from '../components/UserTable'
import Navbar from "../components/Navbar";
import Users from '../components/Users';

const Admin = () => {
    return (
      <>
        <Navbar />
        <section>
            <h1>Admins Page</h1>
            <br />
            <Users />
            {/* <UserTable /> */}
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
      
      </>
    )
}

export default Admin
