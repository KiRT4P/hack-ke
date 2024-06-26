import { IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function Info({ selected, setSelected = () => { }, setTypeM, typeM, details, area }) {

    return (
        <div id='test' className={`absolute   top-0 bg-white p-12 w-[30vw] h-screen z-50 rounded-l-3xl shadow-2xl text-right duration-500 ${typeM > -1 ? "right-0" : "-right-[30vw]"} `}>

            <p className="absolute right-20 top-10 cursor-pointer z-50" onClick={e => { setTypeM(-1); setSelected(null); }}>
                <IconX color='#80ed99' size={"2rem"} />
            </p>
            {
                typeM > 1 && <div className='h-full'>
                    {typeM === 3 &&
                        <div className="flex flex-col text-left pt-20 h-full     ">
                            <h1 className="text-4xl font-semibold text-accent pb-1">{selected.event_name}    </h1>
                            <h2 className="text-2xl font-semibold text-accent pb-3">{selected.point_name}    </h2>
                            <p>{selected.desc}</p>
                            <p className="text-lg font-bold">IN {new Date(selected.date).getFullYear()}</p>
                            <div className="flex-1  flex justify-end flex-col   ">
                                <button className="">Close</button>
                            </div>
                        </div>
                    }
                    {typeM === 2 &&
                        <div className="flex flex-col text-left pt-20 h-full     ">
                            <h1 className="text-4xl font-semibold text-accent pb-1">{area?.area_name}    </h1>
                            <h2 className="text-2xl font-semibold text-accent pb-3">{selected.point_name}    </h2>
                            <p>{selected.desc}</p>
                            <div>
                                {details && details.map((detail, i) => (
                                    <div key={i}>
                                        <p className="text-lg font-bold">IN {new Date(detail.date).getFullYear()}</p>
                                        <p>{detail.event_name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1  flex justify-end flex-col   ">
                                <button className="" onClick={e => { setTypeM(-1); setSelected(null) }}>Close</button>
                            </div>
                        </div>
                    }
                </div>
            }
            {typeM < 2 &&
                <div>
                    {typeM === 0 &&
                        <div className="flex flex-col absolute top-10 left-10 child:mb-8 text-left h-[90%]">
                            <h1 className="text-2xl text-accent">How does it work?</h1>
                            <p className='text-sm text-gray-400 max-w-[23vw]'>
                                TerraTherm is a project that visualizes captured climate data from the past and tries to display the predicted development of the upcoming climate change.
                            </p>
                            <p className='text-sm text-gray-400 max-w-[23vw]'>
                                By clicking on the <span className='text-accent'>Good</span>  / <span className='text-accent'>Medium</span> / <span className='text-accent'>Bad</span> buttons, you can follow the expected development, due to the favorable circumstances.
                            </p>
                            <h1 className="text-2xl text-accent mt-4 ">Move the slider!</h1>
                            <p className='text-sm text-gray-400 max-w-[23vw]'>
                                By clicking on the slider an moving it you will be able to see data or predictions for each year displayed.
                            </p>
                            <div className='flex-1 flex justify-end'>
                                {<button onClick={e => { setSelected(null); setTypeM(-1); }} className='w-full !bg-accent !text-white hover:!text-accent hover:!bg-white h-max mt-auto uppercase text-xl'>Try it out now!</button>}
                            </div>

                        </div>
                    }

                    {typeM === 1 && <div className="flex flex-col absolute top-40 right-20 child:mb-4 ">
                        <Link to="/?initial=false" className="text-2xl text-accent">Home</Link>
                        <h1 className="text-2xl text-accent cursor-pointer" onClick={e => { setTypeM(0) }}>How does it work?</h1>
                        <Link to="/about" className="text-2xl text-accent">About</Link>
                    </div>}

                </div>
            }



        </div >
    )
}