
import { useEffect, useState } from "react";
export default function Slider({ fullWidth = true, sliderValue, setSliderValue }) {
    const [year, setYear] = useState(1980);

    const mapNumRange = (num, inMin, inMax, outMin, outMax) => {
        return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    // 50


    return (
        <div className={`bg-white duration-500 fixed bottom-5 left-[4vw] ${fullWidth ? 'w-[92vw]' : 'w-[60vw]'}`}>
            <div className="flex h-full items-center relative ">

                <div className={`h-[30px] w-[20px] border-secondary relative left-4    ${(sliderValue == 0) ? " pointer-events-none " : "  border-r-2 bg-white"}`}>
                    <div className="absolute -bottom-8">1980</div>
                </div>

                <div className={`absolute normal-nums border-accent border-2 rounded-lg px-2 py-1 z-50 -top-8 ${(sliderValue == 0 || sliderValue == 100) ? "hidden" : ""}`} style={{ left: mapNumRange(sliderValue, 0, 100, 0, 95) + (0.2) + '%' }} > {year}</div>
                <input type="range" className="bg-transparent" value={sliderValue}
                    onChange={(e) => {
                        setSliderValue(e.target.value);
                        setYear(1980 + parseInt(e.target.value));
                    }} />
                <div className={`h-[30px] w-[20px] border-secondary relative right-4   ${(sliderValue == 100) ? " pointer-events-none " : "  border-l-2 bg-white"}`}>
                    <div className="absolute -bottom-8 right-0">2080</div>
                </div>
            </div>

        </div >
    )
}