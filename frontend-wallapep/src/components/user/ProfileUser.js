import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsTable from '../products/table/ProductsTable';
import TransactionsTable from "../transactions/TransactionsTable";
import ProductCard from "../products/ProductCard";
import ProfileCard from "./ProfileCard";

let ProfileUser = () => {
    let { userId } = useParams();
    let [userData, setUserData] = useState(null);
    let [transactions, setTransactions] = useState([]);
    let [transactionsBuying, setTransactionsBuying] = useState([]);
    let [productsBougth, setProductsBougth] = useState([]);
    let [productsSold, setProductsSold] = useState([]);

    let [products, setProducts] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchUserTransactionsSelling();
        fetchUserProducts();
        fetchUserTransactionsBuying();
    }, [userId]);

    let fetchUserData = async () => {

        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "apikey": localStorage.getItem("apiKey")
                    },
                }
            );
            if (response.ok) {
                let data = await response.json();
                setUserData(data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    let fetchUserTransactionsSelling = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/transactions/public?sellerId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "apikey": localStorage.getItem("apiKey")
                    },
                }
            );
            if (response.ok) {
                let data = await response.json();
                let productsSold = await Promise.all(data.map(async transaction => {
                    let productResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${transaction.productId}`, {
                        method: "GET",
                        headers: {
                            "apikey": localStorage.getItem("apiKey")
                        },
                    });
                    let productData = await productResponse.json();
                    let sellerResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/${productData.buyerId}`, {
                        method: "GET",
                        headers: {
                            "apikey": localStorage.getItem("apiKey")
                        },
                    });
                    let buyerData = await sellerResponse.json();
                    productData.buyerEmail = buyerData.email;
                    return productData;
                }));
                setTransactions(data);
                setProductsSold(productsSold);
            }
        } catch (error) {
            console.error('Error fetching user transactions:', error);
        }
    };

    let fetchUserTransactionsBuying = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/transactions/public?buyerId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "apikey": localStorage.getItem("apiKey")
                    },
                }
            );
            if (response.ok) {
                let data = await response.json();
                let productsBoughtData = await Promise.all(data.map(async transaction => {
                    let productResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${transaction.productId}`, {
                        method: "GET",
                        headers: {
                            "apikey": localStorage.getItem("apiKey")
                        },
                    });
                    let productData = await productResponse.json();
                    let sellerResponse = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/${productData.sellerId}`, {
                        method: "GET",
                        headers: {
                            "apikey": localStorage.getItem("apiKey")
                        },
                    });
                    let sellerData = await sellerResponse.json();
                    productData.sellerEmail = sellerData.email;
                    return productData;
                }));
                setProductsBougth(productsBoughtData);
                setTransactionsBuying(data);
            }
        } catch (error) {
            console.error('Error fetching user transactions:', error);
        }
    }

    let fetchUserProducts = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products?sellerId=${userId}`, {
                method: "GET",
                headers: {
                    "apikey": localStorage.getItem("apiKey")
                },
            });
            if (response.ok) {
                let data = await response.json();
                setProducts(data);
            };
        } catch (error) {
            console.error('Error fetching user products:', error);
        }
    };

    return (
        <div>
            <h1>User Profile</h1>
            {
                userData && <ProfileCard user={userData} />
            }
            <h2>Transactions Sold</h2>
            <ul>
                <TransactionsTable sold={true} products={productsSold} />
            </ul>

            <h2>Transactions  purchased</h2>
            <ul>
                <TransactionsTable sold={false} products={productsBougth} />
            </ul>
            <h2>Products for Sale</h2>
            <ul>
                <ProductsTable products={products} />
            </ul>
        </div>
    );
};

export default ProfileUser;