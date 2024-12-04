import './Home.css'
import Button from './Button';
import SearchBar from './SearchBar';
import CategoryCard from './CategoryCard';
//implement search logic
//search logic needs function here to map array to the screen based on the setValue of the search bar below, which means another useState variable. insert function here
const Home = ({catArray}) => {
    return (
        <div className='second-upper-container'>
            <div >
                <br />
                <h1>Home</h1>
                <SearchBar placeHolder="Search Category..." />
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
                {catArray.map((cat)=>
                (
                    <div id={cat.name}><CategoryCard name={cat.name} /></div>
                ))}
            </div>
        </div>
    );
}


export default Home;
