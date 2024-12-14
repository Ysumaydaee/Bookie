import "./AddURL.css"
import SearchBar from "./SearchBar";
import Button from "./Button";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
const AddURL = ({ version = "", func, func2, func3, func4 = () => { }, val, arr, arr2 }) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSaveFormValid, setIsSaveFormValid] = useState(false);
    const params = useParams();
    const mark = params.mark;



    useEffect(() => {
        func({
            ...val,
            addURLSearchBar_URL: "",
            addURLSearchBar_bookmark: "",
            addURLSearchBar_category: ""
        })
        func4()
    }, [])

    useEffect(() => {
        const isURLValid = val.addURLSearchBar_URL.trim() !== "";
        const isMarkValid = val.addURLSearchBar_bookmark.trim() !== "";
        const isCatValid = val.addURLSearchBar_category.trim() !== "";

        setIsFormValid(isURLValid && isMarkValid && isCatValid);

    }, [val.addURLSearchBar_URL, val.addURLSearchBar_bookmark, val.addURLSearchBar_category])


    useEffect(() => {
        const isURLValid_save = val.defaultURL.trim() !== "";
        const isMarkValid_save = val.defaultBookmark.trim() !== "";
        const isCatValid_save = val.defaultCategory.trim() !== "";

        setIsSaveFormValid(isURLValid_save && isMarkValid_save && isCatValid_save);

    }, [val.defaultURL, val.defaultBookmark, val.defaultCategory])


    const Validate = () => {
        if (isFormValid) {
            var catval = arr.find((e) => (
                e.title == val.addURLSearchBar_category))

            if (catval) {
                console.log(catval)
                //renew array with new values of specific category
                const catid = catval.id;
                const marksForCatId = arr2.filter((mark) => mark.cat_id == catid)

                if (marksForCatId.find((mark) => (
                    mark.title === val.addURLSearchBar_bookmark
                ))) {
                    alert(`This bookmark already exists! you can modify it from Category: ${val.addURLSearchBar_category}`)
                    return false;
                }

                else {
                    func3(catid)
                    func2(catid)
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



    const updateMark = () => {
        const updateBookmark = async () => {
            console.log(arr2)
               var bookmarkId = arr2.find((marker) => marker.title == val.defaultBookmark)
                if(!bookmarkId)
                    bookmarkId = arr2.find((marker) => marker.title == mark)
            console.log(bookmarkId)
            const requestOpts = {
                method: 'PUT',
                body: JSON.stringify({
                    mark_id: bookmarkId.mark_id,
                    title: val.defaultBookmark,
                    url: val.defaultURL
                })
            }
            await fetch("http://localhost:3001/api/updateBookmark.php", requestOpts)
        }

        updateBookmark();

    }


    const Validate2 = () => {
        if (isSaveFormValid) {
            var catval = arr.find((e) => (
                e.title == val.defaultCategory))
            console.log(catval)
            if (catval) {
                //renew array with new values of specific category
                const catid = catval.id;
                console.log(catid)

                const marksForCatId = arr2.filter((mark) => mark.cat_id == catid)

                const markObj = marksForCatId.find((mark) => (
                    mark.title === val.defaultBookmark
                ));
                console.log(marksForCatId)
                console.log(markObj)
                if (markObj) {
                    if (val.defaultURL == markObj.link) {
                        alert(`You didn't change anything! you can either rename the bookmark, or change the url`)
                        return false;
                    }
                    else {
                        console.log("sent an array")
                        updateMark();
                        alert("Form submitted successfully!")
                        return true;
                    }
                }

                else {
                    func3(catid)
                    updateMark();


                    alert("Form submitted successfully! (updated a mark)")
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


    if (!version) {

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
                        <SearchBar options="title" setterValue={"addURLSearchBar_category"} value={val} placeHolder="Select a category..." list="options" array={arr} func={func} />
                    </div >
                    <div className="buttons2">
                        <Button formHandler={Validate} type="submit" text="Add URL " path={`categories/${val.addURLSearchBar_category}`} />
                    </div>
                </form>
                <div className="buttons">
                    <Button text="Back" path="" />
                </div>

            </div>
        )
    }


    else {
        return (
            <div className="addURL">
                <h1 id="addcatheader">Edit URL</h1>
                <form onSubmit={Validate2}>
                    <div className="searchBarsForUrl">
                        <label className="labels" htmlFor="">URL</label>
                        <SearchBar setterValue={"defaultURL"} value={val} placeHolder="Paste URL here..." func={func} />
                    </div>
                    <div className="searchBarsForUrl">
                        <label className="labels" htmlFor="">Bookmark</label>
                        <SearchBar setterValue={"defaultBookmark"} value={val} placeHolder="Enter a name for your bookmark..." func={func} />
                    </div>
                    <div className="searchBarsForUrl">
                        <label className="labels" htmlFor="">Category</label>
                        <SearchBar classval="cantEdit" options="title" setterValue={"defaultCategory"} value={val} placeHolder="Select a category..." list="options" array={arr} func={func} />
                    </div >
                    <div className="buttons2">
                        <Button formHandler={Validate2} type="submit" text="Save URL" path={`categories/${val.defaultCategory}`} />
                    </div>
                </form>
                <div className="buttons">
                    <Button text="Back" path={`categories/${val.defaultCategory}`} />
                </div>

            </div>
        )
    }
}


export default AddURL;