import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Chat from "./components/Chat";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Profile/>} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App