import { IconX } from '@tabler/icons-react';

export default function Info({ selected, setSelected }) {
    console.log(selected);
    ;

    return (
        <div id='test' className={`absolute   top-0 bg-white p-12 w-[30vw] h-screen z-50 rounded-l-3xl shadow-2xl text-center duration-500 ${!!selected ? "right-0" : "-right-[30vw]"} `}>

            <p className="absolute right-5 top-5 cursor-pointer" onClick={e => setTimeout(() => setSelected(null))}>
                <IconX color='#80ed99' size={"2rem"} />
            </p>
            {selected?.point
                ?
                <div className="flex flex-col h-full">
                    <h1 className="text-4xl font-semibold text-accent pb-1">{selected.event_name}    </h1>
                    <h2 className="text-2xl font-semibold text-accent pb-3">{selected.point_name}    </h2>
                    <p>{selected.desc}</p>
                    <p className="text-lg font-bold">IN {new Date(selected.date).getFullYear()}</p>
                    <div className="flex-1  flex justify-end flex-col   ">
                        <button className="">Close</button>
                    </div>
                </div>
                :
                <h1>arr</h1>
            }


        </div>
    )
}