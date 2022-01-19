import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./search.js"
import MainPage from "./main.js"


class BooksApp extends React.Component {
  state = {
    currently_reading:null,
    want_to_read:null,
    read:null,
    search_results: null,
    showSearchPage: false
  }
  search(q){
    BooksAPI.search(q,10)
    .then(d=>{
      if (! d){
        this.setState({search_results:null})
      }else{
      if (d.length>0){
      this.setState({search_results:d})
      }else{
        this.setState({search_results:null})
      }
      }
    })
     }
  initiate(){
  let cr=[]
  let wtr=[]
  let rrr=[]
  BooksAPI.getAll()
  .then(dd=> {
    dd.map(d=>{
    if(d.shelf==="currentlyReading"){
       cr.push(d)
    }else if (d.shelf==="wantToRead"){
       wtr.push(d)
    }else if (d.shelf==="read"){
       rrr.push(d)
    }
    return null
    })
    this.setState({currently_reading:cr,
    want_to_read:wtr,
    read:rrr })
}

  )


  }
  change_shelf(b,s){
    BooksAPI.update(b,s)
    .then(r=>{
      if (r){
      let cr=[]
      let wtr=[]
      let rrr=[]
      r.currentlyReading.map(rr=>BooksAPI.get(rr).then(d=>cr.push(d)))
      r.wantToRead.map(rr=>BooksAPI.get(rr).then(d=>wtr.push(d)))
      r.read.map(rr=>BooksAPI.get(rr).then(d=>rrr.push(d)))
      this.setState({currently_reading:cr,
    want_to_read:wtr,
    read:rrr })
    }
    }
    )
  }

  render() {
    this.initiate()
    return (
      <div className="app">
      <Routes>
            <Route path="/search" element={ <Search />}>

            </Route>
            <Route exact path="/" element={<MainPage />}>

            </Route>
      </Routes>

      </div>
    )
  }
}

export default BooksApp
