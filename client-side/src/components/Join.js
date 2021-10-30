import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleRoomChange = (event) => {
    setRoom(event.target.value)
  }

  const handleSignInButton = (event) => {
    if (!name || !room) {
      event.preventDefault()
    }
  }

  return (
    <div>
      <div>
        <h1>Join</h1>
        <div><input placeholder="Name" type="text" onChange={handleNameChange} /></div>
        <div><input placeholder="Room" type="text" onChange={handleRoomChange} /></div>
        <Link onClick={handleSignInButton} to={`/chat?name=${name}&room=${room}`}>
          <button type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;