import { useState } from "react";

let LoginFormComponent = (props) => {

    let [formData,setFormData] = useState({
        email: '- empty email -',
        password : '- empty password -',
    })

    let onChangeEmail = (e) => {
        setFormData({
            ...formData,
            email: e.target.value
        });
    }
    let onChangePassword = (e) => {
        setFormData({
            ...formData,
            password: e.target.value
        });
    }

    let clickLogin =  () => {
        props.callBackOnFinishLogin(formData);
    }


    return (
        <div>
            <form>
                <input type="text" name="email" onChange={onChangeEmail}/>
                <input type="password" name="password" onChange={onChangePassword}/>
                <input type="submit" value="Login"/>
                <button onClick={clickLogin}>Accept</button>
            </form>
            <p> {formData.email} </p>
            <p> { formData.password } </p>
        </div>

    )
}

export default LoginFormComponent;
