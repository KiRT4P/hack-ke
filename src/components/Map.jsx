
import { useState } from "react"

export default function Map({ setSelected }) {

    const [pos, setPos] = useState({ x: 0, y: 0, scale: 1, lastX: 0, lastY: 0 });

    const onWheel = (e) => {
        console.log(e);
        const scale = pos.scale - e.deltaY * 0.01;
        if (scale < 1) {
            setPos({ ...pos, scale: 1 });
        } else {
            setPos({ ...pos, scale });
        }
    }

    const onDrag = (e) => {
        let lastX = pos.lastX;
        let lastY = pos.lastY;

        if (lastX === 0 || lastY === 0) {
            lastX = e.clientX;
            lastY = e.clientY;
        }

        if (e.clientX === 0 || e.clientY === 0) {
            return;
        }

        const calculatedX = (e.clientX - lastX) / pos.scale;
        const calculatedY = (e.clientY - lastY) / pos.scale;

        let newPosX = pos.x + calculatedX;
        let newPosY = pos.y + calculatedY;

        if (newPosX > 0) {
            newPosX = 0;
        }
        if (newPosY > 0) {
            newPosY = 0;
        }

        setPos({ x: newPosX, y: newPosY, scale: pos.scale, lastX: e.clientX, lastY: e.clientY });
    }

    const onDragEnd = () => {
        setPos({ x: pos.x, y: pos.y, scale: pos.scale, lastX: 0, lastY: 0 });
    }

    return (
        <div className="select-none  max-h-[80vh] overflow-hidden" onScroll={onWheel} onDrag={onDrag} onDragEnd={onDragEnd}>
            <img
                src="/1.svg"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className="map "
            />
            <img
                src="/2.svg"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className="map "
            />
            <img
                src="/3.svg"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className="map "
            />
            <img
                src="/4.svg"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className="map "
            />
            <img
                src="/5.svg"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className="map "
            />
            <img
                id="6"
                src="/xx.svg"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className="map "
            />
        </div>
    )
}