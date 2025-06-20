
import './App.css';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Dashboard />
    </div>
  );
}

export default App;
