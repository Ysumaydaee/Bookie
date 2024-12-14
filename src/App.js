import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import Home from './components/Home';
import AddCategory from './components/AddCategory';
import { useState } from 'react';
import Category from './components/Category';
import AddURL from './components/AddURL';

function App() {


  const [catArray, setCatArray] = useState([])
  const [catMarkArray, setCatMarkArray] = useState([])
  const [idState, setIdState] = useState(null)
  const [searchBars, setSearchBars] = useState({
    addCategorySearchBar: "",
    addURLSearchBar_URL: "",
    addURLSearchBar_bookmark: "",
    addURLSearchBar_category: "",
    allCategoriesSearchBar: "",
    allBookmarksSearchBar: "",
    defaultURL: "",
    defaultBookmark:"",
    defaultCategory: ""
  })

  //recalled each time we modify a categories table
  const fetchCats = (async () => {
    const response = await fetch("http://localhost:3001/api/FetchAllCategories.php")
    const respJson = await response.json()
    if (!respJson['message'])
      setCatArray(respJson);
    else
      setCatArray(respJson.categories);

  })


  const fetchCat_Marks =  () => {
    const fetchMarksByCatId = (async () => {
      const response = await fetch("http://localhost:3001/api/FetchAllBookmarks.php")
      const respJson = await response.json()
      if (!respJson['message']) {
        setCatMarkArray(respJson);
      }
      else
        setCatMarkArray(respJson.bookmarks);


    })
    fetchMarksByCatId();
  }


  const addCat = () => {
    if (searchBars.addCategorySearchBar) {
      var arr = [...catArray]
      if (!arr.find((cat) => (cat.title === searchBars.addCategorySearchBar))) {

        //need to add auth data root and password?
        const createCat = (async () => {
          const requestOpts = {
            method: 'POST',
            //convert to http json format 
            body: JSON.stringify({
              cat_title: searchBars.addCategorySearchBar
            })
          }
          await fetch("http://localhost:3001/api/createCategory.php", requestOpts)
          // fetchCats();//this is an extra fetch(); its purpose was to keep the array uptodate whenever we add
        })

        createCat();
      }
    }

  }

  const addURL = (id) => {
    if (searchBars.addURLSearchBar_category) {
      const catId = catArray.find((cat) => cat.title == searchBars.addURLSearchBar_category)
      if (catId) {
        //check for redundunat bookmar. if exists, don't create new one
        const marksForCatId = catMarkArray.filter((mark) => mark.cat_id == id)
        var markExists = marksForCatId.find((mark) => (
          mark.title === searchBars.addURLSearchBar_bookmark
        ))
        if (!markExists) {
          if (searchBars.addURLSearchBar_URL && searchBars.addURLSearchBar_bookmark) {
            const createBookmark = async () => {
              const requestOpts = {
                method: 'POST',
                //convert to http json format 
                body: JSON.stringify({
                  cat_id: id,
                  mark: searchBars.addURLSearchBar_bookmark,
                  link: searchBars.addURLSearchBar_URL
                })
              }
              await fetch("http://localhost:3001/api/createBookmark.php", requestOpts)
            }

            createBookmark();

          }
        }
      }

    }


  }
  
  function editMark(){

  }  



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home val={searchBars} func={setSearchBars} func2={fetchCats} func3={setIdState} func4={fetchCat_Marks} catArray={catArray} />}></Route>
        <Route path='/categories/:name' element={<Category arr={catArray} val={searchBars} val2={idState} func2={setSearchBars} />} />
        <Route path='/add-category' element={<AddCategory arr={catArray} func={setSearchBars} func2={addCat} val={searchBars} />}></Route>
        <Route path='/add-URL' element={<AddURL func={setSearchBars} func2={addURL}  func3={setIdState} val={searchBars} arr={catArray} arr2={catMarkArray} />}></Route>
        <Route path='/categories/:name/:mark' element={<AddURL func4={fetchCat_Marks} version="editMark" func={setSearchBars} func2={addURL}  func3={setIdState} val={searchBars} arr={catArray} arr2={catMarkArray} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
