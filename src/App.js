import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import Home from './components/Home';
import AddCategory from './components/AddCategory';
import { useState, useEffect } from 'react';
import Category from './components/Category';
import AddURL from './components/AddURL';

function App() {

  const [catArray, setCatArray] = useState([])
  const [searchBars, setSearchBars] = useState({
    addCategorySearchBar:"",
    addURLSearchBar_URL:"",
    addURLSearchBar_bookmark:"",
    addURLSearchBar_category:"",
    allCategoriesSearchBar:"",
    allBookmarksSearchBar:""
  })

  const addCat = () => {
    if (searchBars.addCategorySearchBar) {
      var arr = [...catArray]
      if (!arr.find((cat) => (cat.name === searchBars.addCategorySearchBar))) {
        arr.push({ name: searchBars.addCategorySearchBar, bookmarks: [] })
        setCatArray(arr)
      }
    }

  }

  const addURL = () => {
    if (searchBars.addURLSearchBar_category) {
      var catval = catArray.find((cat) => (
        cat.name === searchBars.addURLSearchBar_category
      ))
      if (catval) {
        //check for redundunat bookmar. if exists, don't create new one
        var markExists = catval.bookmarks.find((mark) => (
          mark.bookmark_name === searchBars.addURLSearchBar_bookmark
        ))
        
        if (!markExists) {
          if (searchBars.addURLSearchBar_URL && searchBars.addURLSearchBar_bookmark) {
            catval.bookmarks.push({ bookmark_name: searchBars.addURLSearchBar_bookmark, URL: searchBars.addURLSearchBar_URL })
          }
        }
      }

    }
    

  }
  const deleteMark = (markName, categoryName)=> {
    
    const catval = catArray.find((cat) => cat.name === categoryName);
  
    if (catval) {
      catval.bookmarks = catval.bookmarks.filter((bookmark) => bookmark.bookmark_name !== markName);
      setCatArray([...catArray]); 
    }

  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home val={searchBars} func={setSearchBars} catArray={catArray} />}></Route>
        <Route path='/categories/:name' element={<Category val={searchBars} arr={catArray}  func={deleteMark} func2={setSearchBars}/>} />
        <Route path='/add-category' element={<AddCategory arr={catArray} func={setSearchBars} func2={addCat} val={searchBars} />}></Route>
        <Route path='/add-URL' element={<AddURL func={setSearchBars} func2={addURL} val={searchBars} arr={catArray} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
