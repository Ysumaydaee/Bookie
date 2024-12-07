import { useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useParams, Link } from "react-router-dom";
import "./Category.css"
//use useEffect to fetch URLs images of each category on load, and put them next to the bookmark name
const Category = ({ val, arr, func, func2 }) => {
    const params = useParams();
    const name = params.name;
    const cat = arr.find((catObj) => (
        catObj.name == name
    ))

    const [bookmarks, setBookMakrs] = useState([]);
    const [favIcons, setFavIcons] = useState([]);


    useEffect(() => {
        func2({ ...val, allBookmarksSearchBar: "" })
    }, [])

    //this is delayed for some reason, it renders correctly but it can't be used in another useEffect
    useEffect(() => {
        const marks = cat.bookmarks.filter((mark) => (mark.bookmark_name.includes(val.allBookmarksSearchBar)))
        setBookMakrs(marks)
    }, [val.allBookmarksSearchBar, cat.bookmarks])


    //Find an api that returns json only
    useEffect(() => {
        const fetching = (async () => {
            var requestOptions = {
                method: 'GET'
            };

            const arr = [...favIcons]
            cat.bookmarks.forEach(async (mark) => {
                try {
                    const response = await fetch(`https://api.microlink.io/?url=https://${mark.URL}`, requestOptions)
                    const data = await response.json()
                    const img = data.data.logo.url;
                    arr.push(img)
                    console.log(img)
                    setFavIcons(arr)
                } catch (e) {
                    //fill with placeholder in case of 404
                    console.log("website is incorrect or an issue happened while fetching, replacing with place holder")
                    arr.push("https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg")
                    setFavIcons(arr)
                }
            })
        })
        fetching();
    }, [])


   
    if (arr.find((cat) => (cat.name == name))) {
        return (

            <div className="catPage">
                <br />
                <h1>Category: {name}</h1>
                <div id="bookmarkSearch">
                    <SearchBar options="bookmark_name" setterValue={"allBookmarksSearchBar"} array={cat.bookmarks} list="options" func={func2} value={val} placeHolder="Enter bookmark name..." />
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
                                        <li><Link target="_blank" to={mark.URL}>{mark.bookmark_name}</Link></li>
                                        <li>{mark.URL}</li>
                                        {/* Old value of first button bath is: path={`categories/${name}/${mark.bookmark_name}`} .change path of edit to the addURL compoennt with save url as name of the lower button, and auto fill values from mark to the page. changes are the name of h1, and the button from addURL to saveURL */}
                                        <li><span id="green"><Button path={`add-URL`} text="edit" /></span>
                                            <span><Button func={func} path={`categories/${name}`} text="delete" category={name} reference={mark.bookmark_name} /></span>
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