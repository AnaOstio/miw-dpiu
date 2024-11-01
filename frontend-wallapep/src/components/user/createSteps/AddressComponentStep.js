import {Button, Col, Form, Input, Row, Select} from "antd";
import {FlagOutlined, IdcardOutlined, UserOutlined} from "@ant-design/icons";
import {modifyStateProperty} from "../../../utils/utilsState";

let AddressComponentStep = (props) => {

    let { formData, setFormData, increaseCurrent, decreaseCurrent, openNotification } = props

    let selectOptions = [
        {
            value: 'spain',
            label: 'Spain',
        },
        {
            value: 'england',
            label: 'England',
        },
        {
            value: 'france',
            label: 'France',
        }
    ]

    return (
        <>

            <Form.Item
                label={<UserOutlined />}
            >
                <Input
                    placeholder="your address"
                    value={formData.address || ""}
                    onChange={(i) => {
                        modifyStateProperty(formData, setFormData,
                            "address", i.currentTarget.value)
                    }}/>
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={<FlagOutlined />}>
                        <Select
                            defaultValue="Spain"
                            style={{ width: "100%" }}
                            options={selectOptions}
                        />
                    </ Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="your postal code"
                            value={formData.address || ""}
                            onChange={(i) => {
                                modifyStateProperty(formData, setFormData,
                                    "postalCode", i.currentTarget.value)
                            }}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Button type="default" onClick={decreaseCurrent} block>
                        Back
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type="primary" onClick={increaseCurrent} block>
                        Register
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default AddressComponentStep;