import React from 'react'
import Diseasecard from './Diseasecard'
import { useState } from 'react'
import { useEffect , useId} from 'react'
import Page from '../Diseases/page'
import { MdWarning } from 'react-icons/md'
import { useOutlet, useParams } from 'react-router-dom'
import { getDiseasesByAnimal } from '@/lib/database'


function Problems() {

  const outlet = useOutlet()
  const { animaltype } = useParams()          
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [warn, setWarn] = useState(false)
  const id = useId()

  useEffect(() => {
    async function fetchDiseases() {
      const { data, error } = await getDiseasesByAnimal(animaltype)
      if (data) {
        setProblems(data)
      } else {
        console.error("Error fetching diseases:", error)
      }
      setLoading(false)
    }
    fetchDiseases()

    const seen = localStorage.getItem("disclaimer")
    if (!seen) {
      setWarn(true)
      setTimeout(() => {
        setWarn(false)
        localStorage.setItem("disclaimer", "true")
      }, 4000)
    }
  }, [animaltype]) 


  if (outlet) {
    return outlet
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5 justify-center '>
      <div className='flex flex-row flex-wrap justify-center gap-6 w-full'>
        {problems.map((problem) => (
          <div key={problem.name} className='w-full max-w-sm flex justify-center'>
            <Diseasecard
              Name={problem.name}
              Info={problem.symptoms || []}
              id={id}
            />
          </div>
        ))}
      </div>
      <div className='relative flex justify-center items-center w-full px-5'>
        <Page/>
        <div className='absolute right-4 flex flex-col items-end '>
          {warn && <div className='h-25 w-70 bg-gray-600 text-black overflow-hidden p-2 rounded shadow mb-1'>
            <p className="text-xs tracking-wide"> All information on this site is for 
             educational purposes only. 
            Always consult a licensed veterinarian 
            before giving any medicine to your animal.</p>
          </div>}
          <MdWarning onClick={() => setWarn(!warn)} size={24} color="red" className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}




export default Problems
