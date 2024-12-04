import './SearchBar.css'
import { useState } from 'react';
const SearchBar = ({ value="",array = [], list = "", placeHolder, func = () => { } }) => {
    //need category array to be here in order to search with each character change
    if (list !== "") {
        return (
            <div>
                    <input list={list} id='bar' placeholder={placeHolder}
                        value={value} onChange={(e) => { func(e.target.value) }}  />
                    <datalist id={list}>
                        {array.map((cat) => (<option key={cat.name} value={cat.name}></option>))}
                    </datalist>
            </div>
        )

    }
    else {
        return (
                <input id='bar' placeholder={placeHolder}
                value={value} onChange={(e) => { func(e.target.value) }}  />
        )
    }


}

export default SearchBar;