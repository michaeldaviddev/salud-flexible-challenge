import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Summary from "./pages/Summary";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/summary">Summary</Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
