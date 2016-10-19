import Express from 'express';
import bodyParser from 'body-parser';
import RestaurantRoutes  from './routes/restaurants';
const app = Express();

export default app;


app.use(bodyParser.json());
app.use('/restaurants', RestaurantRoutes);


app.listen(3000, function(){
  console.log('App has started');
});
