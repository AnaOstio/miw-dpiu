import {Avatar, Col, Menu, Row, Typography} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";

let MenuApp = ({ login, setLogin }) => {
    let navigate = useNavigate();

    let disconnect = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/users/disconnect",
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                }
            }
        );

        localStorage.removeItem("apiKey");
        setLogin(false);
        navigate("/login");
    }

    const Text = Typography;

    return (
        <>
            <Row>
                <Col xs= {18} sm={19} md={20} lg={21} xl = {22}>

                    {!login && (
                        <Menu theme="dark" mode="horizontal" items={[
                            { key: "logo", label: <img src="/logo.png" width="40" height="40" /> },
                            { key: "menuLogin", icon: <LoginOutlined />, label: <Link to="/login">Login</Link> },
                            { key: "menuRegister", label: <Link to="/register">Register</Link> },
                        ]} />
                    )}

                    {login && (
                        <Menu theme="dark" mode="horizontal" items={[
                            { key: "logo", label: <img src="/logo.png" width="40" height="40" /> },
                            { key: "menuProducts", label: <Link to="/all-products/all">Products</Link> },
                            { key: "menuCreateProduct", label: <Link to="/products/create">Sell</Link> },
                            { key: "menuMyProduct", label: <Link to="/products/own">My Products</Link> },
                            { key: "menuMyTransactions", label: <Link to={"/myTransactions" } >My transactions</Link> },
                            { key: "menuDisconnect", label: <Link to="#" onClick={disconnect}>Disconnect</Link> },
                        ]} />
                    )}
                </Col>
                <Col xs= {6} sm={5} md = {4}  lg = {3} xl = {2}
                     style={{display: 'flex', flexDirection: 'row-reverse' }}>
                    { login != null ? (
                        <Avatar size="large"
                                style={{ backgroundColor: "#ff0000", verticalAlign: 'middle', marginTop: 12 }}>
                            { localStorage.getItem("email")?.charAt(0) }
                        </Avatar>
                    ) : (
                        <Link to="/login"> <Text style={{ color:"#ffffff" }}>Login</Text></Link>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default MenuApp;
