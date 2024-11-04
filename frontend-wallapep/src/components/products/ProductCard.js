import {Link} from "react-router-dom";
import {Button, Card, Col, Row, Tag, Typography} from "antd";
import {ShoppingOutlined} from "@ant-design/icons";
import {categories} from "../../utils/useCategories";

let ProductCard = (props) => {

    let {product} = props;

    let category = categories.find(cat => cat.value === product.category);

    return (
        <Col  xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Link to={"/products/" + product.id}>
                <Card
                    xs={24} sm={12} md={8} lg={6}
                    title={product.title}
                    cover={<img src={product.image} alt={product.title} />}
                    style={{ height: "600px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                    {category &&
                        <Row>
                            <Tag color={category.color}>
                                {category.icon} {category.label}
                            </Tag>
                        </Row>
                    }
                    <Row style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography.Text strong style={{ fontSize: "16px" }}>
                            ${product.price}
                        </Typography.Text>
                        <Button type="primary"><ShoppingOutlined /></Button>
                    </Row>
                </Card>
            </Link>
        </Col>
    )
}

export default ProductCard;