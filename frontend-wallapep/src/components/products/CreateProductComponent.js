import { useState } from "react";
import { modifyStateProperty } from "../../utils/utilsState";
import {Card, Input, Button, Row, Col, Form, Upload, Select, Typography, Tag} from "antd";
import {categories} from "../../utils/useCategories";
import {
    allowSubmitForm,
    joinAllServerErrorMessages,
    setServerErrors,
    validateFormDataInputRequired
} from "../../utils/utilsValidation";
import {useNavigate} from "react-router-dom";

let CreateProductComponent = (props) => {

    let { openNotification } = props;

    let navigate = useNavigate();

    let [formData, setFormData] = useState({})
    let [formErrors, setFormErrors] = useState({})
    let requiredInForm = ["title","category", "price"]

    let clickCreateProduct = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json ",
                    "apikey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify(formData)
            })

        if (response.ok) {
            let data = await response.json()
            await uploadImage(data.productId)
            openNotification("top", "Product added", "success");
            navigate("/all-products/all")
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors);
            let notificationMsg = joinAllServerErrorMessages(serverErrors);
            openNotification("top", notificationMsg, "error");
        }
    }

    let uploadImage = async (productId) => {
        let formDataImage = new FormData();
        formDataImage.append('image', formData.image);

        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/" + productId + "/image", {
                method: "POST",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
                body: formDataImage
            })
        if (response.ok) {

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
                <Card title="Create product" style={{ width: "500px" }}>
                    <Form.Item label=""
                               validateStatus={
                                   validateFormDataInputRequired(
                                       formData, "title", formErrors, setFormErrors) ? "success" : "error"}
                    >
                        <Input onChange={
                            (i) => modifyStateProperty(
                                formData, setFormData, "title", i.currentTarget.value)}
                               size="large" type="text" placeholder="product title" />
                        {formErrors?.title?.msg &&
                            <Typography.Text type="danger"> {formErrors?.title?.msg} </Typography.Text>}
                    </Form.Item>

                    <Form.Item label="">
                        <Input onChange={
                            (i) => modifyStateProperty(
                                formData, setFormData, "description", i.currentTarget.value)}
                               size="large" type="text" placeholder="description"></Input>
                    </Form.Item>

                    <Form.Item label=""
                               validateStatus={
                                   validateFormDataInputRequired(
                                       formData, "price", formErrors, setFormErrors) ? "success" : "error"}
                    >
                        <Input onChange={
                            (i) => modifyStateProperty(
                                formData, setFormData, "price", i.currentTarget.value)}
                               size="large" type="number" placeholder="price"></Input>
                        {formErrors?.price?.msg &&
                            <Typography.Text type="danger"> {formErrors?.price?.msg} </Typography.Text>}
                    </Form.Item>

                    <Form.Item label=""
                               validateStatus={
                                   validateFormDataInputRequired(
                                       formData, "category", formErrors, setFormErrors) ? "success" : "error"}
                    >
                        <Select
                            placeholder="Select category"
                            size="large"
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
                        {formErrors?.category?.msg &&
                            <Typography.Text type="danger"> {formErrors?.category?.msg} </Typography.Text>}
                    </Form.Item>

                    <Form.Item name="image">
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                action={
                                    (file) => modifyStateProperty(
                                        formData, setFormData, "image", file)
                                }
                            >
                                Upload
                            </Upload>
                    </Form.Item>

                    <Form.Item>
                        {allowSubmitForm(formData,formErrors,requiredInForm) ?
                            <Button type="primary" block onClick={clickCreateProduct}>Sell Product</Button> :
                            <Button type="primary" block disabled>Sell Product</Button>
                        }
                    </Form.Item>

                </Card>
            </Col>
        </Row>
    )
}

export default CreateProductComponent;
