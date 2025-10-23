import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Summary from "./pages/Summary";
import { UserProvider } from "./context/UserContext";
import './App.css'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
