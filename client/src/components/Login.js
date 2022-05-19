import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import { useInput } from '../hooks/useInput';
import { useToggle } from '../hooks/useToggle';

import axios from '../api/axios';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttributeObj] =  useInput('user', '') //useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false)

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
      setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('/auth',
          JSON.stringify({ user, pwd }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        resetUser() // setUser('');
        setPwd('');
        navigate(from, { replace: true });
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current.focus();
      }
    }

    // const togglePersist = () => {
    //   setPersist(prev => !prev)
    // }

    // useEffect(() => {
    //   localStorage.setItem('persist', persist)
    // }, [persist])

    return (


      <div className='content'>
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>


            <form onSubmit={handleSubmit} className='popUp'>

                <label htmlFor="username"><FaUserAlt /></label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  {...userAttributeObj}
                  required
                  placeholder='username...'
                />

                <label htmlFor="password"><MdPassword /></label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  placeholder='password...'
                />


                <button>Login</button>
                <div className='persistCheck'>
                  <input 
                    type='checkbox'
                    id='persist'
                    onChange={toggleCheck}
                    checked={check}
                  />
                  <label htmlFor='persist'> Keep me Logged into this computer </label>
                </div>
            </form>


            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/signup">Sign Up</Link>
                </span>
                <br />
                <Link to="/">Home</Link>
            </p>
        </section>
      </div>

    )
}

export default Login
