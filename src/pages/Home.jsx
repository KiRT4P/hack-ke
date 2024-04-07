
import Map from "../components/Map"
import Slider from "../components/Slider"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Info from "../components/Info"

export default function Home() {
    const searchParamas = new URLSearchParams(window.location.search)
    const [selected, setSelected] = useState(null)
    const [model, setModelUS] = useState(1)
    const [menu, setMenu] = useState(searchParamas.get("initial") !== 'false')



    const openMenu = () => {
        setMenu(true)
    }


    const setModel = (model) => {
        setModelUS(model)
        setSelected(null)
    }


    return (
        <div className="w-screen h-screen overflow-hidden " >
            <Navbar model={model} setModel={setModel} narrow={!!selected} openMenu={openMenu} />
            <Map setSelected={setSelected} model={model} selected={selected} menu={menu} />
            <Slider fullWidth={!selected && !menu} />
            <Info selected={selected} setSelected={setSelected} menu={menu} setMenu={setMenu} init={searchParamas.get("initial") !== 'false'} />
        </div>
    )

}