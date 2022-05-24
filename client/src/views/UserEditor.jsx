import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useFormik, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaSkullCrossbones, FaEject, FaUserAlt } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { GrUserSettings } from 'react-icons/gr'
import { AiFillStop } from 'react-icons/ai'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios'
import Users from '../components/Users'

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001,
}

const UserEditor = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  const [postSingle, setPost] = useState({title: 'no title', author: 'no author', content: 'no content'});
  const [userState, setuserState] = useState({username: 'no username...', password: 'no password...', roles: []});

  const getUser = async () => {    
    try {
      const response = await axiosPrivate.get(`/users/${_id}`, {
        signal: controller.signal
      });

      setuserState(response.data);
      console.log(userState.roles)

    } catch (err) {
      console.error(err);
      // navigate('/posts', { state: { from: location }, replace: true });
    }
  }

  const updateUser = async (values) => {

    
    let convertData = {
      username: values.username,
      roles: {
        "User": 0,
        "Editor": 0,
        "Admin": 0
      }
    }
    values.admin  ? convertData.roles.Admin = ROLES.Admin   : convertData.roles.Admin = 0;
    values.editor ? convertData.roles.Editor = ROLES.Editor : convertData.roles.Editor = 0;
    values.user   ? convertData.roles.User = ROLES.User     : convertData.roles.User = 0;

    try{
      let res = await axiosPrivate.patch(`/users/${_id}`, JSON.stringify( { ...convertData}), {
        headers: { 'Content-Type': 'application/json'},
        // withCredentials: true
      })

      // getUser()
      return navigate(`/users/${_id}`, { replace: true })
    } catch (err){
      // setissLoginFail(true)
      console.error(err);
    }
  }

  useEffect(() => {

    getUser();

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  const UserSchema = Yup.object().shape({

    username: Yup.string()
      .required('* Username name required!').min(3, '* Username too short!').max(10, '* Username too long!'),
    // admin: Yup.boolean(),
    // editor: Yup.boolean(),
    // user: Yup.boolean(),
    // TODO how to validate object?
    // roles: Yup.object()
    //   .required('* 1 role is required!')
  })

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }

  return (
    <>
      <section>
       <h2>Edit this User</h2>  
       <Formik
        enableReinitialize
        initialValues={{ 
          username: userState.username || 'undefined', 
          admin: userState.roles.Admin === ROLES.Admin ? true : false  || false,
          editor: userState.roles.Editor === ROLES.Editor ? true : false || false,
          user: userState.roles.User === ROLES.User ? true : false || false,
        }}
        // validationSchema={UserSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          updateUser(values)
          actions.resetForm()
        }}
       >
         {({ errors, touched, values }) => (
          <>
            <StyledPost>

              <Form>
                <p><HiOutlineMail/> {userState.email}</p>

                <div className='form-item'>
                  <FaUserAlt />
                  <Field name="username" type="text" placeholder="username..." className='author'/>
                  {errors.username && touched.username ? (
                    <span className='formErr'>{errors.username}</span>
                    ) : null}
                </div>

                <div className='form-item'>
                  <Field type="checkbox" name="admin"/> Admin <br/>
                  <Field type="checkbox" name="editor" /> Editor <br/> 
                  <Field type="checkbox" name="user" /> User <br/> 
                  {/* <Field type="checkbox" name="checked" value="User" /> User <br/> */}
                  {errors.roles && touched.roles ? (
                    <span className='formErr'>{errors.roles}</span>
                    ) : null}
                </div>
                
                  <div className='editBtns'>
                    <button className='submitPost' type='submit'>Update User</button>
                    <button className='deleteBtn' type='button' onClick={() => toggleAreYouSure()}> <FaRegTrashAlt /> </button>
                  </div>
              </Form>

            </StyledPost>
          </>
          )}
       </Formik>
      </section>
    </>
  )
}

export default UserEditor