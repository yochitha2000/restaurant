# Nodejs_Restaurant_Project_API

# -------Restaurant API----------

http://127.0.0.1:3003/restaurant---------------list all restaurants    (get)</br>

http://127.0.0.1:3003/restaurant------------>Register new restaurants   (post) </br>
{</br>
    "name":"Taj",</br>
    "address":"145 road, near by abc garden, mumbai",</br>
    "opening_hours":"from 9am to 7pm"</br>
}
</br>

http://127.0.0.1:3003/restaurant/6130b4d36b79d7900906b962 ---->List all the products of a restaurant  (get)</br>


http://127.0.0.1:3003/restaurant/6130b4d36b79d7900906b962  -------------->Change a restaurant's data   (patch)</br>
{</br>
    "name":"fajmahal",</br>
    "address":"145 road, near by abc garden, mumbai",</br>
    "opening_hours":"from 9am to 7pm"</br>
}</br>


http://127.0.0.1:3003/product/6130b5e46b79d7900906b96d    --------------->Change a restaurant product   (patch)</br>
{</br>
    "name": "Gulab jamun",</br>
  "price": 100,</br>
  "category":"spice"</br>
}</br>


# ------------product related API------------</br>

http://127.0.0.1:3003/product---------------->Create a restaurant product   (post)</br>
Data will be passed as a form-data</br>
{</br>
    product_image:select the file</br>
    "name": "Berger",</br>
    "price": 100,</br>
    "category":"spice"</br>
}</br>


http://127.0.0.1:3003/product/delete/6130b4d36b79d7900906b962/6130e85b78cdb5bc13f9c5b1  ------->Delete a product from a restaurant</br>


http://127.0.0.1:3003/product/6130b5e46b79d7900906b96d------------->for accessing the buffer image.  (get)</br>

