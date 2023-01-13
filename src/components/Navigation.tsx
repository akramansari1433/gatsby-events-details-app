import { Link } from 'gatsby'
import React from 'react'

const Navigation = () => {
  return (
    <div className='flex flex-col navigation w-1/5 p-5 border-r-2'>
        <Link className='mb-5 text-lg' to="/modify">Modify</Link>
        <Link className='text-lg' to="/events">Events</Link>
    </div>
  )
}

export default Navigation