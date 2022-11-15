import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface RedirectProps{
    paseto: string
}

export default function Redirect(){
    const [isRedirecting, setIsRedirecting] = useState(true)
    const router = useRouter()


    useEffect(() => {
        const redirectTo = localStorage.getItem('redirect_to')
        const paseto = localStorage.getItem('PLATFORM_PASETO')
        const redirectUrl = redirectTo === 'portal'?`http://localhost:3000?paseto=${paseto}`:null
        setTimeout(()=>{
            router.replace(redirectUrl)
            setIsRedirecting(false)
            // redirect user to portal
        },4000)
    }, [ router])

    if(!isRedirecting){
        return <div>
            Redirected!
        </div>
    }

    return(
        
          <div>
            Redirecting
          </div>

       
    )
}