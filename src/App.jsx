import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { MySqlMainPage } from "./pages/MySqlMain";
import { TiDbMainPage } from "./pages/TiDbMain";
import { EmptyMainPage } from "./pages/EmptyMain";
import { TiDbHostPage } from './pages/TiDbHostMain';

export function Header() {
  return (
      <div className="navbar">
          <a><Link to="mysql">MySql</Link></a>
          <a><Link to="tidb">TiDB</Link></a>
      </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<EmptyMainPage />} />
          <Route path="/mysql" element={<MySqlMainPage />} />
          <Route path="/tidb" element={<TiDbMainPage />} />
          <Route path="/tidb/:host" element={<TiDbHostPage />} />
      </Routes>
    </Router>
  )
}

export default App