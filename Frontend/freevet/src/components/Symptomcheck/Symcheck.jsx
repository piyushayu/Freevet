import React, { useState } from 'react'
import { QuizForm , ResultSection , Newquestions } from './Quizandresult'

function Symcheck() {

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allanswer, setAllanswer] = useState({})

  const totalQuestions = Newquestions.length
  const isLastQuestion = currentIndex === totalQuestions - 1

  function handleSelectOption(key) {
    setAllanswer({
      ...allanswer,
      [currentIndex]: key
    })
  }

  function handleNext() {
    if (isLastQuestion) {
      setIsSubmitted(true)  
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  
  function handleReset() {
    setIsSubmitted(false)   
    setCurrentIndex(0)     
    setAllanswer({})        
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">

      {!isSubmitted
        ? (
          <QuizForm
            currentIndex={currentIndex}
            allanswer={allanswer}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
        : (
          <ResultSection
            onReset={handleReset}
          />
        )
      }

    </div>
  )
}


export default Symcheck