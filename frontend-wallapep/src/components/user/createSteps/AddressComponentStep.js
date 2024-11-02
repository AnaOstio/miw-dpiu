import {Button, Col, Form, Input, Row, Select} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {modifyStateProperty} from "../../../utils/utilsState";
import CountrySelect from "../../common/CountrySelect";

let AddressComponentStep = (props) => {

    let { formData, setFormData, doLogin, decreaseCurrent } = props

    return (
        <>

            <Form.Item
                label={<HomeOutlined />}
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
                    <Form.Item label="">
                       <CountrySelect formData={formData} setFormData={setFormData}/>
                    </ Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="your postal code"
                            value={formData.postalCode || ""}
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
                    <Button type="primary" onClick={doLogin} block>
                        Register
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default AddressComponentStep;