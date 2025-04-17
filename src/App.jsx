
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Favorites from './pages/Favorites'
import Navbar from "./components/Navbar";

function App() {
  return (
   <Router>
    <Navbar />
    <div className="pt-20">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie/:id' element={<Details />}/>
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </div>
   </Router>
  )
}

export default App
