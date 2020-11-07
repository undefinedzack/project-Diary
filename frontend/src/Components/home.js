import React, {Component} from 'react'
import {Link} from "react-router-dom";

class Home extends Component{

    render() {
        return (
            <div className={"container mt-4"}>
                { this.props.entries.map( (entry, index) => {
                    return(
                        <div key={index} className="card">
                          <div className="card-body">
                              <h5 className="card-title">{index}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{entry.dateTime}</h6>
                            <p className="card-text">{entry.description}</p>
                            <Link to={`/detail/${entry.id}`} className="card-link">Card link</Link>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                      </div>
                        )

                    } )}
            </div>
        )
    }
}

export default Home