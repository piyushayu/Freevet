import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import { getSymptomQuestions } from '@/lib/database'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import Diseasecard from '../Allproblems/Diseasecard'


function QuizForm({ currentIndex, allanswer, onSelectOption, onNext, onPrevious , optiondata }) {
  
  const totalQuestions = optiondata.length
  const isAnswered = allanswer[currentIndex] !== undefined
  const isLastQuestion = currentIndex === totalQuestions - 1
 
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div className="px-4 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-full tracking-wider uppercase border border-neutral-700">
          symptoms finder
        </div>
        <div className="text-xs text-neutral-400 font-medium">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
      </div>

      <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5 min-h-22.5 flex items-center">
        <h2 className="text-base md:text-lg font-medium text-neutral-100 leading-relaxed">
          {optiondata[currentIndex].question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {optiondata[currentIndex].symptom_options.map((option) => {
          const isSelected = allanswer[currentIndex] === option.key
          return (
            <button
              key={option.key}
              onClick={() => onSelectOption(option.key)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-white text-neutral-950 font-semibold border-white shadow-lg"
                  : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:bg-neutral-800/30"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                isSelected
                  ? "bg-neutral-950 text-white border-neutral-950"
                  : "bg-neutral-800/50 text-neutral-400 border-neutral-700"
              }`}>
                {option.key}
              </div>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4">
      
        <button
          className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700 rounded-xl text-sm font-medium transition-all cursor-pointer active:scale-[0.98]"
          onClick={onPrevious}
        >
          previous
        </button>

        <button
          className="px-6 py-2.5 bg-white text-neutral-950 rounded-xl text-sm font-semibold shadow-md cursor-pointer hover:bg-neutral-100 transition-all active:scale-[0.98]"
          onClick={onNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? "submit" : "next"}
        </button>
      </div>

    </div>
  )
}

function ResultSection({ onReset, matchedDiseases = [] }) {
  return (
    <div className="flex flex-col gap-8 mt-2">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 mb-6">
        <h3 className="text-xl md:text-2xl font-black text-neutral-200 tracking-wider uppercase text-center sm:text-left">
          Possible Diseases
        </h3>
        <HoverBorderGradient
          containerClassName="rounded-xl shrink-0"
          as="button"
          onClick={onReset}
          className="dark:bg-black bg-white text-black dark:text-white flex items-center px-4 py-2.5 text-xs font-semibold"
        >
          Test again
        </HoverBorderGradient>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-6 w-full min-h-100">
        {matchedDiseases.map((result) => {
          const animalName = result.animals?.name || 'Dog';
          const link = `/diseases/${encodeURIComponent(animalName)}/explain/${encodeURIComponent(result.name)}`;
          
          return (
            <div key={result.id || result.name} className="w-full max-w-85 flex justify-center">
              <Diseasecard
                Name={result.name}
                context={result.context}
                Info={result.symptoms || []}
                severity={result.Severity || result.severity}
                link={link}
              />
            </div>
          )
        })}
      </div>

    </div>
  )
}

 export { QuizForm, ResultSection }


