import LoginFormComponent from "./components/user/LoginFormComponent";
import CreateUserComponent from "./components/user/CreateUserComponent";
import ListProductsComponent from "./components/products/ListProductsComponent";

let App = () => {

    let callBackOnFinishLogin = (loginUser) => {
        console.log("Cambiado "+loginUser.email);
        console.log("Cambiado "+loginUser.password);
    }


    return (
        <div className="App">
            <h1>Wallapep</h1>
            <CreateUserComponent />
            <LoginFormComponent callBackOnFinishLogin = { callBackOnFinishLogin } />
            <ListProductsComponent />
        </div>
    )
}

export default App;
