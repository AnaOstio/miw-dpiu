import TransactionsTable from "./TransactionsTable";
import React, {useEffect, useState} from "react";

let MyTransactionsComponent = () => {

    let [transactions, setTransactions] = useState([]);
    let [transactionsBuying, setTransactionsBuying] = useState([]);
    let [productsBougth, setProductsBougth] = useState([]);
    let [productsSold, setProductsSold] = useState([]);

    useEffect(() => {
        fetchUserTransactionsSelling();
        fetchUserTransactionsBuying();
    }, [localStorage.getItem("userId")]);

    let fetchUserTransactionsSelling = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/transactions/public?sellerId=${localStorage.getItem("userId")}`,
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
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/transactions/public?buyerId=${localStorage.getItem("userId")}`,
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

    return (
        <>
            <h2>Transactions Sold</h2>
            <ul>
                <TransactionsTable sold={true} products={productsSold}/>
            </ul>

            <h2>Transactions purchased</h2>
            <ul>
                <TransactionsTable sold={false} products={productsBougth}/>
            </ul>
        </>
    );
}

export default MyTransactionsComponent;