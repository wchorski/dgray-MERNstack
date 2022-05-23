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
import { sizeOnKeyStroke, sizeOnPageLoad } from '../helpers/textareaAutoSize'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios'

const PostEditor = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  const [postSingle, setPost] = useState({title: 'no title', author: 'no author', content: 'no content'});

  const getPost = async () => {    
    try {
      const response = await axiosPrivate.get(`/posts/${_id}`, {
        signal: controller.signal
      });

      setPost(response.data);

    } catch (err) {
      console.error(err);
      // navigate('/posts', { state: { from: location }, replace: true });
    }
  }

  const updatePost = async (values) => {

    try{
      let res = await axiosPrivate.patch(`/posts/${_id}`, JSON.stringify( { ...values}), {
        headers: { 'Content-Type': 'application/json'},
        // withCredentials: true
      })
  
      return navigate(`/posts/${_id}`, { replace: true })

    } catch (err){
      // setissLoginFail(true)
      console.error(err);
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
      console.error(err)
    }
  }

  useEffect(() => {

    getPost();
  
    setTimeout(() => {
      sizeOnPageLoad()
    }, 500)

    console.log(Cookies.get('role')) 

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])
  sizeOnKeyStroke()

 
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
       <h1>Edit this Post</h1>  
       <Formik
        enableReinitialize
        initialValues={{ 
          title: postSingle.title || 'no title', 
          author: postSingle.author || '', 
          content: postSingle.content || ''
        }}
        validationSchema={PostSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          updatePost(values)
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
                    <button className='submitPost' type='submit'>Update Post</button>
                    <button className='deleteBtn' type='button' onClick={() => toggleAreYouSure()}> <AiFillStop /> </button>
                  </div>
              </Form>

            </StyledPost>
          </>
          )}
       </Formik>
      </section>
      {isAreYouSure && (
        <StyledPopUp>
          <h3>Abandon This Edit</h3>
          <button className='editBtn' onClick={() => abandonPost(_id)}> yeah, let's ditch this edit <FaSkullCrossbones /> </button>
          <button className='editBtn' onClick={() => toggleAreYouSure()}> no, I want to keep editing<FaEject /> </button>
        </StyledPopUp>
      )}
    </>
  )
}

export default PostEditor