import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Card, Col, Input, Row, Form, DatePicker, Select, Tag, Typography} from "antd";
import { modifyStateProperty } from "../../utils/utilsState";
import { dateFormatTemplate, timestampToDate } from "../../utils/utilsDate";
import {categories} from "../../utils/useCategories";
import {joinAllServerErrorMessages, setServerErrors, validateFormDataInputRequired} from "../../utils/utilsValidation";
import {EditOutlined, EuroCircleOutlined, FilterOutlined, FormOutlined} from "@ant-design/icons";

let EditProductComponent = (props) => {
    let {openNotification} = props

    const { id } = useParams();
    let navigate = useNavigate();

    let [formData, setFormData] = useState({})
    let [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        getProduct(id);
    }, [])

    let clickEditProduct = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/" + id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json ",
                    "apikey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify(formData)
            });

        if (response.ok) {
            let jsonData = await response.json();
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors);
            let notificationMsg = joinAllServerErrorMessages(serverErrors);
            openNotification("top", notificationMsg, "error");
        }
    }

    let getProduct = async (id) => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/" + id,
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });

        if (response.ok) {
            let jsonData = await response.json();
            jsonData.fullCategoy = categories.find(cat => cat.value === jsonData.category);

            setFormData(jsonData)
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors);
            let notificationMsg = joinAllServerErrorMessages(serverErrors);
            openNotification("top", notificationMsg, "error");
        }
    }

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh" }}>
            <Col>
                <Card title={ "Edit product"} style={{ width: "500px" }}>

                    <Form.Item label={<FormOutlined />}>
                        <Input onChange={
                            (i) => modifyStateProperty(formData, setFormData, "title", i.currentTarget.value)}
                            size="large" type="text" placeholder="product title"
                            value={formData?.title}>
                        </Input>
                    </Form.Item>

                    <Form.Item label={<FormOutlined />}>
                        <Input onChange={
                            (i) => modifyStateProperty(formData, setFormData, "description", i.currentTarget.value)}
                            size="large" type="text" placeholder="description"
                            value={formData?.description}>
                        </Input>
                    </Form.Item>

                    <Form.Item label={<EuroCircleOutlined />}>
                        <Input onChange={
                            (i) => modifyStateProperty(formData, setFormData, "price", i.currentTarget.value)}
                            size="large" type="number" placeholder="price"
                            value={formData?.price}>
                        </Input>
                    </Form.Item>

                    {
                        formData.fullCategoy && (
                            <Form.Item label={<FilterOutlined />}
                            >
                                <Select
                                    placeholder="Select category"
                                    size="large"
                                    value={formData.category|| undefined}
                                    style={{ width: '100%' }}
                                    onChange={(value) => modifyStateProperty(formData, setFormData, "category", value)}
                                >
                                    {categories.map(category => (
                                        <Select.Option key={category.value} value={category.value}>
                                            <Tag color={category.color}>
                                                {category.icon} {category.label}
                                            </Tag>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )
                    }


                    <Button type="primary" onClick={clickEditProduct} block > <EditOutlined />Edit Product</Button>
                </Card>
            </Col>
        </Row>
    )
}

export default EditProductComponent;

