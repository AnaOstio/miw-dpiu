import {Button, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {modifyStateProperty} from "../../../utils/utilsState";
import {CalendarOutlined, IdcardOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

let PersonalDataComponentStep = (props) => {

    let { increaseCurrent, decreaseCurrent, formData, setFormData } = props

    let selectOptions = [
            {
                value: 'nif',
                label: 'NIF',
            },
            {
                value: 'nie',
                label: 'NIE',
            },
            {
                value: 'passport',
                label: 'Passport',
            }
        ]

    return (
        <>
            <Form.Item
                label={<UserOutlined />}
            >
                <Input
                    placeholder="your name"
                    value={formData.name || ""}
                    onChange={(i) => {
                        modifyStateProperty(formData, setFormData,
                            "name", i.currentTarget.value)
                    }}/>
            </Form.Item>

            <Form.Item
                label={<UserOutlined />}
            >
                <Input
                    placeholder="your surname"
                    value={formData.surname || ""}
                    onChange={(i) => {
                        modifyStateProperty(formData, setFormData,
                            "surname", i.currentTarget.value)
                    }}/>
            </Form.Item>

            <Form.Item label={<CalendarOutlined />}>
                <DatePicker
                    style={{ width: "100%" }}
                    value={formData.birthday ? dayjs(formData.birthday) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => {
                        let timestamp = date ? date.valueOf() : null;
                        modifyStateProperty(formData, setFormData, "birthday", timestamp);
                    }}
                />
            </Form.Item>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item label={<IdcardOutlined />}>
                        <Select
                            defaultValue={selectOptions[0].value}
                            value={formData.value || undefined}
                            style={{ width: "100%" }}
                            options={selectOptions}
                            onChange={(value) => {
                                modifyStateProperty(formData, setFormData,
                                    "documentIdentity", value)
                            }}
                        />
                    </ Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item label="">
                        <Input
                            placeholder="your identification id"
                            value={formData.documentNumber || ""}
                            onChange={(i) => {
                                modifyStateProperty(formData, setFormData,
                                    "documentNumber", i.currentTarget.value)
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
                        Continue
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default PersonalDataComponentStep;