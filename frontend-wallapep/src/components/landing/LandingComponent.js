import {Col, Row} from "antd";
import {categories} from "../../utils/useCategories";
import CategoryButton from "./CategoryButton";

let LandingComponent = () => {
    return (
        <>
            <div style={{padding: '20px', textAlign: 'center'}}>
                <h2>Categories</h2>
                <Row gutter={[16, 16]} justify="center">
                    {categories.map((category) => (
                        <Col key={category.value} xs={12} sm={8} md={6} lg={4}>
                            <CategoryButton
                                icon={category.icon}
                                label={category.label}
                                color={category.color}
                                value={category.value}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default LandingComponent;
