import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="flex justify-between pt-10">
          <div className="text-4xl font-bold text-white">Logo</div>
          <ul className="flex gap-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar
