import LoginFormComponent from "./components/user/LoginFormComponent";

let App = () => {

    let callBackOnFinishLogin = (loginUser) => {
        console.log("Cambiado "+loginUser.email);
        console.log("Cambiado "+loginUser.password);
    }


    return (
        <div className="App">
            <h1>Wallapep</h1>
            <LoginFormComponent callBackOnFinishLogin = { callBackOnFinishLogin } />
        </div>
    )
}

export default App;
