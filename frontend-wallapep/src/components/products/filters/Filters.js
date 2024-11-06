import { Checkbox, Typography, Input, Slider, Button, Tag, Col, Row } from "antd";
import { categories } from "../../../utils/useCategories";
import { useEffect, useState } from "react";
import {FilterOutlined} from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;

const Filters = (props) => {

    let { selectedCategories, searchTitle, priceRange, onCategoryChange, onTitleSearch, onPriceChange, onResetFilters } = props
    let [selectAllChecked, setSelectAllChecked] = useState(false);
    let [minPrice, setMinPrice] = useState(priceRange[0]);
    let [maxPrice, setMaxPrice] = useState(priceRange[1]);
    let [categoryCounts, setCategoryCounts] = useState(undefined);

    useEffect(() => {
        fetchCategoryCounts();
    }, []);

    useEffect(() => {
        setSelectAllChecked(selectedCategories.length === categories.length);
    }, [selectedCategories]);

    useEffect(() => {
        setMinPrice(priceRange[0]);
        setMaxPrice(priceRange[1]);
    }, [priceRange]);

    let fetchCategoryCounts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/categories/count`, {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });
            if (response.ok) {
                let countsArray = await response.json();
                setCategoryCounts(countsArray);
            } else {
                console.error("Error al obtener los conteos de productos por categoría.");
            }
        } catch (error) {
            console.error("Error de red al obtener los conteos de productos:", error);
        }
    };


    let handleMinPriceChange = (e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setMinPrice(value);
        onPriceChange([value, maxPrice]);
    };

    let handleMaxPriceChange = (e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setMaxPrice(value);
        onPriceChange([minPrice, value]);
    };

    let handleSelectAllChange = (e) => {
        if (e.target.checked) {
            onCategoryChange(categories.map(category => category.value));
        } else {
            onCategoryChange([]);
        }
        setSelectAllChecked(e.target.checked);
    };

    return (
        <>
            <Title level={4}><FilterOutlined /> Filter by</Title>

            {/* Filtro por título */}
            <Search
                placeholder="Search by title"
                value={searchTitle}
                allowClear
                onSearch={onTitleSearch}
                onChange={(e) => onTitleSearch(e.target.value)}
                style={{ marginBottom: 16 }}
            />

            {/* Checkbox "Seleccionar todos" */}
            <Checkbox
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
                style={{ marginBottom: 8 }}
            >
                {selectAllChecked ? "Deselect All Categories" : "Select All Categories"}
            </Checkbox>

            {/* Filtro por categoría */}
            <Checkbox.Group
                style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
                onChange={onCategoryChange}
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
                            {category.icon} {category.label} { }
                            ({categoryCounts && categoryCounts.find(count => count.category === category.value)?.num_products || 0})
                        </Tag>
                    </Checkbox>
                ))}
            </Checkbox.Group>

            {/* Filtro por rango de precios con inputs numéricos */}
            <Title level={5}>Price Range</Title>
            <Row gutter={8} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Input
                        type="number"
                        placeholder="Min price"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        min={0}
                    />
                </Col>
                <Col span={12}>
                    <Input
                        type="number"
                        placeholder="Max price"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        min={0}
                    />
                </Col>
            </Row>

            <Button type="primary" block onClick={onResetFilters}>Reset Filters</Button>
        </>
    );
};

export default Filters;
