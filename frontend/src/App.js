import React, {useState, useEffect} from 'react'
import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./Components/home";
import NavigationBar from "./Components/navbar";
import Main from "./Components/main";
import EntryDetail from "./Components/detail";
import AddEntry from "./Components/addEntry";

export const FunctionDatabase = React.createContext()

const App = () => {
    const [entries, setEntries] = useState([])
    const [entry, setEntry] = useState({
        id: null,
        dateTime: '',
        description: ''
    })

    useEffect( () => {
        fetchEntries()
        console.log('im here')
    },[])

    const fetchEntries = async () => {
        const response = await fetch('https://vast-ocean-32435.herokuapp.com/api/entry-list/')
        const entries = await response.json()
        setEntries(entries)
    }

    const clearTextArea = () => {
        setEntry({
            ...entry,
            id: null,
            description: ''
        })
    }

    const deleteEntry = async (entry) => {
        await fetch(`https://vast-ocean-32435.herokuapp.com/api/entry-delete/${entry.id}/`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        await fetchEntries()
    }

    const editEntry = (entry) => {
        setEntry({
            ...entry,
            id: entry.id,
            description: entry.description
        })
    }

    const handleChange = (e) => {
        const value = e.target.value

        setEntry({
            ...entry,
            dateTime: new Date().toISOString(),
            description: value
        })

        // console.log(Entry)
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

        await fetchEntries()
    }

    return (
        <>
            <FunctionDatabase.Provider value={{fetchEntries, entries, clearTextArea, editEntry, deleteEntry }} >
                <Router>
                    <NavigationBar />

                    <Switch>
                        {/*<Route path={'/'} exact> <Home /> </Route>*/}
                        <Route path={'/'} exact> <Main /> </Route>
                        <Route path={'/detail/:id'} children={<EntryDetail />} />
                        <Route path={'/addEntry'} > <AddEntry /></Route>
                    </Switch>
                </Router>
            </FunctionDatabase.Provider>
        </>
    )
}


// { (match) => {
//                             console.log(entries)
//                             return(
//                                 <EntryDetail entry={(entries) => {entries.filter( (entry) =>
//                                 entry.id === parseInt(match.params.id,10))}} />
//                             )
//                         }}

export default App;

