import {React, useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaUserAlt } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { MdPassword } from 'react-icons/md'

// import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios'

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001,
}


const CreateAdminSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').max(50, 'Too Long!').required('Required'),
  username: Yup.string().min(3).max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
  passwordConf: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
  
  admin: Yup.boolean(),
  editor: Yup.boolean(),
  user: Yup.boolean(),
});

const UserCreate = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  const [userState, setuserState] = useState({email: '', username: '', password: '', roles: []});


  const registerUser = async (values) => {

    let convertData = {
      email: values.email,
      username: values.username,
      password: values.password,
      roles: {
        "User": 0,
        "Editor": 0,
        "Admin": 0
      }
    }
    values.admin  ? convertData.roles.Admin = ROLES.Admin   : convertData.roles.Admin = 0;
    values.editor ? convertData.roles.Editor = ROLES.Editor : convertData.roles.Editor = 0;
    values.user   ? convertData.roles.User = ROLES.User     : convertData.roles.User = 0;

    console.log(convertData);

    try{
      const response = await axios.post('/register',
        JSON.stringify({ ...convertData }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));


    } catch (err){
      console.log(err);
    }
  }

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }


  return (
    <>
      <section>
       <h2>Create New User</h2>  
       <Formik
        enableReinitialize
        initialValues={{ 
          email: '', 
          username: '', 
          password: '', 
          passwordConf:'', 
          admin: userState.roles.Admin === ROLES.Admin ? true : false  || false,
          editor: userState.roles.Editor === ROLES.Editor ? true : false || false,
          user: userState.roles.User === ROLES.User ? true : false || false,
        }}
        validationSchema={CreateAdminSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          registerUser(values)
          actions.resetForm()
        }}
       >
         {({ errors, touched, values }) => (
          <>
            <StyledPost>

              <Form>
                <div className='form-item'>
                <HiOutlineMail/>
                  <Field name="email" type="text" placeholder="email..." className='author'/>
                  {errors.email && touched.email ? (
                    <span className='formErr'>{errors.email}</span>
                    ) : null}
                </div>

                <div className='form-item'>
                  <FaUserAlt />
                  <Field name="username" type="text" placeholder="username..." className='author'/>
                  {errors.username && touched.username ? (
                    <span className='formErr'>{errors.username}</span>
                    ) : null}
                </div>

                <div className='form-item'>
                  <MdPassword />
                  <Field name="password" type="password" placeholder="password..." className='author'/>
                  {errors.password && touched.password ? (
                    <span className='formErr'>{errors.password}</span>
                    ) : null}
                </div>
                <div className='form-item'>
                <MdPassword />
                  <Field name="passwordConf" type="password" placeholder="confirm password..." className='author'/>
                  {errors.passwordConf && touched.passwordConf ? (
                    <span className='formErr'>{errors.passwordConf}</span>
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
                    <button className='submitPost' type='submit'>Create User</button>
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

export default UserCreate