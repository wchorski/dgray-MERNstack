import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import {BsPlusSquare} from 'react-icons/bs'

import { StyledPostsList } from '../styles/PostsList.styled'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

import axios from '../api/axios'
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const Posts = () => {

  const [postsArray, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {

    getPosts();

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <>
      <Navbar />
      <section>
        <h1>Posts</h1> <Link to={`/posts/create`} className='createPost'><BsPlusSquare /> <span>Create Post</span></Link>
        {/* //TODO this doesn't actually lock out info, just makes it convienent to read */}
        <span><i>* Login to read full posts</i></span>
        <StyledPostsList>
          {postsArray.slice().reverse().map((post) => (
            <article className='excerpt' key={post._id}>

              <Post {...post}/>
              <Link to={`/posts/${post._id}`} className='readmore'> Read More... </Link> 


            </article>
          ))}
        </StyledPostsList>
      </section>
    </>
  )
}

export default Posts