"use client"
//import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = ()  => {
    const router = useRouter()
    const [openFeed, setOpenFeed] = useState(false)
    
    return (
        <div className="flex justify-between bg-green-600 m-0 px-3 py-2">
            <div>
                <p className="font-bold text-xl">NewsUpdate</p>
            </div>

            <div className="flex mr-28">
            <div
               className="mr-10" 
              onClick={() => router.push('/')}>
                <p className="font-semibold text-lg">Home</p>
            </div>
            <div
              className="mr-2"
               onClick={() => setOpenFeed(!openFeed)}>
                 <p className="font-semibold text-lg">Feed</p>
                 {openFeed && <div className="border border-gray-500 mt-5 py-2 px-3">
                    <p 
                    className="font-semibold text-md m-1"
                    onClick={() => router.push('/EveryFeed')}>All</p>
                    <p 
                      className="font-semibold text-md m-1"
                      onClick={() => router.push('/feed/1')}>Top Headlines</p>
                 </div>}

            </div>

            
            
          
            </div>

        </div>
    )
}
export default Navbar