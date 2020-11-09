import React, {Component} from 'react'

class AddEntry extends Component{

    constructor(props) {
        super(props);
        this.state = {
            entry: {
                dateTime: '',
                description:'',
            },
        }

        this.fetchEntires = this.fetchEntires.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
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
        console.log(Math.round((new Date()).getTime() / 1000))
        console.log('Entry: ', this.state.entry)

        var csrftoken = this.getCookie('csrftoken')

        var url = 'http://127.0.0.1:8000/api/entry-create/'
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(this.state.entry)
        }).then( (response) => {
            this.fetchEntires()
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



    render() {
        return (
            <div className={"container"}>
                <form onSubmit={this.handleSubmit}>
                    {/*<div className={"form-group"}>*/}
                    {/*    <label htmlFor={"date"}>Date</label>*/}
                    {/*    <input onChange={this.handleTextInput} type={"date"} id={"date"} className={"form-control"}/>*/}
                    {/*</div>*/}
                    {/*<div className={"form-group"}>*/}
                    {/*    <label htmlFor={"time"}>Time</label>*/}
                    {/*    <input onChange={this.handleTextInput} type={"time"} id={"time"} className={"form-control"}/>*/}
                    {/*</div>*/}
                    <div className={"form-group"}>
                        <label htmlFor={"description"}>Description</label>
                        <input onChange={this.handleTextInput} type={"text"} id={"description"} className={"form-control"}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}

export default AddEntry