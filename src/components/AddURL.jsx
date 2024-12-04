import "./AddURL.css"
import SearchBar from "./SearchBar";
import Button from "./Button";
import {useEffect } from 'react';
const AddURL = ({ catValue, func, func2, func3, func4, val, val2, val3 ,arr }) => {
    var path = `categories/${catValue}`;
    if (!catValue)
        path = ""
    if (!arr.find((cat) => (
        cat.name == catValue
    )))
        path = ""
        useEffect(() => {
            func("")
            func2("")
            func3("")
          }, [])
    return (
        <div className="addURL">
            <h1 id="addcatheader">Add URL</h1>
            <div className="searchBarsForUrl">
                <label className="labels" htmlFor="">URL</label>
                <SearchBar value={val3} placeHolder="Paste URL here" func={func2} />
            </div>
            <div className="searchBarsForUrl">
                <label className="labels" htmlFor="">Bookmark</label>
                <SearchBar value={val2} placeHolder="Enter a name for your bookmark" func={func3} />
            </div>
            <div className="searchBarsForUrl">
                <label className="labels" htmlFor="">Category</label>
                <SearchBar value={val} placeHolder="Select a category" list="options" array={arr} func={func} />
            </div >
            <div className="buttons">
                <Button text="Back" path=""/>
            </div>
            <div className="buttons2">
                <Button text="Add URL " path={path}  func={func4} />
            </div>

        </div>
    )
}


export default AddURL;