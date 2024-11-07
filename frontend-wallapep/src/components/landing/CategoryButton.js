import { Card } from "antd";
import {Link} from "react-router-dom";

const CategoryButton = (props) => {
    let { label, color, value } = props;
    return (
        <Link to={`/all-products/${value}`} style={{ textDecoration: 'none' }}>
            <Card
                hoverable
                style={{
                    backgroundColor: '#f0f0f0',
                    textAlign: 'center',
                    width: 120,  // Aumentamos el ancho del círculo
                    height: 160, // Ajustamos la altura para que haya espacio para el texto
                    borderColor: color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                }}
            >
                <div
                    style={{
                        width: 100, // Tamaño del círculo de imagen
                        height: 100,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: `3px solid ${color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8, // Espacio entre la imagen y el texto
                    }}
                >
                    <img
                        src={`/categories/${value}.png`}
                        alt={label}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <p style={{ marginTop: 0, fontSize: 14, color: '#333' }}>{label}</p>
            </Card>
        </Link>
    );
}

export default CategoryButton;
