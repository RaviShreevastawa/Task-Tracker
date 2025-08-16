import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const user = useSelector((state) => state.auth.currentUser)
  return (
    <>
      <h1 className='text-3xl font-bold text-center mt-10'>Welcome to Task Tracker</h1>
      <h2>{user.fullname}</h2>
      <p className="text-center text-xl mt-10">Welcome to the Task Tracker Environment you just visit the navigation bar and manage your tasks.</p>
    </>
  )
}

export default Home
