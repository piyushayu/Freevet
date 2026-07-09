import React from 'react'
import Header from '../Header'
import Wideinfo from './Wideinfo'
import { nanoid } from 'nanoid'

const Particulardisease = [
    {
        name : "jdkfkdfdfd",
        context : "also known as",
        overview : [
        "jdfdfad;fjd",
        " jkdkjfjdfjd",
        ] ,
        Symptoms : [
            "djkfjdfd",
            "kfdkfkldfj"
        ] , 
        Medicine : [
            {
                name : "kdkfiie",
                sideeffect : [
                    "jkfjkjjfeoieiinncie",
                    "jlkdfjeiiehenen"
                ]
            }
        ] ,
        Treatment : [
          "ioeiorei",
          "pierpeinc",
          "pewioruep"
        ]
    }
]

const Idofoverview = Particulardisease.map((dis) => ({
     ...dis,
     overview: dis.overview.map((text) => ({ text, id: nanoid() })),
     Symptoms: dis.Symptoms.map((text) => ({ text, id: nanoid() })),
     Medicine: dis.Medicine.map((med) => ({
          ...med,
          id: nanoid(),
          sideeffect: med.sideeffect.map((effect) => ({ text: effect, id: nanoid() }))
     })) ,
     Treatment : dis.Treatment.map((text) => ({text , id : nanoid()}))
}))

function Explain() {

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-violet-500/30 overflow-hidden flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
        <Header/>
        <Wideinfo 
          name={Idofoverview[0]?.name}
          context={Idofoverview[0]?.context}
          overview={Idofoverview[0]?.overview || []}
          symptoms={Idofoverview[0]?.Symptoms|| []}
          medicine={Idofoverview[0]?.Medicine || []}
          treatment={Idofoverview[0]?.Treatment || []}
        />
      </div>
    </div>
  )
}

export default Explain