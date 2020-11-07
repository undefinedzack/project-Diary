import React, {Component} from 'react'
import {Link} from "react-router-dom";

class EntryDetail extends Component{
    render() {
        return (
            <div className={"container mt-4"}>
                { this.props.entry.map( (ent, index) => {
                    return(
                        <div key={index} className="card">
                          <div className="card-body">
                              <h5 className="card-title">{index}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{ent.dateTime}</h6>
                            <p className="card-text">{ent.description}</p>
                        </div>
                      </div>
                        )

                    } )}
            </div>
        )
    }
}

export default EntryDetail