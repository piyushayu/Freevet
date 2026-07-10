import React, { useState } from 'react'
import Profile from './Profile'
import EditProfile from './EditProfile'

function Profilecomp() {

    const [isedit, setIsedit] = useState(false)

    function onEditClick (){
    setIsedit(true)
  }

  function onCancelClick() {
    setIsedit(false)
  }

  return (
    <div>
      <Profile editfunctn={onEditClick} edit={isedit} />
      <EditProfile edit={isedit} cancelfunctn={onCancelClick} />
    </div>
  )
}

export default Profilecomp