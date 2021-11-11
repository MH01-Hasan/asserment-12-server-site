const express = require('express')
const app = express()
 require('dotenv').config()
const port = process.env.PORT || 5000;

const cors = require('cors')
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId



//middle ware//
app.use(cors ());
app.use(express.json());
//middle ware//




//NEW CONNECT to data base and node server code end//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bs9pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//NEW CONNECT to data base and node server code end//

async function run() {
    try {
        await client.connect();
        const database = client.db("shop");
        const ProductColloction = database.collection("Product");
        const orderColloction = database.collection("order");
        const reviewColloction = database.collection("review");

//****************** All Get Api code ********************************************/

    //GEt  Find Multiple Documents Client site read code//
        app.get('/Product',async(req, res) =>{
            const cursor = ProductColloction.find({});
            const Product= await cursor.toArray();
            res.send(Product)
        })
    //GEt  Find Multiple Documents Client site read code//


    //GEt  Find Multiple review Client site read code//
        app.get('/review',async(req, res) =>{
            const cursor = reviewColloction.find({});
            const review= await cursor.toArray();
            res.send(review)
        })
    //GEt Find Multiple review Client site read code//



    // GET Find single data deatails Document Client site read code//
     app.get('/Product/:id',async (req, res) =>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const Product = await ProductColloction.findOne(query);
        res.send(Product)
     })

    // GET Find single data deatails  Document Client site read code//



    //find booking data//
    app.get('/order',async(req, res) =>{
      const cursor = orderColloction.find({});
      const order= await cursor.toArray();
      res.send(order)
  })
    //find booking data//



    //find  a single  order data//
    app.get("/myOrder/:email", async (req, res) => {
      const result = await orderColloction.find({
        email: req.params.email,
      }).toArray();
      res.send(result);
    });

    //find  a single  order data//


    //****************** All Get Api code  End ********************************************/

//******************** All Post Api  ********************************* */

    // POST Api Creact//
        app.post('/Product',async(req, res)=>{
            const Product = req.body;
            const result = await ProductColloction.insertOne( Product);
            res.send(result);  
        })
    // POST Api Creact//

  //Order/Booking api// 
            app.post('/order',async(req, res)=>{
              const order = req.body;
              const result = await orderColloction.insertOne(order);
              res.send(result);  
          })
   //Order/Booking api//


    // reveiw api//
    app.post('/review',async(req, res)=>{
      const review = req.body;
      const result = await reviewColloction.insertOne(review);
      res.send(result);  
  })
    //reveiw api//

//******************** All Post Api  ********************************* */

//***************** All Delete Api *************************************** */

//Delete all order api  code//
      app.delete('/order/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await orderColloction.deleteOne(query)
        res.json(result)
      })
//Delete all order api  code//

//my order deletapi code //
    app.delete('/myOrder/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await orderColloction.deleteOne(query)
      res.json(result)
    })
//my order deletapi code //
//***************** All Delete Api *************************************** */
    
    
      } 
      
      finally {
        // await client.close();
      }

}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
  });
  app.listen(port, () => {
    console.log("Example" , port)
  });