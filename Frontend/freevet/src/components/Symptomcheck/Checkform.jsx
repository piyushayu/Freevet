import { nanoid } from 'nanoid'
import React, { useState } from 'react'

const QUESTIONS_DATA = [
  {
    question: "What primary symptoms is your animal companion displaying?",
    options: [
      { key: "A", text: "Extreme tiredness, lethargy, or weakness" },
      { key: "B", text: "Frequent coughing, wheezing, or nasal discharge" },
      { key: "C", text: "Persistent vomiting, diarrhea, or refusal to eat" },
      { key: "D", text: "Limping, stiffness, or visible pain when moving" }
    ]
  },
  {
    question: "How long have these symptoms been present?",
    options: [
      { key: "A", text: "Just started today (under 24 hours)" },
      { key: "B", text: "Between 1 to 3 days" },
      { key: "C", text: "Around 4 to 7 days" },
      { key: "D", text: "Longer than a week" }
    ]
  },
  {
    question: "Is there any other noticeable change in behavior?",
    options: [
      { key: "A", text: "High body temperature / fever" },
      { key: "B", text: "Constant scratching, skin redness, or hair loss" },
      { key: "C", text: "Unusual aggression, confusion, or vocalization" },
      { key: "D", text: "No other behavioral changes noticed" }
    ]
  }
]

const RESULTS_DATA = [
  {
    id: 1,
    name: "Parvovirus Infection",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=60",
    link: "/diseases/parvo",
    desc: "A highly contagious viral disease of dogs that commonly causes acute gastrointestinal illness."
  },
  {
    id: 2,
    name: "Canine Influenza (Flu)",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b117b6297?w=300&auto=format&fit=crop&q=60",
    link: "/diseases/canine-flu",
    desc: "A contagious respiratory infection in dogs caused by specific type A influenza viruses."
  },
  {
    id: 3,
    name: "Osteoarthritis",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&auto=format&fit=crop&q=60",
    link: "/diseases/arthritis",
    desc: "A degenerative joint disease that causes pain, loss of joint mobility, and inflammation."
  }
]

const Newquestions = QUESTIONS_DATA.map((questn) => (
  { ...questn , id : nanoid() , options : questn.options.map((text) => ({text , id : nanoid()}))}
))

function Checkform() {
  
  const [currentIndex, setCurrentIndex] = useState(0)

  // 2. Stores the selected options for each question index in a key-value object.
  //    Example format: { 0: "A", 1: "C" }
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const [isSubmitted, setIsSubmitted] = useState(false)

  // --- DERIVED PROPERTIES ---
  const currentQuestion = Newquestions[currentIndex]
  const totalQuestions = Newquestions.length
  const isLastQuestion = currentIndex === totalQuestions - 1
  const isAnswered = selectedAnswers[currentIndex] !== undefined

  // --- ACTION HANDLERS ---

  // Triggers when an option button (A, B, C, D) is clicked
  const handleOptionSelect = (optionKey) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optionKey // Updates or sets the answer for the current question index
    })
  }

  // Progresses to the next question or completes the wizard
  const handleNext = () => {
    if (isLastQuestion) {
      setIsSubmitted(true) // Triggers final submission and reveals the diagnosis section below
    } else {
      setCurrentIndex((prev) => prev + 1) // Moves to the next question
    }
  }

  // Returns to the previous question
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1) // Moves back one index step
    }
  }

  // Resets the quiz wizard state to start fresh
  const handleReset = () => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setIsSubmitted(false)
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        
        <div className="flex items-center justify-between">
          <div className="px-4 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-full tracking-wider uppercase border border-neutral-700">
            symptoms finder
          </div>
          <div className="text-xs text-neutral-400 font-medium">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5 min-h-[90px] flex items-center">
          <h2 className="text-base md:text-lg font-medium text-neutral-100 leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option) => {
            // Checks if this option is currently selected for the active question
            const isSelected = selectedAnswers[currentIndex] === option.text.key
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.text.key)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left text-sm transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white text-neutral-950 font-semibold border-white shadow-lg"
                    : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:bg-neutral-800/30"
                }`}
              >
                {/* Option Letter Circle */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  isSelected
                    ? "bg-neutral-950 text-white border-neutral-950"
                    : "bg-neutral-800/50 text-neutral-400 border-neutral-700"
                }`}>
                  {option.text.key}
                </div>
                <span>{option.text.text}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Previous Button: Hidden if we are on the first question, or once submitted */}
          {currentIndex > 0 && !isSubmitted ? (
            <button
              onClick={handlePrevious}
              className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700 rounded-xl text-sm font-medium transition-all cursor-pointer active:scale-[0.98]"
            >
              previous
            </button>
          ) : (
            <div /> // Placeholder div to align the "Next/Submit" button to the right side
          )}

          {/* Next / Submit Button: Hidden after final submission */}
          {!isSubmitted && (
            <button
              onClick={handleNext}
              disabled={!isAnswered} // Disabled until an option is selected for the current question
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                isLastQuestion
                  ? "bg-white text-neutral-950 hover:bg-neutral-100 shadow-md"
                  : "bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700"
              }`}
            >
              {isLastQuestion ? "Submit" : "Next"}
            </button>
          )}
        </div>

      </div>

      {/* 2. Results Section (Becomes visible below only after form submission) */}
      {isSubmitted && (
        <div className="flex flex-col gap-4 mt-2 animate-fade-in">
          
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase">
              Possible Diagnoses
            </h3>
            <button 
              onClick={handleReset}
              className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
            >
              Start Over
            </button>
          </div>

          {/* Three disease cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESULTS_DATA.map((result) => (
              <div
                key={result.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-700 hover:shadow-xl"
              >
                {/* Disease Picture */}
                <div className="h-32 bg-neutral-950 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
                </div>

                {/* Disease content details */}
                <div className="p-4 flex flex-col gap-2 ">
                  <h4 className="font-semibold text-sm text-neutral-200">
                    {result.name}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {result.desc}
                  </p>
                  <a
                    href={result.link}
                    className="mt-2 inline-flex items-center justify-center w-full py-2 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-all"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  )
}

export default Checkform