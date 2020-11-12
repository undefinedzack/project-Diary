import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class EntryDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            entry: {
                dateTime: '',
                description:'',
            },
            editing: false,
        }
        this.handleTextInput = this.handleTextInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editDescription = this.editDescription.bind(this)
        this.deleteEntry = this.deleteEntry.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.fetchEntires = this.fetchEntires.bind(this)
    }

    //for CSRF token { source -> https://docs.djangoproject.com/en/3.1/ref/csrf/ }
     getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    editDescription(entry){
        this.setState({
            entry: entry,
            editing: true
        })
    }

    deleteEntry(entry){
        var csrftoken = this.getCookie('csrftoken')

        fetch(`http://127.0.0.1:8000/api/entry-delete/${entry.id}/`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        }).then((response) =>{
            this.fetchEntires()
        })
    }

    handleTextInput(t){
        var value = t.target.value

        this.setState({
            entry: {
                ...this.state.entry,
                [t.target.id]: value,
                dateTime: new Date().toISOString()
            }
        })

        console.log(this.state.entry)
    }

    handleSubmit(t){
        t.preventDefault()

        var csrftoken = this.getCookie('csrftoken')

        var url = 'http://127.0.0.1:8000/api/entry-create/'

        if(this.state.editing === true){
            url = `http://127.0.0.1:8000/api/entry-update/${this.state.entry.id}/`
            this.setState({
                editing: false
            })
        }

        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(this.state.entry)
        }).then( (response) => {
            window.location.reload(false)
            this.fetchIt()
            this.setState({
                entry: {
                    dateTime: '',
                    description:'',
                }
            })

        }).catch( (error) => {
            console.log('Error',error)
        })
    }



    fetchEntires(){
        console.log('Fetching.......')
        fetch('http://127.0.0.1:8000/api/entry-list/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    entryList: data
                })
            )
    }


    render() {
        return (
            <div className={"container mt-4"}>
                { this.props.entry.map( (entry, index) => {
                    return(
                        <div key={index} className="card mt-3">
                            <button onClick={ () => {this.editDescription(entry) }} type="button" className="btn btn-outline-warning">Edit</button>
                            {/*<Link to={'/'}>*/}
                                <button onClick={ () => {this.deleteEntry(entry)}} type="button" className="btn btn-outline-warning">Delete</button>
                            {/*</Link>*/}


                          <div className="card-body">
                              <h5 className="card-title">{entry.id}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{new Date(entry.dateTime).toDateString()}</h6>
                              <h6 className="card-subtitle mb-2 text-muted">{new Date(entry.dateTime).toTimeString()}</h6>
                              <h1 className={"card-text"}>There it is...</h1>
                              <p className="card-text">{entry.description}</p>
                              <form onSubmit={this.handleSubmit}>
                                  <input value={this.state.entry.description} onChange={this.handleTextInput} type={"text"} id={"description"} className={"form-control"}/>
                                  <button type="submit" className="btn btn-primary">Submit</button>
                              </form>

                        </div>
                      </div>
                        )
                    } )}
            </div>
        )
    }
}

export default EntryDetail