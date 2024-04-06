
import { useEffect, useState } from "react";
export default function Slider({ fullWidth = true }) {

    const [sliderValue, setSliderValue] = useState(0);
    const [year, setYear] = useState(1980);

    const mapNumRange = (num, inMin, inMax, outMin, outMax) => {
        return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    // 50


    return (
        <div className={`bg-white duration-500 fixed bottom-5 left-[5vw] ${fullWidth ? 'w-[90vw]' : 'w-[60vw]'}`}>
            <div className="flex h-full items-center relative ">

                <div className=" h-[30px] w-[3px] bg-secondary relative">
                    <div className="absolute -top-8 -left-4">1980</div>
                </div>

                <div className={`absolute normal-nums -top-8 ${(sliderValue == 0 || sliderValue == 100) ? "hidden" : ""}`} style={{ left: mapNumRange(sliderValue, 0, 100, 0, 97) + '%' }} > {year}</div>
                <input type="range" className="bg-transparent" value={sliderValue}
                    onChange={(e) => {
                        setSliderValue(e.target.value);
                        setYear(1980 + parseInt(e.target.value));
                    }} />
                <div className=" h-[30px] w-[3px] bg-secondary relative">
                    <div className="absolute -top-8 -left-4">2080</div>
                </div>
            </div>

        </div >
    )
}