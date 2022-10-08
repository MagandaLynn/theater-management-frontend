
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CheckIn from './pages/CheckIn';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/checkin' element={<CheckIn/>} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>


    </div>
  );
}

export default App;
