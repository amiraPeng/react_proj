import React from 'react'
import {  Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'


class MainPage extends React.Component {
  state = {
    currently_reading:null,
    want_to_read:null,
    read:null,
    search_results: null,
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
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

 					{  this.state.currently_reading &&  this.state.currently_reading.map(book=>(
                       <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                   	     {book.imageLinks  ?
                               <div className="book-cover" style={{ width: 128, height: 193,
                                 backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                                 	></div>
                                  :
                                     <div className="book-cover" style={{ width: 128, height: 193,
                                 }}
                                 	></div>}


                            <div className="book-shelf-changer">
                              <select onChange={(e)=>this.change_shelf(book,e.target.value)}>
                                <option value="move"  >Move to...</option>
                                 <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors  ? book.authors : 'not found' }</div>
                        </div>
                      </li>
                    )
                )


                    }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
  			{  this.state.want_to_read &&  this.state.want_to_read.map(book=>(
                       <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                   	     {book.imageLinks  ?
                               <div className="book-cover" style={{ width: 128, height: 193,
                                 backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                                 	></div>
                                  :
                                     <div className="book-cover" style={{ width: 128, height: 193,
                                 }}
                                 	></div>}


                            <div className="book-shelf-changer">
                              <select onChange={(e)=>this.change_shelf(book,e.target.value)}>
                                <option value="move" >Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors  ? book.authors : 'not found' }</div>
                        </div>
                      </li>
                    )
                )


                    }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
         		{  this.state.read &&  this.state.read.map(book=>(
                       <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                   	     {book.imageLinks  ?
                               <div className="book-cover" style={{ width: 128, height: 193,
                                 backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                                 	></div>
                                  :
                                     <div className="book-cover" style={{ width: 128, height: 193,
                                 }}
                                 	></div>}


                            <div className="book-shelf-changer">
                              <select onChange={(e)=>this.change_shelf(book,e.target.value)}>
                                <option value="move" >Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors  ? book.authors : 'not found' }</div>
                        </div>
                      </li>
                    )
              	  )
                 }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">

              <Link   className="open-search" to="/search" >Add a book</Link>
            
            </div>
          </div>
        )}

}

export default MainPage
