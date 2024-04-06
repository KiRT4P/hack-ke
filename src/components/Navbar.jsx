import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    return (
        <div className='flex justify-center h-20 w-full z-50'>
            <nav className=" w-full h-20 fixed bg-white z-40" >
                <div className='content  flex justify-between items-center h-20 '>
                    <Link to={"/"} className="text-dark text-xl">
                        {/* <img src="/logo_nav.png" alt="logo" className=' w-20 ' /> */}
                        Finito!
                    </Link>
                    <div className="flex uppercase text-lg justify-around h-full items-center text-dark child:mx-4 child-hover:text-primary child:duration-300 child:cursor-pointer">
                        <Link to="#sluzby">služby</Link>
                        <Link to={"#onas"}>o nás</Link>
                        <Link to={"#foto"}>foto</Link>
                        <Link to={"#kontakt"}>kontakt</Link>
                        <div className="btn ">
                            {user ? <div onClick={logout}>Log out</div> : <Link to={"/signup"}>Sign up</Link>}
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Navbar;