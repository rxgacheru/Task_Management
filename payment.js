
const button = document.getElementById('triggerPayment');
    button.addEventListener('click', () => {
  
  const phoneNumber = document.getElementById('phoneNumber').value;
  const amount = document.getElementById('amount').value;

 console.log(`Triggering payment for amount ${amount} to phone number ${phoneNumber}...`);
});

const MPESA_TOKEN_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

const generateToken = async () => {
    try {
        const secret = process.env.MPESA_SECRET_KEY;
        const consumer = process.env.MPESA_CONSUMER_KEY;
        const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");
        const response = await axios.get(MPESA_TOKEN_URL, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        throw new Error(error.message);
    }
};

const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 3000; 

const date = new Date();
const timestamp = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}${("0" + date.getHours()).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${("0" + date.getSeconds()).slice(-2)}`;

const shortcode = 174379;
const passkey = 'LdRHVTRcZoBKBoB33qppZAbKXGDI';
const password = btoa(shortcode + passkey + timestamp).toString("base64");

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "Bearer LdRHVTRcZoBKBoB33qppZAbKXGDI");

fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
  method: 'POST',
  headers,
  body: JSON.stringify({
    "BusinessShortCode": 174379,
    "Password": password,
    "TransactionType": "CustomerPayBillOnline",
    "Timestamp": timestamp,
    "Amount": amount,
    "PartyA": 254708855315,
    "PartyB": 174379,
    "PhoneNumber": phoneNumber, 
    "CallBackURL": "https://localhost:8000/callback",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "test"
  })
})
 .then(response => response.text())
 .then(result => console.log(result))
 .catch(error => console.log(error)); 


 /*const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 3000; // Fallback port if PORT is not defined

app.listen(port, () => {
    console.log(`App is running at localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const MPESA_TOKEN_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const MPESA_STK_PUSH_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

app.get("/", (req, res) => {
    res.send("<h1>Hello Kib</h1>");
});

const generateToken = async () => {
    try {
        const secret = process.env.MPESA_SECRET_KEY;
        const consumer = process.env.MPESA_CONSUMER_KEY;
        const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");
        const response = await axios.get(MPESA_TOKEN_URL, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        throw new Error(error.message);
    }
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
};

app.use(errorHandler);

app.post("/stk", async (req, res, next) => {
    try {
        const token = await generateToken();
        const phone = req.body.phone.substring(1);
        const amount = req.body.amount;
        const date = new Date();
        const timestamp = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}${("0" + date.getHours()).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${("0" + date.getSeconds()).slice(-2)}`;
        const shortcode = process.env.MPESA_PAYBILL;
        const passkey = process.env.MPESA_PASSKEY;
        const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");
        const response = await axios.post(MPESA_STK_PUSH_URL, {
            "BusinessShortCode": process.env.MPESA_PAYBILL,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": `254${phone}`,
            "PartyB": shortcode,
            "PhoneNumber": `254${phone}`,
            "CallBackURL": "https://mydomain.com/pat",
            "AccountReference": `254${phone}`,
            "TransactionDesc": "Test"
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
}); */