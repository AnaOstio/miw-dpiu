import {categories} from "../../utils/useCategories";
import {Space, Table, Tag} from "antd";
import {timestampToDDMMYYYY} from "../../utils/utilsDate";
import {Link} from "react-router-dom";
import {useState} from "react";

let TransactionsTable = (props) => {

    let { sold, products, transaction } = props;

    let [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

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
            title: sold ? "Buyer" : "Seller",
            dataIndex: [],
            render: (product) =>
                <Link to={"/profile/" + (sold ? product.buyerId : product.sellerId)}>{sold ? product.buyerId : product.sellerEmail}</Link>
        },
        {
            title: "Description",
            dataIndex: "description",
            ellipsis: true
        }
    ]

    let handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };

    return (
        <Table
            columns={columns}
            dataSource={products}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
        />
    )
}

export default TransactionsTable;