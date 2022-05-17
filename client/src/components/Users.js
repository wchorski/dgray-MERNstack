import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {



  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  let isMounted = true;
  const controller = new AbortController();


  const getUsers = async () => {

    
    try {
      console.log('--- Users - getUsers.js');
      const response = await axiosPrivate.get('/users', {
        signal: controller.signal
      });
      console.log(response.data);

      isMounted && setUsers(response.data);

    } catch (err) {
      console.log('---getUsers failed');
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    console.log('---users.js -- useEffect');


    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.username}</li>)}
          </ul>
        ) 
        : <p>No users to display</p>
      }

    </article>
  );
};

export default Users;
