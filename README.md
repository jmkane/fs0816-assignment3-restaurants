# Assignment 3: Restaurants API

Built an RESTFUL API that allows a user to search for a restaurant, add
their favorite restaurant, update a restaurant, and remove a restaurant.

You'll need to connect to MongoDB, and persist (save the data)
restaurants so that as a user you can query the restaurants. Use Postman
to access your API. These are the following routes(urls) that your API
will need to respond to.

## Initial Setup

Install the following packages:

```bash
$ npm install express mongodb joi --save
```

Setup the express application in the `src/index.js` file.

### ES2015 Modules

We also need to transition to the new ES2015 modules to help us
transition to Angular. For more information about ES2015 modules read
about it
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
For the most part, this syntax will replace the `const express =
require('some-module')` with `import express from 'express'`.


### Express Routing

We've built the API's inline thus far. This is not ideal as
application's grow. Express has created a `Route` object to isolate code
between routes and the express application. This is the preferred
method. Learn more about routes
[here](http://expressjs.com/en/guide/routing.html).

`express.Router` helps separate concerns. For this appliation, use this
as the preferred way to route urls. The nice part about the router is
you can:

```js
import RestaurantRoutes from './routes/restaurants';
app.use('/restaurants', RestaurantRoutes);
```


### Common HTTP Status Codes

| Code | Description                                  |
|:-----|:---------------------------------------------|
| 200  | Everything is OK.  Returns JSON              |
| 201  | Response after you've created something      |
| 400  | The body of a POST/PUT is invalid.  Bad Data |
| 404  | Not Found                                    |
| 500  | Internal Service Error                       |


## Routes (URLS)

Your API will need to be accessible through the following urls below.
The HTTP verb is indicated before the endpoint.

--- 

### **GET** */restaurants&search*

> This endpoint retrieves all the restaurants. It also takes an optional
> query parameter that allows the user to query the restaurants by their
> name. When the query parameter isn't present, return all the
> restaurants.

**QueryString Parameters**

| Parameter | Description                                                                                                                                                               | Type   |
|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| search    | Use this parameter to query the restaurants by name.  Bonus points if you use a regular express to find any restaurants so that you don't need to specify the exact name. | String |


#### Helpers & Hints

1. Resolving a promise is done with the `.then()` function. This means
   that your promise(s) will need to be resolved before you call the
   `response.json()`

**Promise Resolution Example**

```js
app.get('/restaurant', (request, response) => {
  
  // Assuming Restaurants.find() returns a promise
  return Restaurants.find({...})
    .then(restaurants => {
      return response.json(restaurants);
    });
});
```

1. To access the query string parameters, you'll need to access the
   request.queryString object. This is similar to the `request.params`
   object.


**Query Parameters Code**

```
// Example Code
app.get('/restaurant', (request, response) => {
  const query = request.query.search;
});
```

---

### GET - /restaurants/top-rated

> Return only the top rated restaurants


#### Helpers & Hints

1. The query should find all restaurant that have an `A` grade. The
   query should look something like this `{ grades.grade: { $in: ['A']
   }} }`. See
   [this](https://docs.mongodb.com/manual/tutorial/query-documents/#specify-multiple-criteria-for-array-elements)
   for more information.


### GET - /restaurants/favorites

> This url returns any user defined favorites. Until now, we don't have
> a very good mechanism to indicate that a restaurant is a user's
> **favorite**. For this scenario, we will take advantage of MongoDB's
> document flexibility and create a boolean on a restaurant that can be
> set to true when it has been flagged. Use the field/attribute
> `isFavorite` for any restaurants that are your favorites.

#### Helpers & Hints

1. The query to find favorites should be something like `{ isFavorite:
   true }`.

2. Remember that this field is something we created, so not everything
   will have this.


### GET - /restaurant/:id

> This url should retrieve a single restaurant by it's _id.

**Url Parameters**

| Parameter | Description                                                                                                                                           |
|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| id        | This should map directly to the `_id` parameter in the MongoDB.   Remember the `_id` is a "artificial" id, but makes it unique throughout the system. |


---

### POST - /restaurant

> Creates a new restaurant

**Fields**

| Field            | Type    | Required | Description         |
|:-----------------|:--------|:---------|:--------------------|
| name             | String  | Yes      |                     |
| borough          | String  | Yes      |                     |
| cuisine          | String  | Yes      |                     |
| grades           | Array   | No       | Defaults to `[]`    |
| address          | Object  | Yes      |                     |
| address.building | String  | Yes      |                     |
| address.coord    | Array   | No       | Default to `[]`     |
| address.street   | String  | Yes      |                     |
| address.zipcode  | String  | Yes      |                     |
| isFavorite       | Boolean | no       | Defaults to `false` |


#### Helpers & Hints


---

### PUT - /restaurant/:id

> Updates a restaurant

**Url Parameters**

| Parameter | Description                                                                                                                                           |
|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| id        | This should map directly to the `_id` parameter in the MongoDB.   Remember the `_id` is a "artificial" id, but makes it unique throughout the system. |


**Fields**

| Field            | Type    | Required | Description         |
|:-----------------|:--------|:---------|:--------------------|
| name             | String  | Yes      |                     |
| borough          | String  | Yes      |                     |
| cuisine          | String  | Yes      |                     |
| grades           | Array   | No       | Defaults to `[]`    |
| address          | Object  | Yes      |                     |
| address.building | String  | Yes      |                     |
| address.coord    | Array   | No       | Default to `[]`     |
| address.street   | String  | Yes      |                     |
| address.zipcode  | String  | Yes      |                     |
| isFavorite       | Boolean | no       | Defaults to `false` |


#### Helpers & Hints

---

### DELETE - /restaurant/:id

> Deletes a restaurant by their _id.

**Url Parameters**

| Parameter | Description                                                                                                                                           |
|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| id        | This should map directly to the `_id` parameter in the MongoDB.   Remember the `_id` is a "artificial" id, but makes it unique throughout the system. |


#### Helpers & Hints

Respond with a [204](https://httpstatuses.com/204) status code. This
indicates all is well.

```js
app.delete('/restaurants', (req, res) => {
  // Do Work
  res.status(204).send();
});
```

---

### Resources

Here are some valuable resources.

* [MongoDB API](http://mongodb.github.io/node-mongodb-native/2.2/api) -
  The MongoDB Node API
* [ES2015 Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- The new way to import and export code
* [Joi Validation](https://github.com/hapijs/joi/blob/v9.0.4/API.md) -
  You might want to use this for body validation.
* [HTTP Status Codes](https://httpstatuses.com) - The standard codes
  uses for HTTP


