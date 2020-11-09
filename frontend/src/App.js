import React, {Component} from 'react'
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Home from "./Components/home";
import EntryDetail from "./Components/entryDetail";
import AddEntry from "./Components/addEntry";
import NavigationBar from "./Components/navbar";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
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


    render() {
        var entries = this.state.entryList

    return (
        <>
            <Router>
                <NavigationBar />

                <Switch>
                    <Route path={'/'} exact component={ () => <Home entries={entries} /> } />
                    <Route path={'/detail/:id'} component={({ match }) =>
                        <EntryDetail entry={entries.filter((entry) =>
                            entry.id === parseInt(match.params.id,10),
                            console.log(match)
                    )}  /> } />

                    <Route path={'/addEntry'} component={AddEntry} />
                </Switch>
            </Router>

        </>

    )
  }
}

export default App;

