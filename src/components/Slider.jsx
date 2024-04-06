
import { useEffect, useState } from "react";
export default function Slider({ fullWidth = true }) {

    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        // Start the slider on the left
        setSliderValue(0);
    }, []);

    return (
        <div className={` duration-1000 fixed bottom-5 left-[5vw] ${fullWidth ? 'w-[90vw]' : 'w-[60vw]'}`}>
            <div className="flex h-full items-center">
                <div className=" h-[30px] w-[3px] bg-secondary relative">
                    <div className="absolute -top-8 -left-4">1970</div>
                </div>
                <input type="range" className="bg-transparent" value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.value)} />
                <div className=" h-[30px] w-[3px] bg-secondary relative">
                    <div className="absolute -top-8 -left-4">2080</div>
                </div>
            </div>

        </div>
    )
}