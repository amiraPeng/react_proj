import React from 'react'
import {  Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'


class Search extends React.Component {
  state = {
    currently_reading:[],
    want_to_read:[],
    read:[],
    search_results: null,
  }
  search(q){
    BooksAPI.search(q,10)
    .then(d=>{
      if (! d){
        this.setState({search_results:null})
      }else{
      if (d.length>0){
      let dd=[]
    d.forEach((book)=>{
      let shelf;

      if ( this.state.currently_reading.some(b => b.title === book.title)){
          shelf="currentlyReading"
      }else if(
               this.state.want_to_read.some(b => b.title === book.title)
          ){
          shelf="wantToRead"
      }else if(
               this.state.read.some(b => b.title === book.title)
              ){
          shelf="read"
      }
      dd.push({"shelf":shelf,"book":book})
      })
      this.setState({search_results:dd})

      }else{
        this.setState({search_results:null})
      }
      }
    })
     }

  change_shelf(b,s){
    BooksAPI.update(b,s)
    .then(r=>{
      if (r){
      let cr=[]
      let wtr=[]
      let rrr=[]
      r.currentlyReading.map(rr=>BooksAPI.get(rr).then(d=>{
                                                       cr.push(d)
     														 }
                                                      ))
      r.wantToRead.map(rr=>BooksAPI.get(rr).then(d=>{
                                                 wtr.push(d)
                                             }))
      r.read.map(rr=>BooksAPI.get(rr).then(d=>{
        							rrr.push(d)

      }))
      this.setState({currently_reading:cr,
    want_to_read:wtr,
    read:rrr })
    }
    }
    )
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
  render(){
  this.initiate()
  return (
       <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>

              <div className="search-books-input-wrapper">

                <input type="text" onChange={(e)=>this.search(e.target.value)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
					{  this.state.search_results &&  this.state.search_results.map(book=>(
                       <li key={book.book.id}>
                        <div className="book">
                          <div className="book-top">
                   	     {book.book.imageLinks  ?
                               <div className="book-cover" style={{ width: 128, height: 193,
                                 backgroundImage: `url(${book.book.imageLinks.thumbnail})`}}
                                 	></div>
                                  :
                                     <div className="book-cover" style={{ width: 128, height: 193,
                                 }}
                                 	></div>
                                    }


                            <div className="book-shelf-changer">
                              <select onChange={(e)=>this.change_shelf(book.book,e.target.value)}
                                  value={book.shelf}
                              >
                                <option value="move" >Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.book.title}</div>
                          <div className="book-authors">{book.book.authors  ? book.book.authors : 'not found' }</div>
                        </div>
                      </li>
                    )
                )


                    }
              </ol>
            </div>
          </div>
        )
        }
}
export default Search
