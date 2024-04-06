import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {



    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")

    const { signup, error, isLoading } = useSignup()

    const register = async (e) => {
        e.preventDefault()
        if (!checkPasswordMatch) {
            alert("Heslá sa nezhodujú")
            return
        }
        if (password.length < 6) {
            alert("Heslá je kratšie ako 6 znakov")
            return
        }
        console.log(lastName);
        await signup(email, password, firstName, lastName)
    }

    const checkPasswordMatch = () => {
        return password !== repeat;
    }

    useEffect(() => {
        console.log(error);
    }, [error])





    return (
        <div className=" w-screen flex items-center justify-center flex-col ">
            <form className="w-[35vw] bg-white  border border-borders p-8 child:my-2 mt-16 flex flex-col justify-end" onSubmit={register}>
                <h1 className="font-semibold text-xl">Sign up</h1>
                <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <input required type="password" value={repeat} onChange={e => setRepeat(e.target.value)} placeholder="Repeat password" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <button disabled={isLoading} className="btn ml-auto">Sign up!</button>
            </form>
            <p>Already have an account? <Link to={'/login'} className="text-primary underline">Log in!</Link></p>
        </div>
    );
}

export default Signup;