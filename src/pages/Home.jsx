
import Map from "../components/Map"
import Slider from "../components/Slider"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Info from "../components/Info"
import useFetch from "../hooks/useFetch"

export default function Home() {
    const searchParamas = new URLSearchParams(window.location.search)
    const [selected, setSelected] = useState(null)
    const [model, setModelUS] = useState(1)
    const [typeM, setTypeM] = useState((searchParamas.get("initial") === 'false') ? -1 : 0)
    const [time, setTime] = useState(315532800)
    const models = ["SSP1-2.6", "SSP2-4.5", "SSP5-8.5"]
    let { data: event, setData } = useFetch("/api/event", { model: models[model], time })
    const [details, setDetails] = useState(null)
    const [area, setArea] = useState(null)

    const [sliderValue, setSliderValue] = useState(0)

    let max = 3473971200
    let min = 315532800


    const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
        ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    mapNumRange(5, 0, 100, min, max); // 50
    useEffect(() => {
        setTime(mapNumRange(sliderValue, 0, 100, min, max))
        fetch(process.env.REACT_APP_TARGET + "/api/event?model=" + models[model] + "&time=" + time).then(res => res.json()).then(data => { setData(data) })
        if (typeM === 3) {
            setTypeM(-1)

        }
    }, [sliderValue, model])

    useEffect(() => {
        if (typeM === 2) {
            fetch(process.env.REACT_APP_TARGET + '/api/area-events?area_id=' + selected)
                .then(res => res.json())
                .then(data => {

                    setDetails(data.filter(d => new Date(d.date).getTime() / 1000 > time - 157784630 * 2 && new Date(d.date).getTime() / 1000 < time + 157784630 * 2))
                })
            fetch(process.env.REACT_APP_TARGET + '/api/area_details?area_id=' + selected)
                .then(res => res.json())
                .then(data => {
                    setArea(data[0])
                })
        }
    }, [selected, time])
    //0 initial
    //1 menu
    //2 area
    //3 point


    const setModel = (model) => {
        setModelUS(model)
        // setTypeM(-1)
    }

    useEffect(() => { console.log(event); }, [event])




    return (
        <div className="w-screen h-screen overflow-hidden " >
            <Navbar model={model} setModel={setModel} narrow={typeM !== -1} setTypeM={setTypeM} />
            <Map setSelected={setSelected} model={model} selected={selected} setTypeM={setTypeM} typeM={typeM} event={event} />
            <Slider fullWidth={typeM === -1} sliderValue={sliderValue} setSliderValue={setSliderValue} />
            <Info details={details} area={area} typeM={typeM} setTypeM={setTypeM} model={model} selected={selected} setSelected={setSelected} init={searchParamas.get("initial") !== 'false'} />
        </div>
    )

}