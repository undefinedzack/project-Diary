import React, {useState, useEffect} from 'react'

const EditingSection = () => {

    const [entries, setEntries] = useState([])
    const [Entry, setEntry] = useState({
        id: null,
        dateTime: '',
        description: ''
    })

    useEffect( () => {
        fetchEntries()
        console.log('im here')
    },[])

    const fetchEntries = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/entry-list/')
        const entries = await response.json()
        setEntries(entries)
    }

    const clearTextArea = () => {
        setEntry({
            ...Entry,
            id: null,
            description: ''
        })
    }

    const deleteEntry = async (entry) => {
        await fetch(`http://127.0.0.1:8000/api/entry-delete/${entry.id}/`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        await fetchEntries()
    }

    const editEntry = (entry) => {
        setEntry({
            ...Entry,
            id: entry.id,
            description: entry.description
        })
    }

    const handleChange = (e) => {
        const value = e.target.value

        setEntry({
            ...Entry,
            dateTime: new Date().toISOString(),
            description: value
        })

        console.log(Entry)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let url

        if(Entry.id != null)
            url = `http://127.0.0.1:8000/api/entry-update/${Entry.id}/`
        else
            url = 'http://127.0.0.1:8000/api/entry-create/'

        await fetch(url,{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(Entry)
        })

        await fetchEntries()
    }


    return(
        <>
            <div className={"container"}>
                <h1>Entries</h1>
                <form onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-12">
                                <textarea value={Entry.description} onChange={handleChange} rows={"10"} cols={155} />
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <button type={"submit"} className={"btn btn-warning"}>Save</button>
                                <button className={"btn btn-secondary"} onClick={clearTextArea}>Clear</button>
                            </div>
                        </div>

                </form>

                {entries.map( (entry) => {
                    return(
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
                    )
                })}
            </div>
        </>
    )
}

export default EditingSection