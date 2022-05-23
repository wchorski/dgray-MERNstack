import {React, useState } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useFormik, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { BsFillPencilFill } from 'react-icons/bs'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled';

import axios  from '../api/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// import Navbar from '../components/Navbar'

const PostCreate = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/posts";
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  const createPost = async (values) => {

    console.log('new post posted');
    try{

      let res = await axiosPrivate.post('/posts', JSON.stringify( { ...values}), {
        headers: { 'Content-Type': 'application/json'},
        // withCredentials: true
      })
      // console.log(JSON.stringify(res?.data))
      // const accessToken = res?.data?.accessToken
      // setAuth({...creds, accessToken})

      // setissLoginFail(false)
      return navigate(from, { replace: true })

    } catch (err){
      // setissLoginFail(true)
      console.log(err);
    }
  }

  const abandonPost = async (_id) => {
    try {
      navigate('/posts')
      // axios.delete(`/posts/${_id}`).then(res => {
        //   console.log('Deleted!!!', res)
        //   navigate('/posts')

      // })
    } catch (err) {
      console.log(err)
    }
  }

  const updatePost = async () => {}


  const PostSchema = Yup.object().shape({

    title: Yup.string()
      .required('* Title required!')
      .min(1, '* Your Title too short!')
      .max(20, '* Your Title too long!'),
    // TODO grab author from logged in user
    author: Yup.string().required('* Your author name required!').min(3, '* Your author name too short!').max(10, '* Your author name too long!'),
    content: Yup.string().min(3, '* Your contentis too short!').max(4000, '* Your content is too long!'),

  })

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }

  return (
    <>
      <section>
       <h1>Create a New Post</h1>  
       <Formik
        initialValues={{ title: "", author: "", content: ""}}
        validationSchema={PostSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          createPost(values)
          actions.resetForm()
        }}
       >
         {({ errors, touched }) => (
          <>
            <StyledPost>

              <Form>
                <div className='form-item'>
                  <Field name="title" type="text" placeholder="title..." className='title'/>
                  {errors.title && touched.title ? (
                    <span className='formErr'>{errors.title}</span>
                    ) : null}
                </div>

                <div className='form-item'>
                  <BsFillPencilFill />
                  <Field name="author" type="text" placeholder="author..." className='author'/>
                  {errors.author && touched.author ? (
                    <span className='formErr'>{errors.author}</span>
                    ) : null}
                </div>

                <div className='form-item'>
                  <Field name="content" as="textarea" placeholder="content..." className='content'/>
                  {errors.content && touched.content ? (
                    <span className='formErr'>{errors.content}</span>
                    ) : null}
                </div>

                <div className='editBtns'>
                  <button className='submitPost' type='submit'>Create Post</button>
                  <button className='deleteBtn' onClick={() => toggleAreYouSure()}> <FaRegTrashAlt /> </button>
                </div>
              </Form>

            </StyledPost>
          </>
          )}
       </Formik>
      </section>
      {isAreYouSure && (
        <StyledPopUp>
          <h3>Delete This Post</h3>
          <button className='editBtn' onClick={() => abandonPost(_id)}> yes I'm sure <FaSkullCrossbones /> </button>
          <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject /> </button>
        </StyledPopUp>
      )}
    </>
  )
}

export default PostCreate