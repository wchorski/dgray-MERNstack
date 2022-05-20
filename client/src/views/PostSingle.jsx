import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import { FaRegTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios'

const PostSingle = () => {

  const [postSingle, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  // let isMounted = true;
  const controller = new AbortController();

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
      axios.delete(`/posts/${_id}`).then(res => {
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
          {/* //TODO ONLY SHOW IF YOU"RE AND EDITOR */}

          <div className='editBtns'>
            <button className='editBtn' onClick={() => toggleAreYouSure()}> <FaRegTrashAlt /> </button>
            <button className='editBtn' > <FiEdit /> </button>
          </div>
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