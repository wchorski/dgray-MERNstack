import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsPlusSquare} from 'react-icons/bs'

import { StyledPostsList } from '../styles/PostsList.styled'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

// import axios from '../api/axios'
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const Posts = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [postsArray, setPosts] = useState([]);
  const [roleState, setroleState] = useState('');

  // let isMounted = true;
  const controller = new AbortController();

  const getPosts = async () => {    
    try {

      const response = await axiosPrivate.get('/posts', {
        signal: controller.signal
      });

      setPosts(response.data);

    } catch (err) {

      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  const goToPostSingle = (_id) => {
    console.log('take me there: ' + _id);
  }

  useEffect(() => {

    getPosts();
    setroleState(Cookies.get('role')) 

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <>
      <Navbar />
      <section className='posts'>
        <h1>Posts</h1> 
        {roleState === 'admin' || roleState === 'editor'  
          ? <Link to={`/posts/create`} className='createPost'><BsPlusSquare /> <span>Create Post</span></Link>
          : null
        }

        {/* //TODO this doesn't actually lock out info, just makes it convienent to read */}
        <StyledPostsList>
          {postsArray.slice().reverse().map((post) => (
            <Link to={`/posts/${post._id}`}>
              <article className='excerpt' key={post._id} onClick={goToPostSingle(post._id)}>

                <Post {...post}/>
                <Link to={`/posts/${post._id}`} className='readmore'> Read More... </Link> 


              </article>
            </Link>
          ))}
        </StyledPostsList>
      </section>
    </>
  )
}

export default Posts