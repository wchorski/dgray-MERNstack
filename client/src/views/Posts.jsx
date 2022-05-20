import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import axios from '../api/axios'
import Post from '../components/Post'
import { StyledPostsList } from '../styles/PostsList.styled'


const Posts = () => {

  const [postsArray, setPosts] = useState([]);
  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // let isMounted = true;
  const controller = new AbortController();

  const getPosts = async () => {    
    try {

      const response = await axios.get('/posts', {
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
    <section>
      <h1>Posts</h1>
      <StyledPostsList>
        {postsArray.map((post, i) => (
          <article className='excerpt' key={i}>

            <Post {...post}/>
            <Link to={`/posts/${post._id}`} className='readmore'> Read More... </Link> 


          </article>
        ))}
      </StyledPostsList>
    </section>
  )
}

export default Posts