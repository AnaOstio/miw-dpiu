import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Card, Col, Row, Checkbox, Typography, Input, Slider, Button, Tag} from "antd";
import { checkURL } from "../../utils/utilsURL";
import {categories} from "../../utils/useCategories";
import {ShoppingOutlined} from "@ant-design/icons";
import ProductCard from "./ProductCard";

const { Title } = Typography;
const { Search } = Input;

let ListProductsComponent = () => {
    let [products, setProducts] = useState([]);
    let [filteredProducts, setFilteredProducts] = useState([]);
    let [selectedCategories, setSelectedCategories] = useState([]);
    let [searchTitle, setSearchTitle] = useState("");
    let [priceRange, setPriceRange] = useState([0, 1000]); // Rango de precios inicial

    useEffect(() => {
        getProducts();
    }, []);

    let getProducts = async () => {
        let response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/products", {
            method: "GET",
            headers: {
                "apikey": localStorage.getItem("apiKey")
            },
        });

        if (response.ok) {
            let jsonData = await response.json();
            let promisesForImages = jsonData.map(async p => {
                let urlImage = process.env.REACT_APP_BACKEND_BASE_URL + "/images/" + p.id + ".png";
                let existsImage = await checkURL(urlImage);
                p.image = existsImage ? urlImage : "/imageMockup.png";
                return p;
            });

            let productsWithImage = await Promise.all(promisesForImages);
            setProducts(productsWithImage);
            setFilteredProducts(productsWithImage);
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach(e => {
                console.log("Error: " + e.msg);
            });
        }
    };

    // Filtra productos en base a categoría, título y rango de precios
    const filterProducts = () => {
        let filtered = products.filter(p => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
            const matchesTitle = p.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
            return matchesCategory && matchesTitle && matchesPrice;
        });
        setFilteredProducts(filtered);
    };

    // Actualiza el estado de las categorías seleccionadas y filtra
    const handleCategoryChange = (checkedValues) => {
        setSelectedCategories(checkedValues);
    };

    // Actualiza el estado del título buscado
    const handleTitleSearch = (value) => {
        setSearchTitle(value);
    };

    // Actualiza el rango de precios
    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSearchTitle("");
        setPriceRange([0, 1000]);
        setFilteredProducts(products);
    };

    // Filtrar cuando el usuario cambia alguna opción
    useEffect(() => {
        filterProducts();
    }, [selectedCategories, searchTitle, priceRange]);

    return (
        <>
            <Row gutter={[16, 16]} style={{ minHeight: "70vh" }}>
                {/* Columna de filtrado */}
                <Col span={6}>
                    <Title level={4}>Filter by</Title>

                    {/* Filtro por título */}
                    <Search
                        placeholder="Search by title"
                        value={searchTitle}
                        allowClear
                        onSearch={handleTitleSearch}
                        onChange={(e) => handleTitleSearch(e.target.value)}
                        style={{ marginBottom: 16 }}
                    />

                    {/* Filtro por categoría */}
                    <Checkbox.Group
                        style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
                        onChange={handleCategoryChange}
                        value={selectedCategories}
                    >
                        {categories.map(category => (
                            <Checkbox
                                key={category.value}
                                value={category.value}
                                style={{
                                    color: category.color,
                                    marginBottom: 8
                                }}
                            >
                                <Tag color={category.color}>
                                    {category.icon} {category.label}
                                </Tag>
                            </Checkbox>
                        ))}
                    </Checkbox.Group>

                    {/* Filtro por rango de precios */}
                    <Title level={5}>Price Range</Title>
                    <Slider
                        range
                        min={0}
                        max={1000}
                        defaultValue={[0, 1000]}
                        onChange={handlePriceChange}
                        value={priceRange}
                        style={{ marginBottom: 16 }}
                    />

                    <Button type="primary" block onClick={resetFilters}>Reset Filters</Button>
                </Col>

                <Col span={18}>
                    <Title level={4}>Products - {filteredProducts.length} results </Title>
                    <Row gutter={[16, 16]}>
                        {filteredProducts.map(p => (
                            <ProductCard product={p} />
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ListProductsComponent;
