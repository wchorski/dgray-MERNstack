import useAxios from '../hooks/useAxios'
import axios  from '../api/dadJokes'

export const Jokes = () => {

  const [joke, error, loading, refetch] = useAxios({

    axiosInstance: axios,
    method: 'GET', 
    url: '/',
    requestConfig: {
      headers: {
        'Content-Language': 'en-US'
      }
    }
  })



  return (
    <article>
      <h2>Random Dad Joke</h2>
      {loading && <p>Loading...</p>}

      {!loading && error && <p className='errMsg'> {error} </p>}
      {!loading && !error && !joke && <p>  No dad joke to display  </p>}
      
      {!loading && !error && <p>  {joke?.joke}  </p>}
      <button onClick={() => refetch()}> Get New Joke </button>
      
    </article>
  )
}

