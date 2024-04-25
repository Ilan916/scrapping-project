import Accebility from "./components/Accebility";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homes from './pages/Homes'
import DashBoardPage from "./pages/DashBoardPage";
import NavBar from './components/NavBar/NavBar';
import './index.css'

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path="/" element={<Homes/>}/>
          <Route path="accebility" element={<Accebility/>}/>
          <Route path="dashboard" element={<DashBoardPage />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
