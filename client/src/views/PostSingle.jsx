import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import axios from '../api/axios'
import Post from '../components/Post'
import { StyledPost } from '../styles/Post.styled'


const PostSingle = () => {

  const [postSingle, setPosts] = useState([]);
  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  // let isMounted = true;
  const controller = new AbortController();

  const getPost = async () => {    

    try {

      const response = await axios.get(`/posts/${_id}`, {
        signal: controller.signal
      });

      setPosts(response.data);

    } catch (err) {

      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {

    getPost();

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <section>
      <StyledPost>
        <Post {...postSingle}/>
      </StyledPost>
    </section>
  )
}

export default PostSingle