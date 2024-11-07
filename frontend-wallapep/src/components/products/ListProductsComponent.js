import { useEffect, useState } from "react";
import { Col, Row, Typography, Pagination } from "antd";
import { checkURL } from "../../utils/utilsURL";
import ProductCard from "./ProductCard";
import Filters from "./filters/Filters";


const { Title } = Typography;

let ListProductsComponent = (props) => {
    let { openNotification } = props;
    let [products, setProducts] = useState([]);
    let [filteredProducts, setFilteredProducts] = useState([]);
    let [selectedCategories, setSelectedCategories] = useState([]);
    let [searchTitle, setSearchTitle] = useState("");
    let [priceRange, setPriceRange] = useState([0, 1000]);
    let [formErrors, setFormErrors] = useState({})

    let [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 8;

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
            let maxPrice = 0;
            let jsonData = await response.json();
            let promisesForImages = jsonData.map(async p => {
                let urlImage = process.env.REACT_APP_BACKEND_BASE_URL + "/images/" + p.id + ".png";
                let existsImage = await checkURL(urlImage);
                p.image = existsImage ? urlImage : "/imageMockup.png";
                if (p.price > maxPrice) {
                    maxPrice = p.price;
                }
                return p;
            });

            let productsWithImage = await Promise.all(promisesForImages);
            setPriceRange([0, maxPrice]);
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

    let filterProducts = () => {
        let filtered = products.filter(p => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
            const matchesTitle = searchTitle === "" || p.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
            return matchesCategory && matchesTitle && matchesPrice;
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const handleCategoryChange = (checkedValues) => {
        setSelectedCategories(checkedValues);
    };

    const handleTitleSearch = (value) => {
        setSearchTitle(value);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSearchTitle("");
        setPriceRange([0, 1000]);
        setFilteredProducts(products);
        setCurrentPage(1);
    };

    useEffect(() => {
        filterProducts();
    }, [selectedCategories, searchTitle, priceRange]);

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let currentProducts = filteredProducts.slice(startIndex, endIndex);

    let handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Row gutter={[16, 16]} style={{ minHeight: "70vh" }}>
            <Col span={6}>
                <Filters
                    selectedCategories={selectedCategories}
                    searchTitle={searchTitle}
                    priceRange={priceRange}
                    onCategoryChange={handleCategoryChange}
                    onTitleSearch={handleTitleSearch}
                    onPriceChange={handlePriceChange}
                    onResetFilters={resetFilters}
                />
            </Col>

            <Col span={18}>
                <Title level={4}>Products - {filteredProducts.length} results</Title>

                <Row gutter={[16, 16]}>
                    {currentProducts.map(p => (
                        <ProductCard key={p.id} product={p} openNotification={openNotification} />
                    ))}
                </Row>

                {/* Componente de paginación */}
                <Pagination
                    responsive
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={filteredProducts.length}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    onChange={handlePageChange}
                    style={{ marginTop: "16px", textAlign: "center" }}
                />
            </Col>
        </Row>
    );
};

export default ListProductsComponent;
