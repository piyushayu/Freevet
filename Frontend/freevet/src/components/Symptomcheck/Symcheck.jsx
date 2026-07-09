import React from 'react'
import Header from '../Header'
import Checkform from './Checkform'

function Symcheck() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-violet-500/30 overflow-hidden flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
        <Header />
        <Checkform />
      </div>
    </div>
  )
}

export default Symcheck