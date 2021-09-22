/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require("stripe")("sk_test_51JcH4HEMZpwOjq9JNNzBMKvV6KnUyMzWIQF47eRQGC3H2P9VTkWmnrqj5CFnTy6miQ4ORPj20ikKzXm3EyprEwm200Qv1r5TCh"
);
const app = express();
app.use(cors({origin: true}));
app.use(express.json());
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent,
  });
});
exports.api = functions.https.onRequest(app);
