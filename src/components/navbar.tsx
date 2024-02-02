"use client"
//import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = ()  => {
    const router = useRouter()
    
    return (
        <div className="flex flex-col justify-between m-0 ">
            <div className=" bg-green-600">
                <p className="font-bold text-xl">NewsUpdate</p>
            </div>

            <div
              className="mr-2 flex  flex-start px-3 py-2 ">
                    <p 
                    className="font-semibold text-md my-1 mr-6"
                    onClick={() => router.push('/all/1')}>All</p>
                     <p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/business/1')}>Art</p>
                      <p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/business/1')}>Business</p>
                    <p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/fashion/1')}>Fashion</p>
                    < p 
                      className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/business/1')}>Sport</p>
                      
                    <p  className="font-semibold text-md my-1 mr-6"
                      onClick={() => router.push('/technology/1')}>Technology</p>
                

            </div>


        </div>
    )
}
export default Navbar