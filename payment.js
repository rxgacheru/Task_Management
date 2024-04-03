
const button = document.getElementById('triggerPayment');
    button.addEventListener('click', () => {
  
  const phoneNumber = document.getElementById('phoneNumber').value;
  const amount = document.getElementById('amount').value;

 console.log(`Triggering payment for amount ${amount} to phone number ${phoneNumber}...`);
});


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
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of"
  })
})
 .then(response => response.text())
 .then(result => console.log(result))
 .catch(error => console.log(error)); 
