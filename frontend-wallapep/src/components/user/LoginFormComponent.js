import { useState } from "react";

let LoginFormComponent = () => {

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


    return (
        <div>
            <form>
                <input type="text" name="email" onChange={onChangeEmail} />
                <input type="password" name="password" onChange={onChangePassword} />
                <input type="submit" value="Login"/>
            </form>
            <p> { formData.email } </p>
            <p> { formData.password } </p>
        </div>

    )
}

export default LoginFormComponent;
