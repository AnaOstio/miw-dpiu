import {Route, Routes} from "react-router-dom"
import LoginFormComponent from "./components/user/LoginFormComponent";
import CreateUserComponent from "./components/user/CreateUserComponent";
import ListProductsComponent from "./components/products/ListProductsComponent";
import EditProductComponent from "./components/products/editProductComponent";

import { Layout, Menu } from 'antd';
import MenuApp from "./components/common/menuApp";
import DetailsProductComponent from "./components/products/DetailsProductComponent";

let App = () => {

    // for not using Layout.Header, Layout.Footer, etc...
    let { Header, Content, Footer } = Layout;

    return (
        <Layout className="layout" style={{ minHeight: "100vh" }}>
            <Header>
                <MenuApp />
            </Header>
            <Content style={{ padding: "20px 50px" }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" element={
                            <h1>Index</h1>
                        } />
                        <Route path="/register" element={
                            <CreateUserComponent />
                        } />
                        <Route path="/login" element={
                            <LoginFormComponent/>
                        } />
                        <Route path="/products" element={
                            <ListProductsComponent/>
                        } />
                        <Route path="/products/edit/:id" element={
                            <EditProductComponent/>
                        }></Route>
                        <Route path="/products/:id" element={
                            <DetailsProductComponent/>
                        } />
                    </Routes>
                </div>
            </Content>

            <Footer style={{ textAlign: "center" }} > Wallapep </Footer>
        </Layout>
    )
}

export default App;
