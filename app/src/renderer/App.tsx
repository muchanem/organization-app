import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Inbox from './pages/Inbox'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inbox />} />
      </Routes>
    </Router>
  );
}
