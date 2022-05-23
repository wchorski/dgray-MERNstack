import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useFormik, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillStop } from 'react-icons/ai'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios'
import Users from './Users'

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
      const response = await axiosPrivate.get(`/users/${'62866eee1aa68368f9f5a764'}`, {
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
    try{
      let res = await axiosPrivate.patch(`/users/${_id}`, JSON.stringify( { ...values}), {
        headers: { 'Content-Type': 'application/json'},
        // withCredentials: true
      })
      return navigate(`/users/${_id}`, { replace: true })
    } catch (err){
      // setissLoginFail(true)
      console.error(err);
    }
  }


  const UserSchema = Yup.object().shape({

    username: Yup.string()
      .required('* Username name required!').min(3, '* Username too short!').max(10, '* Username too long!'),
    roles: Yup.object()
      .required('* 1 role is required!')
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
          // chboxRoles: {
          //   admin: true,
          //   editor: true,
          // },
        }}
        validationSchema={UserSchema}
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

                <div className='form-item'>
                  <BsFillPencilFill />
                  <Field name="username" type="text" placeholder="username..." className='author'/>
                  {errors.username && touched.username ? (
                    <span className='formErr'>{errors.username}</span>
                    ) : null}
                </div>

                <div className='form-item'>
                  <Field type="checkbox" name="admin"/> Admin <br/>
                  <Field type="checkbox" name="editor" /> Editor <br/> 
                  {/* <Field type="checkbox" name="checked" value="User" /> User <br/> */}
                  {errors.content && touched.content ? (
                    <span className='formErr'>{errors.content}</span>
                    ) : null}
                </div>
                
                  <div className='editBtns'>
                    <button className='submitPost' type='submit'>Update Post</button>
                    <button className='deleteBtn' type='button' onClick={() => toggleAreYouSure()}> <AiFillStop /> </button>
                    <button type='button' onClick={() => getUser()}> get user </button>
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