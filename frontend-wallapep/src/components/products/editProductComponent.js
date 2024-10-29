import {useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";

let EditProductComponent = () => {
    const { id } = useParams();

    let navigate = useNavigate();
    let [product, setProduct] = useState({})

    useEffect(() => {
        getProduct(id);
    }, [])

    let getProduct = async (id) => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL+"/products/"+id,
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });

        if ( response.ok ){
            let jsonData = await response.json();
            setProduct(jsonData)
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach( e => {
                console.log("Error: "+e.msg)
            })
        }
    }

    let clickReturn = () => {
        navigate("/products")
    }

    return (
        <div>
            <h2>Product</h2>
            <p> { product.id }</p>
            <p> { product.title }</p>
            <p> { product.description }</p>
            <p> { product.price }</p>
            <button onClick={ clickReturn }> Back</button>
        </div>
    )
}

export default EditProductComponent;
