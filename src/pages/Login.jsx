import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"

const Login = () => {



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className=" w-screen flex items-center justify-center flex-col  ">
            <form className="w-[35vw] bg-white  border border-borders p-8 child:my-2 mt-16 flex flex-col justify-end" onSubmit={handleSubmit}>
                <h1 className="font-semibold text-xl">Log in</h1>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border border-borders text-dark-text placeholder:text-borders px-3 py-2 w-full" />
                <button disabled={isLoading} className="btn ml-auto">Prihlásiť</button>

                {error && <div className="error">{error}</div>}
            </form>
            <p > Dont have an account? <Link to={'/signup'} className="text-primary underline">Sign up!</Link></p>
        </div>
    );
}

export default Login;