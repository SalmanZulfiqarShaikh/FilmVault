import { useState } from 'react'
import './index.css'
import './App.css'
import Search from './components/Search'

function App() {

     const [userSearch, setuserSearch] = useState("")

  return (
    <>
     <main>
        <div className='pattern'/>

        <div className='wrapper'>
          <header >

            <img src="./hero.png" alt="Hero Banner" />
            <h1>Your <span className='text-gradient'>Go-To Hub</span> for Films and Shows</h1>
          </header>

          <Search search={userSearch} setSearch={setuserSearch}/>

          

        </div>

     </main>
    </>
  )
}

export default App
