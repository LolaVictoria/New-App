"use client"
//import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = ()  => {
    const router = useRouter();

    const navbarBoxShadow = {
      boxshadow: "0 4px 6px rgba(0, 0, 0, 0.1"
    }
    
    return (
        <div className="flex flex-col justify-between m-0 ">
            <div className="bg-blue-500 shadow-md">
                <p className="font-bold text-xl">NewsUpdate</p>
            </div>

            <div
              className="mr-2 flex  flex-start px-3 py-2 ">
                    <p 
                    className="font-semibold text-md my-1 py-1 px-4 mr-6 bg-blue-500 rounded-md"
                    onClick={() => router.push('/all/1')}>All</p>
                     <p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/art/1')}>Art</p>
                      <p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/business/1')}>Business</p>
                    <p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/fashion/1')}>Fashion</p>
                    < p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('sport/1')}>Sport</p>
                      
                    <p  className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/technology/1')}>Technology</p>
                

            </div>


        </div>
    )
}
export default Navbar