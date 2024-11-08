import { useEffect, useState } from "react";
import { Table, Space, Tag } from 'antd';
import { Link } from "react-router-dom";
import { timestampToDDMMYYYY } from "../../utils/utilsDate";
import { categories } from "../../utils/useCategories";
import {joinAllServerErrorMessages, setServerErrors} from "../../utils/utilsValidation";

let ListMyProductsComponent = (props) => {

    let { openNotification } = props;

    let [products, setProducts] = useState([])
    let [formErrors, setFormErrors] = useState([])

    let [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        getMyProducts();
    }, [])

    let deleteProduct = async (id) => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/" + id,
            {
                method: "DELETE",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });

        if (response.ok) {
            let jsonData = await response.json();
            if (jsonData.deleted) {
                let productsAfterDelete = products.filter(p => p.id !== id)
                setProducts(productsAfterDelete)
                openNotification("top", "Product  deleted", "success");
            }
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors);
            let notificationMsg = joinAllServerErrorMessages(serverErrors);
            openNotification("top", notificationMsg, "error");
        }
    }

    let getMyProducts = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND_BASE_URL + "/products/own/",
            {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });

        if (response.ok) {
            let jsonData = await response.json();
            jsonData.map(product => {
                product.key = product.id
                return product
            })
            setProducts(jsonData)

            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: jsonData.length,
                },
            });

        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            setServerErrors(serverErrors, setFormErrors);
            let notificationMsg = joinAllServerErrorMessages(serverErrors);
            openNotification("top", notificationMsg, "error");
        }
    }

    let columns = [
        {
            title: "Title",
            dataIndex: "title",
            ellipsis: true,
            fixed: 'left',
            render: (text) => <b>{text}</b>
        },
        {
            title: "Price ($)",
            dataIndex: "price",
            width: 150,
            align: 'right',
            sorter: (a, b) => a.price - b.price
        },
        {
            title: "Category",
            dataIndex: [],
            width: 150,
            align: 'center',
            onFilter: (value, record) => record.category === value,
            filters: categories.map(category => ({
                text: category.label,
                value: category.value,
            })),
            render: (product) =>
                <Tag color={categories.find(cat => cat.value === product.category).color}>
                    {categories.find(cat => cat.value === product.category).icon} {categories.find(cat => cat.value === product.category).label}
                </Tag>
        },
        {
            title: "Published at",
            dataIndex: "date",
            width: 150,
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            render: (date) => timestampToDDMMYYYY(date)
        },
        {
            title: "Buyer",
            dataIndex: [],
            render: (product) =>
                <Link to={"/profile/" + product.buyerId}>{product.buyerEmail}</Link>
        },
        {
            title: "Actions",
            dataIndex: "id",
            render: (id) =>
                <Space.Compact direction="vertical">
                    <Link to={"/products/edit/" + id} style={{ width: "100%" }}>Edit</Link>
                    <Link to={"#"} onClick={() => deleteProduct(id)}>Delete</Link>
                </Space.Compact>
        },
        {
            title: "Description",
            dataIndex: "description",
            ellipsis: true
        }
    ]

    useEffect(() => {
        getMyProducts();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    let handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setProducts([]);
        }
    };

    return (
        <>
            <h1>My products</h1>
            <Table
                columns={columns}
                dataSource={products}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
            />
        </>
    )
}

export default ListMyProductsComponent;
