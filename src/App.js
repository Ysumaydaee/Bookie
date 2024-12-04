import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import Home from './components/Home';
import AddCategory from './components/AddCategory';
import { useState, useEffect } from 'react';
import Category from './components/Category';
import AddURL from './components/AddURL';

function App() {

  const [catArray, setCatArray] = useState([])
  const [CatSearch, setCatSearch] = useState("");
  const [catValueForURL, setCatValueForURL] = useState("");
  const [bookmark, setBookmark] = useState("");
  const [URL, setURL] = useState("");

  const setCatSearchValue = (searchValue) => {
    setCatSearch(searchValue)
  }
  const CatValueForURL = (value) => {
    setCatValueForURL(value)
  }

  const setURLForBookmark = (value) => {
    setURL(value)
  }

  const setBookmarkFunc = (value) => {
    setBookmark(value)
  }


  const addCat = () => {
    if (CatSearch) {
      var arr = [...catArray]
      if (!arr.find((cat) => (cat.name === CatSearch))) {
        arr.push({ name: CatSearch, bookmarks: [] })
        setCatArray(arr)
        setCatSearch("")
      }
    }

  }

  const addURL = () => {
    if (catValueForURL) {
      var catval = catArray.find((cat) => (
        cat.name === catValueForURL
      ))
      if (catval) {
        //check for redundunat bookmar. if exists, don't create new one
        var markExists = catval.bookmarks.find((mark) => (
          mark.bookmark_name === bookmark
        ))
        
        if (!markExists) {
          if (URL && bookmark) {
            catval.bookmarks.push({ bookmark_name: bookmark, URL: URL })
          }
        }
      }

    }
    

  }

  const deleteMark = (markName, categoryName)=> {
    
    const catval = catArray.find((cat) => cat.name === categoryName);
  
    if (catval) {
      catval.bookmarks = catval.bookmarks.filter(bookmark => bookmark.bookmark_name !== markName);
      setCatArray([...catArray]); 
    }

  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home catArray={catArray} />}></Route>
        <Route path='/categories/:name' element={<Category arr={catArray} func={deleteMark}/>} />
        <Route path='/add-category' element={<AddCategory func={setCatSearchValue} func2={addCat} val={CatSearch} />}></Route>
        <Route path='/add-URL' element={<AddURL catValue={catValueForURL} func={CatValueForURL} func2={setURLForBookmark} func3={setBookmarkFunc} func4={addURL} val={catValueForURL} val2={bookmark} val3={URL} arr={catArray} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
