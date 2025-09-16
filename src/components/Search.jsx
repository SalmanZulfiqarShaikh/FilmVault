import React from 'react'
import '../index.css'


function Search({userSearch,setuserSearch}) {
  return (
    <div className='search'>
       <div>
           <img src="search.png" alt="search" />

           <input type="text"
           
           value={userSearch}placeholder='Find your next binge'
           onChange={(e)=> setuserSearch(e.target.value)}
           />
       </div>
    </div>
  )
}

export default Search