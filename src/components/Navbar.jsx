import { Link } from "react-router-dom";
import { IconMenu2 } from "@tabler/icons-react";
const Navbar = ({ model, setModel, openMenu, narrow, bar = true }) => {
    return (
        <div className='flex justify-center h-20 w-full z-50'>
            <nav className={` w-full h-20 fixed  z- ${bar ? " bg-white " : " "}`} >
                <div className={` flex justify-between items-center h-20 content `}>
                    <Link to={"/"} className="text-dark text-xl flex items-center">
                        <img src="./TerraTherm_Logo1 1.png" alt="" />
                    </Link>
                    {bar && <div className={`flex selector justify-between  w-1/4 min-w-[400px] child:!w-24 child:!text-base duration-500 relative ${narrow ? "  -left-16 " : "-left-0"} `}>
                        <h2 onClick={() => setModel(0)} className={`${model === 0 ? "bg-accent !text-white" : ""}`}>Good</h2>
                        <h2 onClick={() => setModel(1)} className={`${model === 1 ? "bg-accent !text-white" : ""}`}>Medium</h2>
                        <h2 onClick={() => setModel(2)} className={`${model === 2 ? "bg-accent !text-white" : ""}`}>Bad</h2>
                    </div>}
                    <div className="rounded-full p-2 shadow-lg cursor-pointer z-50 bg-white">
                        <IconMenu2 color='#80ed99' size={"2rem"} onClick={openMenu} />
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Navbar;