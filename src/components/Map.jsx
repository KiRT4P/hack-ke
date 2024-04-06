
import { useState } from "react"

export default function Map() {

    const [pos, setPos] = useState({ x: 0, y: 0, scale: 1, lastX: 0, lastY: 0 });

    const onScroll = (e) => {
        const delta = e.deltaY;
        const scaleChange = delta > 0 ? -0.1 : 0.1;
        const newScale = pos.scale + scaleChange;

        if (newScale < 1 || newScale > 5) {
            return;
        }

        const newPosX = pos.x - e.clientX * scaleChange;
        const newPosY = pos.y - e.clientY * scaleChange;

        setPos({ x: newPosX, y: newPosY, scale: newScale, lastX: pos.lastX, lastY: pos.lastY });
    };

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
        <div className="select-none  h-[90vh] overflow-hidden" onWheelCapture={onScroll} onDrag={onDrag} onDragEnd={onDragEnd}>
            <img
                src="/map.png"
                alt="map"
                style={{
                    transformOrigin: "0 0",
                    transform: `scale(${pos.scale}) translate(${pos.x}px, ${pos.y}px)`,
                }}
                className=" "
            />
        </div>
    )
}