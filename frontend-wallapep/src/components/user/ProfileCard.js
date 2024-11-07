import {Avatar, Card, Col, Row, Typography} from "antd";
import Title from "antd/es/skeleton/Title";
import {selectOptions} from "../../utils/useCountries";

let ProfileCard = (props) => {

    let { user } = props;
    const countryCode = selectOptions.find(c => c.label === user.country)?.code;

    // URL de la bandera usando el código de país
    const flagUrl = countryCode ? `https://flagsapi.com/${countryCode}/flat/64.png` : '';

    let { Text} = Typography;

    return (
        <Card
            style={{
                width: '100%',
                maxWidth: '800px',
                margin: '20px auto',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            bordered={false}
        >
            <Row align="middle" gutter={16}>
                <Col>
                    {flagUrl && <Avatar size={64} src={flagUrl} alt={`${user.country} flag`} />}
                </Col>
                <Col flex="auto">
                    {user.name && (
                        <><Text strong>Name: </Text><Text>{user.name}</Text><br/></>
                    )}
                    <Text strong>Email: </Text><Text>{user.email}</Text><br />
                    <Text strong>ID: </Text><Text>{user.id}</Text><br />
                    {
                        user.country &&
                            <><Text strong>Country: </Text><Text>{user.country}</Text><br /></>
                    }

                    {
                        user.postalCode &&
                        <><Text strong>Postal Code: </Text><Text>{user.postalCode}</Text><br /></>
                    }
                </Col>
            </Row>
        </Card>
    );
}

export default ProfileCard;