import { useState } from "react";
import { Card, Col, Row, Steps } from "antd";
import UserComponentStep from "./createSteps/UserComponentStep";
import PersonalDataComponentStep from "./createSteps/PersonalDataComponentStep";
import AddressComponentStep from "./createSteps/AddressComponentStep";
import { HomeOutlined, IdcardOutlined, UserOutlined } from "@ant-design/icons";

const CreateUserComponent = () => {
    const [formData, setFormData] = useState({});
    const [current, setCurrent] = useState(0);

    const clickCreate = async () => {
        let response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/users", {
            method: "POST",
            headers: { "Content-Type": "application/json " },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            let responseBody = await response.json();
            console.log("ok " + responseBody);
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg);
            });
        }
    };

    const items = [
        { title: 'Access', icon: <UserOutlined /> },
        { title: 'Identification', icon: <IdcardOutlined /> },
        { title: 'Address', icon: <HomeOutlined /> },
    ];

    const increaseCurrent = () => setCurrent(current + 1);
    const decreaseCurrent = () => setCurrent(current - 1);

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh" }}>
            <Col xs={0} sm={0} md={12} lg={8} xl={6}>
                <img src="/iniciar-sesion.png" width="100%" />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10}>
                <Card title="Sign up" style={{ width: "100%", margin: "15px" }}>
                    <Steps current={current} items={items} style={{ marginBottom: '20px' }} />
                    {current === 0 &&
                        <UserComponentStep
                            increaseCurrent={increaseCurrent}
                            setFormData={setFormData}
                            formData={formData} />}
                    {current === 1 &&
                        <PersonalDataComponentStep
                            decreaseCurrent={decreaseCurrent}
                            increaseCurrent={increaseCurrent}
                            setFormData={setFormData}
                            formData={formData} />}
                    {current === 2 &&
                        <AddressComponentStep
                            decreaseCurrent={decreaseCurrent}
                            increaseCurrent={increaseCurrent}
                            setFormData={setFormData}
                            formData={formData} />}
                </Card>
            </Col>
        </Row>
    );
};

export default CreateUserComponent;
