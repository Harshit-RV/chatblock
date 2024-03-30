import React from 'react'
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";


function Transanctions() {

      return (
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="max-w-4xl w-full bg-gray-300 rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-2xl font-bold mb-4 uppercase text-center">Past Transactions</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="lg:col-span-2">
                <div className="grid grid-rows-2 gap-2">
    
          <div className="bg-gray-200 rounded-md h-1 max-w-4xl">
          <div className="flex items-center">
            <div className="flex-1">
              <input type="text" placeholder="Search transactions" className="w-full bg-gray-200 focus:outline-none focus:bg-white py-2 pl-4 pr-2 rounded-md" />
            </div>
          </div>
        </div>
                  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <h2 className="text-xl font-bold mb-2">Lexidy</h2>
                    <p className="text-base mb-4">Corporate structure</p>
                    <p className="text-base">Cost: $XXX</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <h2 className="text-xl font-bold mb-2">Google</h2>
                    <p className="text-base mb-4">Cloud Services</p>
                    <p className="text-base">Cost: $XXX</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <h2 className="text-xl font-bold mb-2">Paddle</h2>
                    <p className="text-base mb-4">Yearly User Access</p>
                    <p className="text-base">Cost: $XXX</p>
                  </div>
    
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

export default Transanctions