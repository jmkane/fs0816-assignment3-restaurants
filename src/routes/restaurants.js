// http://expressjs.com/en/4x/api.html#express.router
import RestaurantServices from '../services';
import { Router } from 'express';
import request from 'express';


const router = new Router();

//define the home page route

// router.get('/', (req, res) =>{
//   // res.send('db home page');
//   return res.json[];
//
// });

router.get('/', (request, response) =>{
//  res.send('db home page');
    const query = request.query.search;
    console.log(query);
    return RestaurantServices.find(query)
      .then(restaurant => {
        return response.json(restaurant)
      })
      .catch(e => { return res.status(500).json({message: 'Error in data base',
        error: e})})
    });


router.get('/favorites', (req,res) => {
  return RestaurantServices
    .findFavorites()
    .then(restaurant => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Not Found', code: 404 });
      }
      return res.json(restaurant);
    })
    .catch(e => res.status(500).json(e));
});

router.get('/top-rated', (req,res) => {
  return RestaurantServices
    .findTopRated()
    .then(restaurant => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Not Found', code: 404 });
      }
      return res.json(restaurant);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json(e)

    });
});

router.get('/:id', (req,res) => {
  const id = req.params.id;
  console.log(id);
  return RestaurantServices
    .findById(id)
    .then(restaurant => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Not Found', code: 404 });
      }
      return res.json(restaurant);
    })
    .catch(e => res.status(500).json(e));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const restaurant = req.body;
  return RestaurantServices.update(id, restaurant)
    .then(restaurant => {
      return res.json(restaurant);
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json(e);
    });
});


router.post('/', (req, res) => {
  const restaurant = req.body;
  console.log(restaurant);
  return RestaurantServices.insert(restaurant)
    .then(restaurant => {
      return res.json(restaurant);
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json(e);
    });
});

//noinspection CommaExpressionJS
router.delete('/:id', (req, res) => {
 const id = req.params.id;
 return RestaurantServices.delete(id)
  .then(restaurant => {
    if (!restaurant) {
      return res.status(404).json({ message: 'Not Found', code: 404 });
    }
    return res.json(restaurant);
  })
  .catch(e => {
    console.log(e);
    return res.status(500).json(e);
  });
});


export default router;
