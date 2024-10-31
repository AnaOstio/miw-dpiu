import {useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Input, Row, Form, DatePicker} from "antd";
import {modifyStateProperty} from "../../utils/utilsState";
import {dateFormatTemplate, timestampToDate} from "../../utils/utilsDate";

let EditProductComponent = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    let [product, setProduct] = useState({})
    let [formData, setFormData] = useState({})

    useEffect(() => {
        getProduct(id);
    }, [])

    let clickEditProduct = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL+"/products/"+id,
            {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json ",
                    "apikey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify(formData)
            });

        if ( response.ok ){
            let jsonData = await response.json();

        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach( e => {
                console.log("Error: "+e.msg)
            })
        }
    }

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
            setFormData(jsonData)
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

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh"}}>
            <Col>
                <Card title="Edit product" style={{ width: "500px"}}>

                    <Form.Item label="">
                        <Input onChange = {
                            (i) => modifyStateProperty(formData, setFormData,"title",i.currentTarget.value) }
                               size="large" type="text" placeholder="product title"
                               value={formData?.title}>
                        </Input>
                    </Form.Item>

                    <Form.Item label="">
                        <Input onChange = {
                            (i) => modifyStateProperty(formData, setFormData,"description",i.currentTarget.value) }
                               size="large"  type="text" placeholder="description"
                               value={formData?.description}>
                        </Input>
                    </Form.Item>

                    <Form.Item label="">
                        <Input onChange = {
                            (i) => modifyStateProperty(formData, setFormData,"price",i.currentTarget.value) }
                               size="large"  type="number" placeholder="price"
                               value={formData?.price}>
                        </Input>
                    </Form.Item>

                    <Form.Item label="">
                        <DatePicker value={ formData.date && timestampToDate(formData.date) }
                                    format={ dateFormatTemplate }
                                    onChange={ (inDate, inString) => {
                                        console.log(inString)
                                    } }
                        />
                    </Form.Item>


                    <Button type="primary" onClick={clickEditProduct}  block >Edit Product</Button>
                </Card>
            </Col>
        </Row>
    )
}

export default EditProductComponent;

