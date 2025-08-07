import { Outlet } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;