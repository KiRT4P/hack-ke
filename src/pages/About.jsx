import Info from "../components/Info";
import Navbar from "../components/Navbar";
import { useState } from "react";
export default function About() {
    const [menu, setMenu] = useState(false)

    const openMenu = () => {
        setMenu(true)
    }

    return (
        <div className="">
            <Navbar bar={false} openMenu={openMenu} />
            <Info menu={menu} setMenu={setMenu} init={false} />
            <div className="p-12 txt">
                <h1 className="text-7xl text-accent font-semibold mb-12">About TerraTherm</h1>
                <p>
                    Projekt TerraTherm vznikol pri príležitosti Hack Košice 2024. Projekt sa zaoberá sa zameriava na komplexné zobrazovanie dát, systematickú analýzu historických údajov a predikciu vývoja teplôt na Zemi s cieľom porozumieť a predpovedať klimatické zmeny do budúcnosti.
                </p>
                <p>
                    Naša misia je poskytnúť dôkladné a spoľahlivé informácie o stave klímy našej planéty, aby sme podporili predovšetkým osvetu, a vedeli predpokladať potrebné opatrenia na ochranu života a životného prostredia na Zemi. Projekt sa opiera o starostlivo zbierané dáta a vedecké poznatky, aby vytvoril presné modely a simulácie, ktoré nám pomáhajú lepšie pochopiť dynamiku klímy. Zároveň sa snažíme umožniť prístup k týmto dátam a nástrojom širšej verejnosti, vedcom, environmentálnym organizáciám a politickým činiteľom, aby sme podporili spoločné úsilie v boji proti klimatickým zmenám.
                </p>
                <p>
                    Prehliadnite si našu stránku a objavte bohaté zdroje informácií a interaktívne vizualizácie, ktoré poskytujeme. Spoločne môžeme prijať informované rozhodnutia a konať v záujme budúcnosti našej planéty a prispievajte k budovaniu udržateľnejšieho sveta pre nasledujúce generácie.
                </p>

            </div>
            <div className="absolute right-0 bottom-0 -z-50 ">
                <img src="/bg.png" alt="" />
            </div>
        </div >
    )
}