import {React} from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { MdDateRange } from 'react-icons/md'
import { format } from 'date-fns'

const formatDate = (inputDate) => {
  try{
    return format(new Date( inputDate ), 'MM/dd/yyyy')
  } catch (err) {
    console.log(err)
  }
}


const Post = (props) => {

  // const [users, setUsers] = useState([]);
  // const axiosPrivate = useAxiosPrivate();

  // const {title, author, content} = props

  return (
    <>
      <h3 className='title'>{props.title}</h3> <br />
      <span className='author'><BsFillPencilFill /> {props.author}</span> <br/>
      <span className='author'><MdDateRange /> {formatDate(props.dateCreated)}</span> <br />

      <p className="content">{props.content}</p>
    </>
  )
}

export default Post