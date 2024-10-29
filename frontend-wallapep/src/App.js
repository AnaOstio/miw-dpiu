import {Route, Routes, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginFormComponent from "./components/user/LoginFormComponent";
import CreateUserComponent from "./components/user/CreateUserComponent";
import ListProductsComponent from "./components/products/ListProductsComponent";
import EditProductComponent from "./components/products/editProductComponent";
import { Layout } from 'antd';
import MenuApp from "./components/common/menuApp";
import DetailsProductComponent from "./components/products/DetailsProductComponent";

let App = () => {
    let { Header, Content, Footer } = Layout;
    let [login, setLogin] = useState(false);
    let navigate = useNavigate();

    // Comprueba si la sesión está activa al cargar
    useEffect(() => {
        checkLoginIsActive();
    }, []);

    let checkLoginIsActive = async () => {
        if (localStorage.getItem("apiKey") == null) {
            setLogin(false);
            return;
        }

        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/users/isActiveApiKey",
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                }
            }
        );

        if (response.ok) {
            let jsonData = await response.json();
            setLogin(jsonData.activeApiKey);

            if (!jsonData.activeApiKey) {
                navigate("/login");
            }
        } else {
            setLogin(false);
            navigate("/login");
        }
    }

    return (
        <Layout className="layout" style={{ minHeight: "100vh" }}>
            <Header>
                <MenuApp login={login} setLogin={setLogin} />
            </Header>
            <Content style={{ padding: "20px 50px" }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<h1>Index</h1>} />
                        <Route path="/register" element={<CreateUserComponent />} />
                        <Route path="/login" element={<LoginFormComponent setLogin={setLogin} />} />
                        <Route path="/products" element={<ListProductsComponent />} />
                        <Route path="/products/edit/:id" element={<EditProductComponent />} />
                        <Route path="/products/:id" element={<DetailsProductComponent />} />
                    </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Wallapep</Footer>
        </Layout>
    );
}

export default App;
