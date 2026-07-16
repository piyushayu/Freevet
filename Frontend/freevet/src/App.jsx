import React from 'react';
import Header from './components/Header';
import Profilecomp from './components/Profile/Profilecomp';

function App() {
  return (
    <div className='bg-gray-600 min-h-screen flex flex-col gap-7'>
      <Header className='mt-4'/>
      {/* <Problems/> */}
      {/* <Explain/> */}
    {/* <Symcheck/> */}
    {/* <Option1Parent/> */}
    {/* <About/> */}
    {/* <Info/> */}
    {/* <Profile/> */}
    <Profilecomp/>
    </div>
  )
}



export default App;
