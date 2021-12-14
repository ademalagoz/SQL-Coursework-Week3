const express = require("express");
const app = express();
app.use(express.json());
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost", //Luke:if it is public in a real project be careful for the this and below credentials
  database: "cyf_ecommerce",
  password: "admin",
  port: 5432,
});

// Add a new GET endpoint `/customers/` to load all the customers.
// Luke: Added 1 space between * and FROM
app.get("/customers", (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  pool.query("SELECT * FROM customers", (result) => {
=======
  pool.query("SELECT *FROM customers", (error, result) => {
>>>>>>> parent of 5ed95b4 (Task 7-10)
=======
  pool.query("SELECT *FROM customers", (error, result) => {
>>>>>>> parent of 5ed95b4 (Task 7-10)
    res.json(result.rows);
  });
});

// Add a new GET endpoint `/products/` to load all the products.
app.get("/products", (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  pool.query("SELECT * FROM products", (result) => {
=======
  pool.query("SELECT *FROM products", (error, result) => {
>>>>>>> parent of 5ed95b4 (Task 7-10)
=======
  pool.query("SELECT *FROM products", (error, result) => {
>>>>>>> parent of 5ed95b4 (Task 7-10)
    res.json(result.rows);
  });
});
// Add a new GET endpoint `/availability/` to load all the products.
app.get("/availability", (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  pool.query("SELECT * FROM product_availability", (result) => {
=======
  pool.query("SELECT *FROM product_availability", (error, result) => {
>>>>>>> parent of 5ed95b4 (Task 7-10)
=======
  pool.query("SELECT *FROM product_availability", (error, result) => {
>>>>>>> parent of 5ed95b4 (Task 7-10)
    res.json(result.rows);
  });
});
// Add a new GET endpoint `/orders` to load all the orders.
app.get("/orders", (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  pool.query("SELECT * FROM orders", (result) => {
    res.json(result.rows);
  });
});
// Add a new GET endpoint `/orders/:orderId`
app.get("/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  pool.query("SELECT * FROM orders WHERE id=$1", [orderId], (result) => {
    res.json(result.rows);
  });
});
// Add a new GET endpoint `/customers/:customerId`
app.get("/customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  pool.query("SELECT * FROM customers WHERE id=$1", [customerId], (result) => {
    res.json(result.rows);
  });
});

///////////////////////////   TASKS   ////////////////////////////////////////////////////////////
=======
  pool.query("SELECT *FROM orders", (error, result) => {
    res.json(result.rows);
  });
});
>>>>>>> parent of 5ed95b4 (Task 7-10)
=======
  pool.query("SELECT *FROM orders", (error, result) => {
    res.json(result.rows);
  });
});
>>>>>>> parent of 5ed95b4 (Task 7-10)

// Task -1 Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  pool
<<<<<<< HEAD
<<<<<<< HEAD
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
=======
    .query("SELECT *FROM customers WHERE id=$1", [id])
>>>>>>> parent of 5ed95b4 (Task 7-10)
=======
    .query("SELECT *FROM customers WHERE id=$1", [id])
>>>>>>> parent of 5ed95b4 (Task 7-10)
    .then((result) => res.json(result.rows))
    .catch((error) => console.log(error));
});

//Task-2  Add a new POST endpoint `/customers` to create a new customer with name, address, city and country.

app.post("/customers", (req, res) => {
  const { name, address, city, country } = req.body;

  pool
    .query(
      "INSERT INTO customers(name, address, city,country) VALUES($1,$2,$3,$4)",
      [name, address, city, country]
    )
    .then(() => res.send("New customer added"))
    .catch((error) => console.log(error));
});

//Task-3 Add a new POST endpoint `/products` to create a new product.

app.post("/products", (req, res) => {
  const newProductName = req.body.product_name;
  pool
    .query("INSERT INTO products(product_name) VALUES($1)", [newProductName])
    .then(() => res.send("New product added"))
    .catch((error) => console.log(error));
});

//Task -4 Add a new POST endpoint `/availability` to create a new product availability (with a price and a supplier id).
//Check that the price is a positive integer and that both the product and supplier ID's exist in the database, otherwise return an error

app.post("/availability", (req, res) => {
  const productId = req.body.prod_id;
  const price = req.body.unit_price;
  const supplierId = req.body.supp_id;

  // Luke: What happens here if I send a non-number values for price? Can you handle that any better?

  if (price <= 0 || isNaN(price) || !supplierId || !productId)
    return res.status(400).send("Please fill al the fields correct!");
  else
    pool
      .query("SELECT * FROM product_availability WHERE prod_id=$1", [productId])
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(400).json("the product id does not exist!");
        }
      });
  pool
    .query("SELECT * FROM product_availability WHERE supp_id=$1", [supplierId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(400).json("the supplier id does not exist!");
      }
    });
  pool
    .query(
      "INSERT INTO product_availability(productId, supplierId, price) VALUES($1,$2,$3)",
      [productId, price, supplierId]
    )
    .then(() => res.status(200).json("product is available"))
    .catch((error) => console.log(error));
});
//Task-6 - Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer.
// Check that the customerId corresponds to an existing customer or return an error.

app.post("/customers/:customerId/orders", (req, res) => {
  const customerId = req.params.customer_id;
  // const { order_date, order_reference } = req.body;
  const orderDate = req.body.order_date;
  const orderReference = req.body.order_reference;
  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        pool
          .query(
            "INSERT INTO orders(customer_id, order_date, order_reference) VALUES($1,$2,$3)",
            [customerId, orderDate, orderReference]
          )
          .then(() => res.status(200).json("new order created"))
          .catch((error) => console.log(error));
      } else {
        return res.status(400).send("customer id does not exist!");
      }
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
