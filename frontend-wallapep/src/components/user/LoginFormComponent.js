import { useState } from "react";
import {modifyStateProperty} from "../../utils/utilsState";
import {useNavigate} from "react-router-dom";
import {Col, Row, Form, Input, Button, Card} from "antd";

let LoginFormComponent = (props) => {

    let { setLogin, openNotification } = props

    let navigate = useNavigate();

    let [formData,setFormData] = useState({
        email: '',
        password : '',
    })

    let clickLogin = async () => {
        let response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/users/login",{
            method: "POST",
            headers: { "Content-Type" : "application/json "},
            body: JSON.stringify(formData)
        })

        if (response.ok){
            let responseBody = await response.json();
            // siempre tenemos que valiadar primero que existen antes de guardar estos valores
            if ( responseBody.apiKey && responseBody.email){
                localStorage.setItem("apiKey",responseBody.apiKey)
                localStorage.setItem("email",responseBody.email)
            }
            console.log("ok "+responseBody)
            setLogin(true)
            openNotification("top", "Login successful", "success");
            navigate("/products")
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach( e => {
                openNotification("top", e.msg, "error")
                console.log("Error: "+e.msg)
            })
        }
    }

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh"}}>
            <Col xs={0} sm={0} md={12} lg={8} xl={6}><img src="/iniciar-sesion.png" width="100%"/></Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10}>
                <Card title="Login" style={{ width: "100%", margin: "15px"}}>
                    <Form.Item label="" name="email">
                        <Input placeholder="your email" onChange={(i) => {
                            modifyStateProperty(formData, setFormData,
                                "email", i.currentTarget.value)
                        }}/>
                    </Form.Item>

                    <Form.Item label="" name="password">
                        <Input.Password placeholder="your password" onChange={(i) => {
                            modifyStateProperty(formData, setFormData,
                                "password", i.currentTarget.value)
                        }}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={clickLogin} block>Login User</Button>
                    </Form.Item>
                </Card>
            </Col>
        </Row>

    )
}

export default LoginFormComponent;
