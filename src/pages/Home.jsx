
import Map from "../components/Map"
import Slider from "../components/Slider"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Info from "../components/Info"

export default function Home() {
    const [selected, setSelected] = useState(null)
    const [model, setModel] = useState(1)

    useEffect(() => {

    }, [selected])

    return (
        <div className="w-screen h-screen overflow-hidden " >
            <Navbar model={model} setModel={setModel} />
            <Map setSelected={setSelected} />
            <Slider fullWidth={!selected} />
            <Info selected={selected} />
        </div>
    )

}