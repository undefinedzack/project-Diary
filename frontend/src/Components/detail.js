import React, {useContext, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import './main'

import {FunctionDatabase} from "../App"

const EntryDetail = () => {


    const {fetchEntries, clearTextArea, entries, editEntry, deleteEntry} = useContext(FunctionDatabase)

    const [entry,setEntry] = useState({})
    const {id} = useParams()



    useEffect(() => {
        const entry = entries.find( (entry) => entry.id === parseInt(id))
        setEntry(entry)
        console.log(entry)
    },[])

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
            url = `http://127.0.0.1:8000/api/entry-update/${entry.id}/`
        else
            url = 'http://127.0.0.1:8000/api/entry-create/'

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

    return(
        <div className={"container mt-5"}>

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

            <div key={entry.id} className={"card mt-4"} >
                <div className={"card-body"}>
                    <button type={"button"} className={"btn btn-outline-secondary"} onClick={() => {editEntry(entry)}} >Edit</button>
                    <button type={"button"} className={"btn btn-outline-warning"} onClick={() => {deleteEntry(entry)} } >Delete</button>
                    <h5 className="card-title">Entry {entry.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{new Date(entry.dateTime).toDateString()}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{new Date(entry.dateTime).toTimeString()}</h6>
                    <h4>{entry.description}</h4>
                </div>
            </div>
        </div>

    )
}

export default EntryDetail
