"use client"
import { useRouter } from "next/navigation"

const Toolbar = ()  => {
    const router = useRouter()
    
    return (
        <div className="flex justify-between bg-green-600">
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => router.push('/feed/1')}>Feed</div>
            <div onClick={()  =>window.location.href="https://twitter.com/1_and-only-lola"}>Twitter</div>
        </div>
    )
}
export default Toolbar