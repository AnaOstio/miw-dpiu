import {useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Typography, Card, Descriptions, Image } from 'antd';

let DetailsProductComponent = () => {
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

    const { Text } = Typography

    return (
        <Card>
            <Image src="/item1.png" />
            <Descriptions title={ product.title }>
                <Descriptions.Item label="Id">
                    { product.id }
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    { product.description }
                </Descriptions.Item>
                <Descriptions.Item>
                    <Text strong underline style={{ fontSize:20 }}>{ product.price }</Text>
                    { product.price < 10000 ? <Text>Oferta</Text> :  <Text>NO-Oferta</Text> }
                </Descriptions.Item>
            </Descriptions>
        </Card>

    )
}

export default DetailsProductComponent;

