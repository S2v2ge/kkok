var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// Keys for issuing account
var issuingKeys = StellarSdk.Keypair.fromSecret(
"SA3ZX4B54TTYBVV5QK53NEOMUH6HYLQBGCH3QQF4O4JL6MWQDWXGFCII",
);

server
.loadAccount(issuingKeys.publicKey())
.then(function (issuer) {
var transaction = new StellarSdk.TransactionBuilder(issuer, {
fee: 100,
networkPassphrase: StellarSdk.Networks.TESTNET,
})
.addOperation(
StellarSdk.Operation.setOptions({
homeDomain: "eratouch.com",
}),
)
// setTimeout is required for a transaction
.setTimeout(100)
.build();
transaction.sign(issuingKeys);
return server.submitTransaction(transaction);
})
.then(console.log)
.catch(function (error) {
console.error("Error!", error);
});
