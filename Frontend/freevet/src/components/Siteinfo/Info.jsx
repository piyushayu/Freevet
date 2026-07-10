import React, { useState } from 'react'
import About from './About'
import Contact from './Contact'

function Info() {

    const [isOpen , setIsOpen] = useState(false)

    function Openform(){
      setIsOpen(true)
    }

   function Closeform (){
      setIsOpen(false)
   }

  return (
    <div>
        <About openform = {Openform}
        open = {isOpen}
        />
        <Contact open={isOpen}
        closefunction = {Closeform}
        />
    </div>
  )
}

export default Info