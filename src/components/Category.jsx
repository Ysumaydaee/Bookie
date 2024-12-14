import { useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useParams, Link } from "react-router-dom";
import "./Category.css"
const Category = ({ arr, val, val2, func2 }) => {
    const params = useParams();
    const name = params.name;


    const [bookmarks, setBookMakrs] = useState([]);
    const [currentCatMarks, setCurrentCatMarks] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const fetchCatMarks = async () => {

            const response = await fetch("http://localhost:3001/api/FetchAllBookmarks.php");
            const respJson = await response.json();
            var allBookmarks = [];
            if (!respJson['message']) {
                allBookmarks = respJson;
            }
            else
                allBookmarks = respJson.bookmarks;


            const categoryBookmarks = allBookmarks.filter((mark) => mark.cat_id == val2);
            setCurrentCatMarks(categoryBookmarks); // Store all bookmarks for the category
            setBookMakrs(categoryBookmarks); // Initialize filtered bookmarks

        };

        func2({ ...val, allBookmarksSearchBar: "" })
        fetchCatMarks();
        setFlag(false)
    }, [val2, flag]);



    useEffect(() => {
        const marks = currentCatMarks.filter((mark) => (mark.title.includes(val.allBookmarksSearchBar)))
        setBookMakrs(marks)
    }, [val.allBookmarksSearchBar])


    const deleteMark = (markName, markId) => {
        const markid = markId;
        const deleteBookmark = async () => {
            const requestOpts = {
                method: 'DELETE',
                //convert to http json format 
                body: JSON.stringify({
                    mark_id: markid
                })
            }
            await fetch("http://localhost:3001/api/deleteMark.php", requestOpts)
        }
        setFlag(true)
        deleteBookmark();
        alert("bookmark deleted successfully!");

    }



    function prepValues(markname, url) {
        func2({
            ...val, defaultURL: url,
            defaultBookmark: markname,
            defaultCategory: name
        })
    }

    function deleteCategory() {
        const catval = arr.find((cat) => (cat.title == name));
        const deleteCat = async () => {
            const requestOpts = {
                method: 'DELETE',
                //convert to http json format 
                body: JSON.stringify({
                    cat_id: catval.id
                })
            }
            await fetch("http://localhost:3001/api/deleteCategory.php", requestOpts)
        }
        deleteCat();
        alert("Category deleted successfully!");
    }

    return (

        <div className="catPage">
            <br />
            <h1>Category: {name}</h1>
            <div id="deleteCategory">
                <Button path="" text="Delete Category" func={deleteCategory} />
            </div>
            <div id="bookmarkSearch">
                <SearchBar options="title" setterValue={"allBookmarksSearchBar"} array={currentCatMarks} list="options" func={func2} value={val} placeHolder="Enter bookmark name..." />
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

                        <div key={mark.mark_id} id={mark.mark_id}>
                            <div id="styler">
                                <ul>
                                    <li><Link target="_blank" to={mark.link}>{mark.title}<br /> <br /><img width="30" src={`https://www.google.com/s2/favicons?domain=${mark.link}`} alt={mark.link} /></Link></li>
                                    <li>{mark.link}</li>
                                    {/* Old value of first button bath is: path={`categories/${name}/${mark.bookmark_name}`} .change path of edit to the addURL compoennt with save url as name of the lower button, and auto fill values from mark to the page. changes are the name of h1, and the button from addURL to saveURL */}
                                    <li><span id="green"><Button func={() => { prepValues(mark.title, mark.link) }} path={`categories/${name}/${mark.title}`} text="edit" /></span>
                                        <span><Button func={deleteMark} path={`categories/${name}`} text="delete" category={mark.mark_id} reference={mark.title} /></span>
                                        <br />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="buttons">
                    <Button path="" text="Back" />
                </div>
        </div>
    )
}


export default Category;