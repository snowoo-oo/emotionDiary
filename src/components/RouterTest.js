import React from 'react'
import { Link } from 'react-router-dom'

function RouterTest() {
  return (
    <div>
      <Link to={'/'}>HOME</Link>
      <br />
      <Link to={'/diary'}>DIARY</Link>
      <br />
      <Link to={'/new'}>NEW</Link>
      <br />
      <Link to={'/edit'}>EDIT</Link>
      <br />
    </div>
  )
}

export default RouterTest