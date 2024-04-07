import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'


export default function AddArea() {
    const { data: area, isLoading } = useFetch("/api/area")

    const [areaForm, setAreaForm] = useState({ area_id: '', desc: '', model: '', timestamp: new Date().getTime() / 1000 })

    const areaSubmit = (e) => {
        e.preventDefault()

        fetch(process.env.REACT_APP_TARGET + '/api/point', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                desc: areaForm.desc,
                model: areaForm.model,
                area_id: areaForm.area_id,
                timestamp: areaForm.timestamp
            })
        }).then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource')
            }
            return res.json()

        }).then(data => {
            console.log(data);
            setAreaForm({ area_id: '', desc: '', model: '', timestamp: new Date().getTime() / 1000 })
        }).catch(err => {
            alert(err.message)
        })
    }




    return (
        <div className="w-screen  overflow-x-hidden bg-secondary">
            <form className="w-[80vw] mx-auto mt-24 rounded-3xl bg-primary p-10 text-center" onSubmit={areaSubmit}>
                <h1 className="text-accent text-3xl font-semibold mb-12">Add Area description</h1>
                <div className="flex flex-col ">
                    {!isLoading && <select name="" id="" onChange={e => setAreaForm({ ...areaForm, area: e.target.value })} >
                        <option value="" >Select Area</option>
                        {area && area.map((area, i) => (
                            <option key={i} value={area.id}>{area.name}</option>
                        ))}
                    </select>}

                    <textarea name="" id="" cols="30" rows="10" placeholder="description" value={areaForm.description} onChange={e => setAreaForm({ ...areaForm, description: e.target.value })}></textarea>



                    <select name="" id="" onChange={e => setAreaForm({ ...areaForm, model: e.target.value })}>
                        <option value="">Select Model</option>
                        <option value="SSP1-2.6">SSP1-2.6</option>
                        <option value="SSP2-4.5">SSP2-4.5</option>
                        <option value="SSP5-8.5">SSP5-8.5</option>
                    </select>
                    <input className='w-full bg-primary border-2 border-secondary rounded-lg p-2 my-2' type="date" value={new Date(areaForm.timestamp * 1000).toISOString().slice(0, -14)} onChange={e => setAreaForm({ ...areaForm, timestamp: new Date(e.target.value).getTime() / 1000 })} />
                    <button>Submit</button>
                </div>


            </form>
        </div>
    )
}
