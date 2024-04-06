
import Map from "../components/Map"
import Slider from "../components/Slider"
import Navbar from "../components/Navbar"
import { useState } from "react"

export default function Home() {
    const [selected, setSelected] = useState(null)
    const [model, setModel] = useState(1)

    return (
        <div className="w-screen h-screen overflow-hidden" >
            <Navbar model={model} setModel={setModel} />
            <Map setSelected={setSelected} />
            <Slider />
        </div>
    )

}