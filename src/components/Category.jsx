import { useEffect } from "react"
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Category.css"
//use useEffect to fetch URLs images of each category on load, and put them next to the bookmark name
const Category = ({ arr, func }) => {
    const params = useParams();
    const name = params.name;
    const cat = arr.find((catObj) => (
        catObj.name == name
    ))


    if (arr.find((cat) => (cat.name == name))) {
        return (

            <div className="catPage">
                <br />
                <h1>Category: {name}</h1>
                <div id="bookmarkSearch">
                    <SearchBar placeHolder="Enter bookmark name" />
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
                        cat.bookmarks.map((mark) => (
                            <div id={mark.bookmark_name}>
                                <div id="styler">
                                <ul>
                                    <li><a target="_blank" href={mark.URL}>{mark.bookmark_name}</a></li>
                                    <li>{mark.URL}</li>
                                    {/* Old value of first button bath is: path={`categories/${name}/${mark.bookmark_name}`} .change path of edit to the addURL compoennt with save url as name of the lower button, and auto fill values from mark to the page. changes are the name of h1, and the button from addURL to saveURL */}
                                    <li><span id="green"><Button path={`add-URL`} text="edit" /></span>
                                    <span><Button func={func} path={`categories/${name}`} text="delete"  category={name} reference={mark.bookmark_name}/></span>
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