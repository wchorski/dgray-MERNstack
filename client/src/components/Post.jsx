import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { BsFillPencilFill } from 'react-icons/bs'
import axios from '../api/axios'

import { StyledPost } from '../styles/Post.styled'


const Post = (props) => {

  const [users, setUsers] = useState([]);
  // const axiosPrivate = useAxiosPrivate();

  const {title, author, content} = props

  return (
    <>
      <h3>{props.title}</h3>
      <span className='author'><BsFillPencilFill /> {props.author}</span>
      <p>{props.content}</p>
    </>
  )
}

export default Post