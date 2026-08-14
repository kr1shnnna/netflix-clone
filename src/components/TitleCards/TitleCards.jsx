import './TitleCards.css'
// import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {

  const [apiData,setApiData]=useState([]);

 const cardsRef=useRef();

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjJmOTc3MmE2NzYxZjkzYjk2YmQzNTA4YzQwZDIwMCIsIm5iZiI6MTc4NjYzNjY0MS44MTQwMDAxLCJzdWIiOiI2YTdkZTk2MTFlNzdiYjhkNDhjN2E2ZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bDYsPM2atXZajZKKgb81pSdHObrez_MQ50UAc8EWI7A'
  }
};





 const handleWheel=(e)=>{
  e.preventDefault();
  cardsRef.current.scrollLeft+=e.deltaY;
  
 }

 useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

cardsRef.current.addEventListener('wheel',handleWheel);
 },[])

  return (
    <div className='title-cards'>

      <h2>{title?title:'Popular on Netflix'}</h2>
      
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`}className="card" key={index}>
              
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} />
              <p>{card.original_title}</p>

            </Link>


          })}
        </div>
      </div>
  )
}

export default TitleCards