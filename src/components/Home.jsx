import './Home.css'
import Button from './Button';
import SearchBar from './SearchBar';
import CategoryCard from './CategoryCard';
import { useEffect, useState } from 'react';
//implement search logic
//search logic needs function here to map array to the screen based on the setValue of the search bar below, which means another useState variable. insert function here
const Home = ({ val, func, func2, func3, func4, catArray }) => {

    const [filterdArray, setFilterdArray] = useState([]);
    useEffect(() => {
        func4();
        func2();
        func({...val, allCategoriesSearchBar: "" }) 
    }, [])

    useEffect(() => {
        const filteredArr = catArray.filter((cat)=>(cat.title.includes(val.allCategoriesSearchBar)));
        setFilterdArray(filteredArr)
    }, [val.allCategoriesSearchBar, catArray])

    return (
        <div className='second-upper-container'>
            <div >
                <br />
                <h1>Home</h1>
                <SearchBar options="title" value={val} func={func} setterValue={"allCategoriesSearchBar"} list='options' array={catArray} placeHolder="Search Category..." />
                <Button text="URL +" path="add-URL" />
                <div id='catButton'>
                    <Button text="Category +" path="add-category" />
                </div>
            </div>
            <div id='category-container'>
                <h2>All Categeories</h2>
                <div>
                    <hr />
                </div>
                {
                    filterdArray.map((cat) =>
                    (
                   
                        <div onClick={()=>func3(cat.id)} key={cat.id} id={cat.id}><CategoryCard name={cat.title} /></div>
                    ))

                }
            </div>
        </div>
    );
}


export default Home;
