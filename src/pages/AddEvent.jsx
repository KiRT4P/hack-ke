import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'


export default function AddEvent() {
    const { data: area, isLoading } = useFetch("/api/area")
    const { data: point, isLoading: pointIsLoading } = useFetch("/api/points")
    const { data: event, isLoading: eventIsLoading } = useFetch("/api/events")

    const [pointForm, setPointForm] = useState({ name: '', area: '', latitude: '', longitude: '' })
    const [eventForm, setEventForm] = useState({ name: '', description: '', point: '' })
    const [modelForm, setModelForm] = useState({ timestamp: new Date().getTime() / 1000, model: '', event: '' })

    const pointSubmit = (e) => {
        e.preventDefault()
        if (!isNaN(parseFloat(pointForm.latitude)) && !isNaN(parseFloat(pointForm.longitude))) {
            fetch(process.env.REACT_APP_TARGET + '/api/point', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: pointForm.name,
                    area_id: pointForm.area,
                    x: parseFloat(pointForm.latitude),
                    y: parseFloat(pointForm.longitude)
                })
            }).then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource')
                }
                return res.json()

            }).then(data => {
                console.log(data);
                setPointForm({ name: '', area: '', latitude: '', longitude: '' })
            }).catch(err => {
                alert(err.message)
            })
        } else {
            alert('latitude and longitude must be a number')
            return
        }
    }

    const eventSubmit = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_TARGET + '/api/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: eventForm.name,
                desc: eventForm.description,
                point_id: eventForm.point
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource')
            }
            return res.json()

        }).then(data => {
            console.log(data);
            setEventForm({ name: '', description: '', point: '' })
        }).catch(err => {
            alert(err.message)
        })
    }

    const modelSubmit = (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_TARGET + '/api/model', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                incident_date: modelForm.timestamp,
                incident_id: modelForm.event,
                spp_model: modelForm.model
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource')
            }
            return res.json()

        }).then(data => {
            console.log(data);
            setEventForm({ name: '', description: '', point: '', timestamp: new Date().getTime() / 1000 })
        }).catch(err => {
            alert(err.message)
        })
    }

    return (
        <div className="w-screen  overflow-x-hidden bg-secondary">
            <form className="w-[80vw] mx-auto mt-24 rounded-3xl bg-primary p-10 text-center" onSubmit={pointSubmit}>
                <h1 className="text-accent text-3xl font-semibold mb-12">Add Point</h1>
                <div className="flex flex-col ">
                    <input type="text" placeholder="name" value={pointForm.name} onChange={e => setPointForm({ ...pointForm, name: e.target.value })} />
                    {!isLoading && <select name="" id="" onChange={e => setPointForm({ ...pointForm, area: e.target.value })} >
                        <option value="" >Select Area</option>
                        {area && area.map((area, i) => (
                            <option key={i} value={area.id}>{area.name}</option>
                        ))}
                    </select>}
                    <div className='flex'>
                        <input value={pointForm.latitude} onChange={e => setPointForm({ ...pointForm, latitude: e.target.value })} type="text" placeholder="latitude" className='mr-4' />
                        <input value={pointForm.longitude} onChange={e => setPointForm({ ...pointForm, longitude: e.target.value })} type="text" placeholder="longitude" />

                    </div>
                    <button>Submit</button>
                </div>

            </form>
            <form className="w-[80vw] mx-auto mt-24 rounded-3xl bg-primary p-10 text-center" onSubmit={eventSubmit}>
                <h1 className="text-accent text-3xl font-semibold mb-12">Add Event</h1>
                <div className="flex flex-col ">
                    <input type="text" placeholder="name" value={eventForm.name} onChange={e => setEventForm({ ...eventForm, name: e.target.value })} />
                    <textarea name="" id="" cols="30" rows="10" placeholder="description" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })}></textarea>
                    <select name="" id="" onChange={e => setEventForm({ ...eventForm, point: e.target.value })}>
                        <option value="">Select Point</option>
                        {point && point.map((point, i) => (
                            <option key={i} value={point.id}>{point.name}</option>
                        ))}
                    </select>
                    {/* <input className='w-full bg-primary border-2 border-secondary rounded-lg p-2 my-2' type="date" value={new Date(eventForm.timestamp * 1000).toISOString().slice(0, -14)} onChange={e => setEventForm({ ...eventForm, timestamp: new Date(e.target.value).getTime() / 1000 })} /> */}
                    <button>Submit</button>
                </div>

            </form>
            <form className="w-[80vw] mx-auto mt-24 rounded-3xl bg-primary p-10 text-center" onSubmit={modelSubmit}>
                <h1 className="text-accent text-3xl font-semibold mb-12">Model+Event</h1>
                <div className="flex flex-col ">

                    <select name="" id="" onChange={e => setModelForm({ ...modelForm, event: e.target.value })}>
                        <option value="">Select Event</option>
                        {event && event.map((e, i) => (
                            <option key={i} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                    <select name="" id="" onChange={e => setModelForm({ ...modelForm, model: e.target.value })}>
                        <option value="">Select Model</option>
                        <option value="SSP1-2.6">SSP1-2.6</option>
                        <option value="SSP2-4.5">SSP2-4.5</option>
                        <option value="SSP5-8.5">SSP5-8.5</option>
                    </select>
                    <input className='w-full bg-primary border-2 border-secondary rounded-lg p-2 my-2' type="date" value={new Date(modelForm.timestamp * 1000).toISOString().slice(0, -14)} onChange={e => setModelForm({ ...modelForm, timestamp: new Date(e.target.value).getTime() / 1000 })} />
                    <button>Submit</button>
                </div>

            </form>
        </div>
    )
}