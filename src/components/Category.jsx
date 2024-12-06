import { useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useParams } from "react-router-dom";
import "./Category.css"
//use useEffect to fetch URLs images of each category on load, and put them next to the bookmark name
const Category = ({ val, arr, func, func2 }) => {
    const params = useParams();
    const name = params.name;
    const cat = arr.find((catObj) => (
        catObj.name == name
    ))

    const [bookmarks, setBookMakrs] = useState([]);

    useEffect(()=>{
        func2({...val, allBookmarksSearchBar:""})
    },[])

    useEffect(()=> {
        console.log(bookmarks)
        console.log(val.allBookmarksSearchBar)

        const marks = cat.bookmarks.filter((mark)=>(mark.bookmark_name.includes(val.allBookmarksSearchBar)))
        setBookMakrs(marks)
    },[val.allBookmarksSearchBar, cat.bookmarks])

    if (arr.find((cat) => (cat.name == name))) {
        return (

            <div className="catPage">
                <br />
                <h1>Category: {name}</h1>
                <div id="bookmarkSearch">
                    <SearchBar setterValue={"allBookmarksSearchBar"} array={cat.bookmarks} list="options" func={func2} value={val} placeHolder="Enter bookmark name..." />
                </div>
                <div className="catGuide">
                    <ul>
                        <li>Bookmark Name</li>
                        <li>URL</li>
                        <li>Actions</li>
                    </ul>
                </div>
                <br />
                <div id="results">
                    {
                        bookmarks.map((mark) => (
                            <div key={mark.bookmark_name} id={mark.bookmark_name}>
                                <div id="styler">
                                <ul>
                                    <li><a target="_blank" href={mark.URL}>{mark.bookmark_name}</a></li>
                                    <li>{mark.URL}</li>
                                    {/* Old value of first button bath is: path={`categories/${name}/${mark.bookmark_name}`} .change path of edit to the addURL compoennt with save url as name of the lower button, and auto fill values from mark to the page. changes are the name of h1, and the button from addURL to saveURL */}
                                    <li><span id="green"><Button path={`add-URL`} text="edit" /></span>
                                    <span><Button func={func} path={`categories/${name}`} text="delete" category={name} reference={mark.bookmark_name}/></span>
                                    </li>
                                </ul>
                            </div>
                            </div>
                        ))}
                        <div className="buttons">
                        <Button path="" text="Back" />
                </div>
                </div>
            </div>
        )
    }
}

export default Category;