import { Avatar, Col, Menu, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    FileOutlined,
    FormOutlined,
    InteractionOutlined,
    LoginOutlined,
    LogoutOutlined,
    PlusCircleOutlined,
    ShopOutlined
} from "@ant-design/icons";

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
            <Row style={{ width: "100%", margin: 0, padding: 0, backgroundColor: "#001529" }} justify="space-between">
                <Col span={22} style={{ padding: 0, margin: 0 }}>
                    {!login && (
                        <Menu theme="dark" mode="horizontal" style={{ width: "100%", padding: 0, margin: 0 }} items={[
                            { key: "logo", label: <img src="/logo.png" width="40" height="40" style={{ display: "block", margin: "0 auto" }} /> },
                            { key: "menuLogin", icon: <LoginOutlined />, label: <Link to="/login">Login</Link> },
                            { key: "menuRegister", icon: <FormOutlined />, label: <Link to="/register">Register</Link> },
                        ]} />
                    )}

                    {login && (
                        <Menu theme="dark" mode="horizontal" style={{ width: "100%", padding: 0, margin: 0 }} items={[
                            { key: "logo", label: <img src="/logo.png" width="40" height="40" style={{ display: "block", margin: "0 auto" }} /> },
                            { key: "menuProducts", icon: <ShopOutlined />, label: <Link to="/all-products/all">Products</Link> },
                            { key: "menuCreateProduct", icon: <PlusCircleOutlined />, label: <Link to="/products/create">Sell</Link> },
                            { key: "menuMyProduct", icon: <FileOutlined />, label: <Link to="/products/own">My Products</Link> },
                            { key: "menuMyTransactions", icon: <InteractionOutlined />, label: <Link to={"/myTransactions"} >My transactions</Link> },
                            { key: "menuDisconnect", icon: <LogoutOutlined />, label: <Link to="#" onClick={disconnect}>Disconnect</Link> },
                        ]} />
                    )}
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {login ? (
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
