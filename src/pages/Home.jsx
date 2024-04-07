
import Map from "../components/Map"
import Slider from "../components/Slider"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Info from "../components/Info"

export default function Home() {
    const [selected, setSelected] = useState(null)
    const [model, setModelUS] = useState(1)



    const setModel = (model) => {
        setModelUS(model)
        setSelected(null)
    }


    return (
        <div className="w-screen h-screen overflow-hidden " >
            <Navbar model={model} setModel={setModel} narrow={!!selected} />
            <Map setSelected={setSelected} model={model} selected={selected} />
            <Slider fullWidth={!selected} />
            <Info selected={selected} setSelected={setSelected} />
        </div>
    )

}