import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom";

import {FunctionDatabase} from "../App"
    const Main = () => {
    const {entries, deleteEntry} = useContext(FunctionDatabase)

    return(
        <>
                <div className={"container"}>
                    <div className={"row mt-2"}>
                        <div className={"col-4"}>
                            <h1>Entries</h1>
                        </div>
                        <div className={"col-4"}>
                        </div>
                        <div className={"col-4 mt-2"}>
                            <Link to={'/addEntry'}><button type={"button"} className={"btn btn-outline-success"}>Add Entry</button> </Link>
                        </div>
                    </div>


                    {entries.map( (entry) => {
                        console.log(entry)
                        return(
                            <div key={entry.id} className={"card mt-4"} >
                                <div className={"card-body"}>
                                    {/*<button type={"button"} className={"btn btn-outline-secondary"} onClick={() => {editEntry(entry)}} >Edit</button>*/}
                                    <button type={"button"} className={"btn btn-outline-warning"} onClick={() => {deleteEntry(entry)} } >Delete</button>
                                    <Link to={`detail/${entry.id}`}><button type={"button"} className={"btn btn-outline-primary"}>Details</button></Link>
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

export default Main