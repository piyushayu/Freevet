import React from 'react'
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
    <div className="w-full flex flex-col gap-6">
      <Wideinfo 
        name={Idofoverview[0]?.name}
        context={Idofoverview[0]?.context}
        overview={Idofoverview[0]?.overview || []}
        symptoms={Idofoverview[0]?.Symptoms|| []}
        medicine={Idofoverview[0]?.Medicine || []}
        treatment={Idofoverview[0]?.Treatment || []}
      />
    </div>
  )
}

export default Explain