import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import {
    allowSubmitForm,
    validateFormDataInputEmail,
    validateFormDataInputRequired, validateSamePassword
} from "../../../utils/utilsValidation";
import {modifyStateProperty} from "../../../utils/utilsState";
import {KeyOutlined, MailOutlined} from "@ant-design/icons";

const UserComponentStep = ({ increaseCurrent, setFormData, formData }) => {
    const requiredInForm = ["email", "password", "repeat_password"];
    const [formErrors, setFormErrors] = useState({});

    return (
        <>
            <Form.Item label={<MailOutlined />}
                       validateStatus={validateFormDataInputEmail(formData, "email", formErrors, setFormErrors) ? "success" : "error"}
            >
                <Input
                    placeholder="your email"
                    value={formData.email || ""}
                    onChange={(i) => {
                        modifyStateProperty(formData, setFormData,
                            "email", i.currentTarget.value)
                    }}/>
                {formErrors?.email?.msg &&
                    <Typography.Text type="danger"> {formErrors.email.msg} </Typography.Text>}
            </Form.Item>

            <Form.Item label={<KeyOutlined />}
                       validateStatus={validateFormDataInputRequired(formData, "password", formErrors, setFormErrors) ? "success" : "error"}
            >
                <Input.Password
                    placeholder="your password"
                    value={formData.password || ""}
                    onChange={(i) => modifyStateProperty(formData, setFormData,
                        "password", i.currentTarget.value)
                    }
                />
                {formErrors?.password?.msg &&
                    <Typography.Text type="danger"> {formErrors.password.msg} </Typography.Text>}
            </Form.Item>

            <Form.Item label={<KeyOutlined />}>
                <Input.Password
                    placeholder="repeat your password"
                    value={formData.repeat_password || ""}
                    onChange={(i) => {
                        modifyStateProperty(formData, setFormData,
                            "repeat_password", i.currentTarget.value);
                        validateSamePassword(formData, i.currentTarget.value, formErrors, setFormErrors);
                    }}
                />
                {formErrors?.repeat_password?.msg &&
                    <Typography.Text type="danger"> {formErrors.repeat_password.msg} </Typography.Text>}
            </Form.Item>

            <Form.Item>
                {allowSubmitForm(formData, formErrors, requiredInForm) ?
                    <Button type="primary" onClick={increaseCurrent} block>Continue</Button> :
                    <Button type="primary" block disabled>Continue</Button>
                }
            </Form.Item>
        </>
    );
};

export default UserComponentStep;
