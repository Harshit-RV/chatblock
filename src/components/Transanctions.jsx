import React from 'react'
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";


function Transanctions() {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-gray-300 rounded-lg shadow-lg p-8 mb-8 ">
        <h1 className="text-2xl font-bold mb-4 uppercase text-center">Past Transactions</h1>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col gap-2">
              <h2 className="text-xl font-bold mb-2">Lexidy</h2>
              <p className="text-base mb-4">Corporate structure</p>
              <p className="text-base">Cost: $XXX</p>
            </div>
      </div>
    </div>
  )
}

export default Transanctions