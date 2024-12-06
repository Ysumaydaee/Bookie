import "./AddURL.css"
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useEffect, useState } from 'react';
const AddURL = ({ func, func2, val, arr }) => {
    var path = `categories/${val.addURLSearchBar_category}`;
    var catval = arr.find((e) => (
        e.name == val.addURLSearchBar_category))
    if (!val.addURLSearchBar_category)
        path = ""
    if (!catval)
        path = ""

    useEffect(() => {
        func({
            ...val,
            addURLSearchBar_URL: "",
            addURLSearchBar_bookmark: "",
            addURLSearchBar_category: ""
        })
    }, [])

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isURLValid = val.addURLSearchBar_URL.trim() !== "";
        const isMarkValid = val.addURLSearchBar_bookmark.trim() !== "";
        const isCatValid = val.addURLSearchBar_category.trim() !== "";

        setIsFormValid(isURLValid && isMarkValid && isCatValid);

    }, [val.addURLSearchBar_URL, val.addURLSearchBar_bookmark, val.addURLSearchBar_category])

    const Validate = (e) => {
        if (isFormValid) {

            if (catval) {
               
                if (catval.bookmarks.find((mark) => (
                        mark.bookmark_name === val.addURLSearchBar_bookmark
                    ))) {
                    alert(`This bookmark already exists! you can modify it from Category: ${val.addURLSearchBar_category}`)
                    return false;
                }

                else{
                    func2()
                    alert("Form submitted successfully!")
                    return true;
                }

            }

            else {
                alert("Category doesn't exist!")
                return false;
            }

        }

        else {
            alert("Please fill all fields!")
            return false;
        }

    }

    

    return (
        <div className="addURL">
            <h1 id="addcatheader">Add URL</h1>
            <form onSubmit={Validate}>
                <div className="searchBarsForUrl">
                    <label className="labels" htmlFor="">URL</label>
                    <SearchBar setterValue={"addURLSearchBar_URL"} value={val} placeHolder="Paste URL here..." func={func} />
                </div>
                <div className="searchBarsForUrl">
                    <label className="labels" htmlFor="">Bookmark</label>
                    <SearchBar setterValue={"addURLSearchBar_bookmark"} value={val} placeHolder="Enter a name for your bookmark..." func={func} />
                </div>
                <div className="searchBarsForUrl">
                    <label className="labels" htmlFor="">Category</label>
                    <SearchBar setterValue={"addURLSearchBar_category"} value={val} placeHolder="Select a category..." list="options" array={arr} func={func} />
                </div >
                <div className="buttons2">
                    <Button formHandler={Validate} type="submit" text="Add URL " path={path}/>
                </div>
            </form>
            <div className="buttons">
                <Button text="Back" path="" />
            </div>

        </div>
    )
}


export default AddURL;