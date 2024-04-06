import { Link } from "react-router-dom";

const Navbar = ({ model, setModel }) => {
    return (
        <div className='flex justify-center h-20 w-full z-50'>
            <nav className=" w-full h-20 fixed bg-white z-40" >
                <div className='content  flex justify-between items-center h-20 '>
                    <Link to={"/"} className="text-dark text-xl flex items-center">
                        <div className="size-10 bg-accent rounded-full"></div>
                        <h1 className="ml-4 uppercase text-accent font-bold text-2xl">Logo</h1>
                        {/* <img src="/logo_nav.png" alt="logo" className=' w-20 ' /> */}
                    </Link>
                    <div className="flex selector justify-between  w-1/3 min-w-[400px] ">
                        <h2 onClick={() => setModel(0)} className={`${model === 0 ? "bg-accent !text-white" : ""}`}>Good</h2>
                        <h2 onClick={() => setModel(1)} className={`${model === 1 ? "bg-accent !text-white" : ""}`}>Medium</h2>
                        <h2 onClick={() => setModel(2)} className={`${model === 2 ? "bg-accent !text-white" : ""}`}>Bad</h2>
                    </div>
                    <div></div>
                </div>
            </nav >
        </div >
    );
}

export default Navbar;