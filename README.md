# Inventory-service-2

Cloud Native Apps Inventory2 services


The service does not yet run on anything but localhost, we need help!


## Routes 

- /inventory responds to GET, GET/:ID, POST, PUT/:ID and DELETE/:ID



## POST ###

### Post requires 
- _id: { type: String, required: true },
- StockHel: { type: Number, required: true },
- StockTur: { type: Number, required: true },
- StockJyv: { type: Number, required: true}


Posting this information creates an item in our inventory. To edit information, you have to use PUT operation with the relevant ID (you can get all IDs with GET operation).

The product team of our organisation needs to POST all new products with it's own ID and initial stock amounts to our inventory.



## GET  ###

- Get without ID will get all items in inventory.
- Get with item ID will get inventory information for a specified ID.

The frontend team of our organisation needs to GET products stock by ID. Stock is stored separately for each warehouse location. Like so:
    
    Helsinki = "StockHel"
    Turku = "StockTur"
    Jyväskylä = "StockJyv"


## PUT  ###
- Here PUT with ID will update with the information you supply.
- Each PUT request needs to have all warehouses in the query.
- Use "-" to subtract and nothing to add. 

The orders team of our organisation needs to PUT orders with the product ID and the amount sold from each warehouse as a request.

### Put example for one order of 2 hats from Helsinki warehouse:
  {
    "StockHel": -2,   (Two hats sold from Helsinki warehose)
    "StockTur": 0,   (Zero hats sold from Turku warehose)
    "StockJyv": 0    (Zero hats sold from Jyväskylä warehose)
  }

Put can also be used by whoever orders more stock. In that case:
  {
    "StockHel": 100,   (100 hats ordered to Helsinki warehose)
    "StockTur": 50,   (50 hats ordered to Turku warehose)
    "StockJyv": 200    (200 hats ordered to Jyväskylä warehose)
  }



## DELETE #####
- Do not use this, contact us for advice.