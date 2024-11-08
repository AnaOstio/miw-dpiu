import { Button, Card, Col, Row, Tag, Typography } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { categories } from "../../utils/useCategories";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { joinAllServerErrorMessages, setServerErrors } from "../../utils/utilsValidation";

let ProductCard = (props) => {
    let { product, openNotification } = props;
    let navigate = useNavigate();
    let [formErrors, setFormErrors] = useState({});

    let category = categories.find(cat => cat.value === product.category);

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
                    productId: product.id
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
            setServerErrors(serverErrors, setFormErrors);
            let notificationMsg = joinAllServerErrorMessages(serverErrors);
            openNotification("top", notificationMsg, "error");
        }
    };

    return (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
                title={product.title}
                style={{
                    height: "600px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
                cover={
                    <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.title} style={{ width: "100%" }} />
                    </Link>
                }
            >
                {category && (
                    <Row>
                        <Tag color={category.color}>
                            {category.icon} {category.label}
                        </Tag>
                    </Row>
                )}
                <Row
                    style={{
                        marginTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography.Text strong style={{ fontSize: "16px" }}>
                        ${product.price}
                    </Typography.Text>
                    {product.buyerEmail === null ? (
                        <Button type="primary" onClick={() => buyProduct(product)}>
                            <ShoppingOutlined /> Buy
                        </Button>
                    ) : (
                        <Typography.Text strong type="danger">Sold</Typography.Text>
                    )}
                </Row>
            </Card>
        </Col>
    );
};

export default ProductCard;
