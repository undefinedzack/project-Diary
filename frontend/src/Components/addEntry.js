import React, {useState, useEffect, useContext} from 'react'

import {FunctionDatabase} from "../App"

const AddEntry = () => {
    const {fetchEntries, clearTextArea} = useContext(FunctionDatabase)
    const [entry,setEntry] = useState({})

    const handleChange = (e) => {
        const value = e.target.value

        setEntry({
            ...entry,
            dateTime: new Date().toISOString(),
            description: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let url

        if(entry.id != null)
            url = `https://vast-ocean-32435.herokuapp.com/api/entry-update/${entry.id}/`
        else
            url = 'https://vast-ocean-32435.herokuapp.com/api/entry-create/'

        await fetch(url,{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(entry)
        })

        console.log('submmited')

        await fetchEntries()

    }

    return (
        <div className={"container mt-5"}>
            <h3>Description</h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <textarea value={entry.description} onChange={handleChange} rows={"10"} cols={155} />
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <button type={"submit"} className={"btn btn-warning"}>Save</button>
                        <button className={"btn btn-secondary"} onClick={clearTextArea}>Clear</button>
                    </div>
                </div>
            </form>
        </div>

        )
}

export default AddEntry