import './SearchBar.css'
const SearchBar = ({ name="",options = "", setterValue ,value="",array = [], list = "", placeHolder, func = () => { } }) => {
    //need category array to be here in order to search with each character change
    if (list !== "") {
        return (
            <div>
                    <input list={list} id='bar' placeholder={placeHolder}
                        value={value.setterValue} onChange={(e) => { func({...value, [setterValue]:e.target.value})}}  />
                    <datalist id={list}>
                        {array.map((cat) => (<option key={cat[options]} value={cat[options]}></option>))}
                    </datalist>
            </div>
        )

    }
    else {
        return (
                <input name={name} id='bar' placeholder={placeHolder}
                value={value.setterValue} onChange={(e) => { func({...value, [setterValue]:e.target.value})}}  />
        )
    }


}

export default SearchBar;