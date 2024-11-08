import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Card, Descriptions, Image, Button, Row, Col, Flex, Tag, Avatar } from 'antd';
import { ShoppingOutlined } from "@ant-design/icons";
import { checkURL } from "../../utils/utilsURL";
import { categories } from "../../utils/useCategories";
import { joinAllServerErrorMessages, setServerErrors } from "../../utils/utilsValidation";

let DetailsProductComponent = (props) => {
    let { openNotification } = props;
    const { id } = useParams();
    let navigate = useNavigate();
    let [product, setProduct] = useState({});

    let [formErrors, setFormErrors] = useState({})

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
                openNotification("top", "Product purchased successfully", "success");
                navigate("/all-products/all");
            }
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors)
            let notificationMsg = joinAllServerErrorMessages(serverErrors)
            openNotification("top", notificationMsg, "error")
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

            let seller = await getSeller(jsonData.sellerId);
            jsonData.seller = seller;

            setProduct(jsonData);
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors)
            let notificationMsg = joinAllServerErrorMessages(serverErrors)
            openNotification("top", notificationMsg, "error")
        }
    };

    let getSeller = async (sellerId) => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/users/" + sellerId,
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            }
        );

        if (response.ok) {
            let jsonData = await response.json();
            return jsonData;
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors)
            let notificationMsg = joinAllServerErrorMessages(serverErrors)
            openNotification("top", notificationMsg, "error")
            return null;
        }
    }

    return (
        <>
            <Row style={{ marginLeft: "25%", marginTop: "5%" }}>
                <Typography.Title level={4}>
                    <Link to={"/all-products/all"}>Products</Link> / {product.title}
                </Typography.Title>
            </Row>
            <Row justify="space-around" align="left">
                <Card
                    hoverable
                    style={{ width: "50vw", alignSelf: 'center' }}
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
                            style={{ display: 'block', width: "50%" }}
                        />
                        <Flex
                            vertical
                            style={{
                                padding: 32,
                                width: "50%"
                            }}
                        >
                            <Typography.Title level={3} style={{ fontWeight: 'bold' }}>
                                {product.title}
                            </Typography.Title>

                            <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
                                ${product.price}
                            </Typography.Title>

                            <Typography.Text>
                                {product.description}
                            </Typography.Text>

                            {
                                product.categoryInfo &&
                                <Typography.Text style={{ fontWeight: 'bold', margin: "20px 0" }}>
                                    <Tag color={product.categoryInfo.color}>
                                        {product.categoryInfo.icon} {product.categoryInfo.label}
                                    </Tag>
                                </Typography.Text>
                            }

                            {
                                product.seller && (
                                    <Link to={`/profile/${product.seller.id}`}>
                                        <Avatar
                                            size="large"
                                            style={{ backgroundColor: "#ff0000", marginRight: 12 }}
                                        >
                                            {product.seller.email?.charAt(0)}
                                        </Avatar>
                                        {
                                            product.seller.name && (
                                                <Typography.Text style={{ fontWeight: 'bold', color: 'black' }}>
                                                    Seller: {product.seller.name}
                                                </Typography.Text>
                                            )
                                        }
                                    </Link>
                                )
                            }
                            {
                                product.seller && (localStorage.getItem("email") === product.seller.email) ? (
                                    <Button type="primary" disabled style={{ margin: "20px 0" }}>
                                        <ShoppingOutlined /> Buy
                                    </Button>
                                ) : (
                                    product.buyerEmail === null ? (
                                        <Button type="primary" onClick={buyProduct} style={{ margin: "20px 0" }} >
                                            <ShoppingOutlined /> Buy
                                        </Button>
                                    ) :
                                        (
                                            <Typography.Text strong type="danger" style={{ fontSize: "30px", marginTop: "30px" }}>Sold</Typography.Text>
                                        )
                                )
                            }

                        </Flex>
                    </Flex>
                </Card>
            </Row>
        </>
    );
}

export default DetailsProductComponent;
