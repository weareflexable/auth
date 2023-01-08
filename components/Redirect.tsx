import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import supabase from "../utils/supabaseClient"

interface RedirectProps {
    paseto: string
}

export default function Redirect() {
    const [isRedirecting, setIsRedirecting] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const redirectTo = localStorage.getItem('redirect_to')
        const paseto = localStorage.getItem('PLATFORM_PASETO')

        const redirectUrl = redirectTo === 'portal' ? `${process.env.NEXT_PUBLIC_PORTAL}?paseto=${paseto}` : `${process.env.NEXT_PUBLIC_MARKETPLACE}?paseto=${paseto}`
        // const redirectUrl = redirectTo === 'portal'?`http://localhost:3000/login?paseto=${paseto}`:`http://localhost:3001?paseto=${paseto}`
        setTimeout(() => {
            router.replace(redirectUrl)
            setIsRedirecting(false)
            // clear storage
            localStorage.removeItem('PLATFORM_PASETO')
            localStorage.removeItem('redirect_to')
            supabase.auth.signOut()
        }, 4000)
    }, [router])


    // if (!isRedirecting) {
    //     return (
    //         <div className="text-white flex flex-col items-center text-center">
    //             <h1 className="text-5xl font-bold font-figtree">Redirected!</h1>
    //             <span className="mt-4 w-[50%]">You&nbsp;re being redirected to another page. It may take a while so sit tight and stay flexable!</span>
    //         </div>
    //     )
    // }

    return (
        <div className="text-white flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold font-figtree">Redirecting...</h1>
            <span className="mt-4 w-[50%]">You&nbsp;re being redirected to another page. It may take a while so sit tight and stay flexable!</span>
        </div>
    )
}