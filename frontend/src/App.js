import React, {Component} from 'react'
import './App.css';
import NavigationBar from "./navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/home";
import EntryDetail from "./Components/entryDetail";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
            entry: {
                id:null,
                description:'',
            },
            editing:false
        }

        this.fetchEntires = this.fetchEntires.bind(this)
    }

    componentDidMount() {
        this.fetchEntires()
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

    handleChange

    render() {
        var entries = this.state.entryList

    return (
        <>
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route path={'/'} exact component={ () => <Home entries={entries} /> } />
                    <Route path={'/detail/:id'} component={({ match }) =>
                        <EntryDetail entry={entries.filter((entry) =>
                            entry.id === parseInt(match.params.id,10),
                            console.log(match)
                    )}  /> } />
                </Switch>
            </Router>

        </>

    )
  }
}

export default App;
