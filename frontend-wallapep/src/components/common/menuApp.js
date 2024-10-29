import {Menu} from "antd";
import {Link} from "react-router-dom";
import {FireOutlined, LoginOutlined} from "@ant-design/icons";

let MenuApp = () => {
    return (
        <>
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" items={[
                { key:"logo",  label: <img src="/logo.png" width="40" height="40" />},
                {key: "menuItems", icon: <FireOutlined />, label: <Link to="/">Home</Link>},
                {key: "menuLogin", icon: <LoginOutlined/>, label: <Link to="/login">Login</Link>},
                {key: "menuRegister", label: <Link to="/register">Register</Link>},
                {key: "menuProducts", label: <Link to="/products">Products</Link>},
            ]}>
            </Menu>
        </>
    )
}

export default MenuApp;
