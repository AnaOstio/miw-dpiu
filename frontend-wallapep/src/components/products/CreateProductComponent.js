
import {useState} from "react";
import {modifyStateProperty} from "../../utils/utilsState";
import {Card, Input, Button, Row, Col, Form, Typography, Upload} from "antd";

let CreateProductComponent = () => {
    let [formData, setFormData] = useState({})

    let clickCreateProduct = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json ",
                    "apikey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify(formData)
            })

        if (response.ok){
            let data = await response.json()
            await uploadImage(data.productId)
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg)
            })
        }
    }

    let uploadImage = async (productId) => {
        let formDataImage = new FormData();
        formDataImage.append('image', formData.image);

        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/"+productId+"/image", {
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
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg)
            })
        }
    }

    return (
        <Row align="middle" justify="center" style={{minHeight: "70vh"}}>
            <Col>
                <Card title="Create product" style={{width: "500px"}}>

                    <Form.Item label="">
                        <Input onChange={
                            (i) => modifyStateProperty(
                                formData, setFormData, "title", i.currentTarget.value)}
                               size="large" type="text" placeholder="product title"></Input>
                    </Form.Item>

                    <Form.Item label="">
                        <Input onChange={
                            (i) => modifyStateProperty(
                                formData, setFormData, "description", i.currentTarget.value)}
                               size="large" type="text" placeholder="description"></Input>
                    </Form.Item>

                    <Form.Item label="">
                        <Input onChange={
                            (i) => modifyStateProperty(
                                formData, setFormData, "price", i.currentTarget.value)}
                               size="large" type="number" placeholder="price"></Input>
                    </Form.Item>

                    <Form.Item name="image">
                        <Upload  action={
                            (file) => modifyStateProperty(
                                formData, setFormData, "image", file) }  listType="picture-card">
                            Upload
                        </Upload>
                    </Form.Item>


                    <Button type="primary" block onClick={clickCreateProduct}>Sell Product</Button>
                </Card>
            </Col>
        </Row>
    )
}

export default CreateProductComponent;
