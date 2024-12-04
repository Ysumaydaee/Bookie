import SearchBar from "./SearchBar"
import "./AddCategory.css"
import {useEffect } from 'react';
import Button from "./Button"
const AddCategory = ({ func, func2, val }) => {

    useEffect(() => {
        func("")
      }, [])
    return (
        <div className="addCat">
                <h1 id="addcatheader">Add Category</h1>
                <SearchBar value={val} placeHolder="Enter category name.." func={func} />
                <div className="buttons">
                    <Button text="Back" path="" />
                </div>
                <div className="buttons2">
                    <Button text="Add Category " path="" func={func2} />
                </div>
        </div>
    )
}

export default AddCategory;