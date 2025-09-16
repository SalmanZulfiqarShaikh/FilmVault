import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import Search from './components/Search'

function App() {

     const [userSearch, setuserSearch] = useState("")
     const [ErrorMessage,setErrorMessage] = useState("");
     const [movies,setMovies] = useState([]);
     const [IsLoading,setIsLoading] = useState(false);
     const URL = "https://api.themoviedb.org/3";

     const API_KEY = import.meta.env.VITE_TMDB_API;

     const API_OPTIONS = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
        }
     }

     const fetchContent = async ()=> {
      setIsLoading(true);
      setErrorMessage("");
        try {
          const endpoint = `${URL}/discover/movie?sort_by=popularity.desc`

          const response = await fetch(endpoint, API_OPTIONS)


          if (!response) {
              throw new Error(`Failed to fetch Content`);
          }

         const data = await response.json();
         console.log(data);


         if (data.response === false) {
           setErrorMessage(data.Error || `Failed to fetch Content`);
           setMovies([]);
           return;
         }


         setMovies(data.results || []);
         

        } catch (error) {
          console.error(`Error fetching Content: ${error}`);
          setErrorMessage("Error Fetching Content. Please Try Again. Thanks for Patience")
          
        }
     }

     useEffect (()=>{
           fetchContent();
     },[])

  return (
    <>
     <main>
        <div className='pattern'/>

        <div className='wrapper'>
          <header >

            <img src="./hero.png" alt="Hero Banner" />
            <h1>Your <span className='text-gradient'>Go-To Hub</span> for Films and Shows</h1>
          <Search search={userSearch} setSearch={setuserSearch}/>
          </header>

           <section className='all-movies'>
              <h2>All Content:</h2>
              {ErrorMessage && <p className='text-red-700'>{ErrorMessage} </p>}
           </section>
          

        </div>

     </main>
    </>
  )
}

export default App
