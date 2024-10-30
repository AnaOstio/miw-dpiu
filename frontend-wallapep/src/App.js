import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Layout, notification} from 'antd';
import { useState, useEffect } from "react";
import LoginFormComponent from "./components/user/LoginFormComponent";
import CreateUserComponent from "./components/user/CreateUserComponent";
import ListProductsComponent from "./components/products/ListProductsComponent";
import EditProductComponent from "./components/products/editProductComponent";
import MenuApp from "./components/common/menuApp";
import DetailsProductComponent from "./components/products/DetailsProductComponent";
import CreateProductComponent from "./components/products/CreateProductComponent";
import ListMyProductsComponent from "./components/products/ListMyProductsComponent";

let App = () => {
    const [api, contextHolder] = notification.useNotification();
    let { Header, Content, Footer } = Layout;
    let [login, setLogin] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();

    // Comprueba si la sesión está activa al cargar
    useEffect(() => {
        checkAll()
    }, []);

    let checkAll = async () => {
        let isActive = await checkLoginIsActive()
        checkUserAccess(isActive)
    }

    let checkUserAccess= async (isActive) => {
        let href = location.pathname
        if (!isActive && !["/", "/login","/register"].includes(href) ){
            navigate("/login")
        }
    }

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
            return(jsonData.activeApiKey)
        } else {
            setLogin(false);
            navigate("/login");
            return (false)
        }
    }

    // Funcion para crear notifiaciones
    const openNotification = (placement, text, type) => {
        api[type]({
            message: 'Notification',
            description: text,
            placement,
        });
    };


    return (
        <Layout className="layout" style={{ minHeight: "100vh" }}>
            { contextHolder }
            <Header>
                <MenuApp login={login} setLogin={setLogin} />
            </Header>
            <Content style={{ padding: "20px 50px" }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<h1>Index</h1>} />
                        <Route path="/register" element={<CreateUserComponent openNotification={openNotification}/>} />
                        <Route path="/login" element={<LoginFormComponent setLogin={setLogin} openNotification={openNotification} />} />
                        <Route path="/products" element={<ListProductsComponent />} />
                        <Route path="/products/edit/:id" element={<EditProductComponent />} />
                        <Route path="/products/:id" element={<DetailsProductComponent />} />
                        <Route path="/products/create" element={<CreateProductComponent />} />
                        <Route path="/products/own" element={<ListMyProductsComponent />} />
                    </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Wallapep</Footer>
        </Layout>
    );
}

export default App;
