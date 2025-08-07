import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-blue-700 text-white p-4 flex justify-between'>
      <Link to='/' className='font-bold text-xl'>Task Tracker</Link>
      <div className='flex gap-5'>
        <Link to='/'>Home</Link>
        <Link to='/addtask'>Add Task</Link>
        <Link to='/tasklist'>Task List</Link>
        <Link to='/tasks'>Task Item</Link>
      </div>
    </nav>
  );
};

export default Navbar;