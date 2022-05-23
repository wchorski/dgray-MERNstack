import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaRegTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios'

const PostSingle = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL
  const controller = new AbortController();
  
  const [postSingle, setPosts] = useState([]);
  const [roleState, setroleState] = useState('');
  // let isMounted = true;

  //* CRUD ######################################
  const getPost = async () => {    

    try {

      const response = await axiosPrivate.get(`/posts/${_id}`, {
        signal: controller.signal
      });

      setPosts(response.data);

    } catch (err) {

      console.error(err);
      navigate('/posts', { state: { from: location }, replace: true });
    }
  }


  const deletePost = async (_id) => {
    try {
      axiosPrivate.delete(`/posts/${_id}`).then(res => {
        console.log('Deleted!!!', res)
        navigate('/posts')

      })
    } catch (err) {
      console.log(err)
    }
  }
  //* CRUD ######################################

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }


  useEffect(() => {

    getPost();

    setroleState(Cookies.get('role')) 

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <>
      <Navbar />
      <section>

        <StyledPost>
          <Post {...postSingle}/>

          {roleState === 'admin' || roleState === 'editor' ?  
            <div className='editBtns'>
              <button className='editBtn' onClick={() => toggleAreYouSure()}> <FaRegTrashAlt /> </button>
              <Link to={`/posts/editor/${_id}`}><FiEdit /></Link>
            </div>
          : null
          }
        </StyledPost>

      </section>


      {isAreYouSure && (
          <StyledPopUp>
            <h3>Delete This Post</h3>
            <button className='editBtn' onClick={() => deletePost(_id)}> yes I'm sure <FaSkullCrossbones /> </button>
            <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject /> </button>
          </StyledPopUp>
        )}
    </>
  )
}

export default PostSingle