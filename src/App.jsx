import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
