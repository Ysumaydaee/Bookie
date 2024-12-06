import { Link } from "react-router-dom"
import "./Button.css"
const Button = ({ type = "", formHandler , reference = "", category = "", text, path, func=()=>{}}) => {
    
    const handleForm =  (e) => {
        //validate the form first
        const isValid = formHandler();
        //prevent user from contiuning 
        if (!isValid)
            e.preventDefault();
    }
//for delete button logic
    if (reference && category) {
        return (
            <Link className="adds" to={`/${path}`}>
                <button className="button" onClick={() => func(reference, category)}>{text}</button>
            </Link>
        );
    }


else if (type === "submit") {
    return (
        <Link className="adds" to={`/${path}`} onClick={handleForm}>
            <button className="button" onClick={func}>
                {text}
            </button>
        </Link>
    );
}

else {

    return (
        <Link className="adds" to={`/${path}`}>
            <button className="button" onClick={func}>{text}</button>
        </Link>
    );
}

};

export default Button;