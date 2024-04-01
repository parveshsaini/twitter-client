import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Profile/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App