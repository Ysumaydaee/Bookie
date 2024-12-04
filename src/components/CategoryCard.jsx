import "./CategoryCard.css"
import { Link } from "react-router-dom";
//name will come from the array that saves the all categoris 
//name will be used as the path in the Link


const CategoryCard = ({ name }) => {
    return (
        <div>
            <Link className="linkCard" to={`/categories/${name}`}>
                <div id="card">
                    {name}
                </div>
            </Link>
        </div>);
}

export default CategoryCard;