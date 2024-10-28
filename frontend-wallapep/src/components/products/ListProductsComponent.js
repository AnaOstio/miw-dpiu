import {useEffect, useState} from "react";

let ListProductsComponent = () => {
    let [products, setProducts] = useState([])

    // Esto funciona como un constructor vacío
    useEffect(() => {
        getProducts();
    }, [])

    let getProducts = async () => {
        let response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/products",
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });

        if (response.ok) {
            let jsonData = await response.json();
            setProducts(jsonData)
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg)
            })
        }
    }

        return (
        <div>
            <h2>Products</h2>
            <ul>
                { products.map( p => <li key={ p.id }> { p.title } { p.price } </li> )}
            </ul>
        </div>
    )
}

export default ListProductsComponent;
