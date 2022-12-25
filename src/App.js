import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthCard } from './Components/AuthCard';
import ForgotPassword from './Components/ForgotPassword';
import { NotFoundPage } from './Components/NotFoundPage';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <div className="App">
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthCard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:_id/:token" element={<ResetPassword />} />
          <Route path="/login" element={<Navigate replace to="/" />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
