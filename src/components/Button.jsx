import { Link } from "react-router-dom"
import "./Button.css"
const Button = ({ reference = "", text, path, func, category ="" }) => {

    if(reference && category){
    return (
        <Link className="adds" to={`/${path}`}>
            <button className="button" onClick={() => func(reference, category)}>{text}</button>
        </Link>
    );
}
else{

    return (
        <Link className="adds" to={`/${path}`}>
            <button className="button" onClick={func}>{text}</button>
        </Link>
    );
}
};

export default Button;