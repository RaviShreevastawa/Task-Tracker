import { Outlet } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;