import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Player = () => {

  const {id}=useParams();

  const navigate=useNavigate();


  const [apiData,setApiData]=useState({
    name:'',
    key:'',
    published_at:'',
    typeof:''
  })


  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjJmOTc3MmE2NzYxZjkzYjk2YmQzNTA4YzQwZDIwMCIsIm5iZiI6MTc4NjYzNjY0MS44MTQwMDAxLCJzdWIiOiI2YTdkZTk2MTFlNzdiYjhkNDhjN2E2ZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bDYsPM2atXZajZKKgb81pSdHObrez_MQ50UAc8EWI7A'
  }
};
 useEffect(()=>{
  
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

 },[])
  return (
    <div className='player'>

      <img  src={back_arrow_icon} onClick={()=>{
        navigate('/')
      }}/>

      <iframe width='90%' height='90%'
              src={  `https://www.youtube.com/embed/${apiData.key}`  }
              title='trailer' frameBorder='0' allowFullScreen>
    </iframe>

    <div className="player-info">
      <p>{apiData.published_at?.slice(0,10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type}</p>
    </div>


    </div>

  )
}

export default Player