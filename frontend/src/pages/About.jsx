import Info from "../components/Info";
import Navbar from "../components/Navbar";
import { useState } from "react";
export default function About() {
    const [typeM, setTypeM] = useState(-1)


    return (
        <div className="">
            <Navbar bar={false} setTypeM={setTypeM} />
            <Info typeM={typeM} setTypeM={setTypeM} />
            <div className="p-12 txt">
                <h1 className="text-7xl text-accent font-semibold mb-12">About TerraTherm</h1>
                <p>
                    The TerraTherm project was created at Hack Košice 2024. The project focuses on complex data visualization, systematic analysis of historical data and prediction of the development of temperatures on planet Earth in order to understand and predict climate changes in the future.
                </p>
                <p>
                     Our mission is to provide thorotugh and reliable information about the state of our planet's climate, in order to support, above all, enlightenment, and to be able to anticipate the necessary measures to protect life and the environment on Earth. The project relies on carefully collected data and scientific knowledge to create accurate models and simulations that help us better understand climate dynamics. At the same time, we strive to make these data and tools accessible to the wider public, scientists, environmental organizations and policy makers to support joint efforts in the fight against climate change.
                </p>
                <p>
                    Browse our site and discover the rich information resources and interactive visualizations we provide. Together we can make smart decisions and act for the future of our planet and contribute to building a more sustainable world for generations to come.
               </p>
               

            </div>
            <div className="absolute right-0 bottom-0 -z-50 ">
                <img src="/bg.png" alt="" />
            </div>
        </div >
    )
}