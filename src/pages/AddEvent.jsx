import useFetch from '../hooks/useFetch'


export default function AddEvent() {
    const { data: area, isLoading, isError } = useFetch("10.0.3.83:5000/api/area")
    console.log(area, isLoading, isError);
    return (
        <div className="w-screen  overflow-x-hidden bg-secondary">
            <form className="w-[80vw] mx-auto mt-24 rounded-3xl bg-primary p-10 text-center">
                <h1 className="text-accent text-3xl font-semibold mb-12">Add Point</h1>
                <div className="flex flex-col ">
                    <input type="text" placeholder="name" />
                    <select name="" id=""></select>
                </div>

            </form>
            <form className="w-[80vw] mx-auto mt-24 rounded-3xl bg-primary p-10 text-center">
                <h1 className="text-accent text-3xl font-semibold mb-12">Add Event</h1>
                <div className="flex flex-col ">
                    <input type="text" placeholder="name" />
                    <textarea name="" id="" cols="30" rows="10" placeholder="description"></textarea>
                </div>

            </form>
        </div>
    )
}