import SearchBar from "./SearchBar"
import "./AddCategory.css"
import { useEffect, useState } from 'react';
import Button from "./Button"
const AddCategory = ({ arr, func, func2, val }) => {

    const [catState, setCatState] = useState(false);

    useEffect(() => {
        func({ ...val, addCategorySearchBar: "" })
    }, [])

    useEffect(() => {
        const isCategoryValid = val.addCategorySearchBar.trim() !== "";
        setCatState(isCategoryValid)
    }, [val.addCategorySearchBar])

    const Validate = () => {
        if (catState) {
            console.log(arr)
            if (!arr.find((e) => (e.title === val.addCategorySearchBar))) {
                func2()
                alert("Category Created successfully!")
            }
            else {
                alert("Category exists already!")
                return false
            }

        }
        else
            alert("Please enter a name for the Category you want!")

        return catState;
    }
    return (
        <div className="addCat">
            <h1 id="addcatheader">Add Category</h1>
            <form onSubmit={Validate}>
                <SearchBar name="cat_title" setterValue={"addCategorySearchBar"} value={val} placeHolder="Enter category name.." func={func} />
                <div className="buttons2">
                    <Button formHandler={Validate} type="submit" text="Add Category " path=""/>
                </div>
            </form>
            <div className="buttons">
                <Button text="Back" path="" />
            </div>
        </div>
    )
}

export default AddCategory;