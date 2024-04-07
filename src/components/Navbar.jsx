import { Link } from "react-router-dom";

const Navbar = ({ model, setModel, narrow }) => {
    return (
        <div className='flex justify-center h-20 w-full z-50'>
            <nav className=" w-full h-20 fixed bg-white z-40" >
                <div className={` flex justify-between items-center h-20 content `}>
                    <Link to={"/"} className="text-dark text-xl flex items-center">
                        <img src="./TerraTherm_Logo1 1.png" alt="" />
                    </Link>
                    <div className={`flex selector justify-between  w-1/4 min-w-[400px] child:!w-24 child:!text-base duration-500 relative ${narrow ? "  -left-16 " : "-left-0"} `}>
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