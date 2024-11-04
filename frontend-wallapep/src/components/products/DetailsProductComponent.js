import { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Typography, Card, Descriptions, Image, Button, Row, Col, Flex, Tag} from 'antd';
import { ShoppingOutlined } from "@ant-design/icons";
import { checkURL } from "../../utils/utilsURL";
import {categories} from "../../utils/useCategories";

let DetailsProductComponent = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    let [product, setProduct] = useState({});

    useEffect(() => {
        getProduct(id);
    }, [id]);

    let buyProduct = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/transactions/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify({
                    productId: id
                })
            }
        );

        if (response.ok) {
            let jsonData = await response.json();
            if (jsonData.affectedRows === 1) {
                // Handle successful purchase
            }
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg);
            });
        }
    };

    let getProduct = async (id) => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/" + id,
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            }
        );

        if (response.ok) {
            let jsonData = await response.json();
            let urlImage = process.env.REACT_APP_BACKEND_BASE_URL + "/images/" + jsonData.id + ".png";
            let existsImage = await checkURL(urlImage);
            jsonData.image = existsImage ? urlImage : "/imageMockup.png";
            jsonData.categoryInfo = categories.find(cat => cat.value === jsonData.category);
            setProduct(jsonData);
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg);
            });
        }
    };

    let clickReturn = () => {
        navigate("/products");
    };

    const { Text } = Typography;

    return (
        <>
            <Row style={{marginLeft: "25%", marginTop: "5%"}}>
                <Typography.Title level={4}>
                    <Link to={"/products"}>Products</Link> / {product.title}
                </Typography.Title>
            </Row>
        <Row justify="space-around" align="left">
            <Card
                hoverable
                style={{width: "50vw", alignSelf: 'center'}}
                styles={{
                    body: {
                        padding: 0,
                        overflow: 'hidden',
                    },
                }}
            >
                <Flex justify="space-between">
                    <img
                        alt="avatar"
                        src={product.image}
                        style={{display: 'block', width: "50%"}}
                    />
                    <Flex
                        vertical
                        style={{
                            padding: 32,
                            width: "50%"
                        }}
                    >
                        <Typography.Title level={3}>
                            {product.title}
                        </Typography.Title>

                        <Typography.Title level={4}>
                            ${product.price}
                        </Typography.Title>

                        <Typography.Text>
                            {product.description}
                        </Typography.Text>

                        <Typography.Text>
                            {/*
                            <Tag color={product.categoryInfo.color}>
                                {product.categoryInfo.icon} {product.categoryInfo.label}
                            </Tag>
                            */}
                        </Typography.Text>

                        <Typography.Text>
                            {/* Me falta meterle la seller */}
                        </Typography.Text>


                        <Button type="primary" href="https://ant.design" target="_blank">
                            <ShoppingOutlined /> Buy
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Row>
        </>
    );
}

export default DetailsProductComponent;
