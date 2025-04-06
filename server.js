import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import nodemon from "nodemon";

const mainUrl =  "https://real.heroksa.net";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", async (req, res) => {
    try{
        console.log("req",req.body);

        const {emailphone,password}=req.body;
    const url = `${mainUrl}/login`;

    const response = await axios.post(url, {emailphone,password});
    console.log("response",response.data);
    res.send(response.data);
  } catch (error) {
    console.log("error",error);
    res.status(500).send(error);
  }
});


app.post("/show/admin/products", async (req, res) => {
  try{
    console.log("req",req.body);
    const url = `${mainUrl}/show/admin/products`;
    const response = await axios.post(url, req.body);
    console.log("response",response.data);
    res.send(response.data);
  } catch (error) {
    console.log("error",error);
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});



// For rings:
// Product image/ metal type:
// Multiple metal type/product images exists and all of them can be updated via crud.
// For non-rings:
// Product image:
// product images only 1 field exists without name and small_image field and only 1 record exists for product images