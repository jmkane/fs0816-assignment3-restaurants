import Db from './db';
const MongoDB = require('mongodb');
const ObjectID = MongoDB.ObjectID;
const RESTAURANTS = 'restaurants';


export default {

  find(search = ''){
    var query = {name: search};
    if (!query) {
      return Db.then(db => {
          return db.collection(RESTAURANTS)
            .find()
            .toArray()
        }
      );
    }
    else {
      return Db.then(db => {
        return db.collection(RESTAURANTS)
          .find(query)
          .toArray();
        // .map(() => {
        //   if(RESTAURANTS.name = search)
        //     return RESTAURANTS;
        // })
      });
    }
  },

  findById(id)
  {
    return Db.then(db => {
      const query = {_id: ObjectID(id)};
      return db.collection(RESTAURANTS)
        .findOne(query);
    });
  },

  update(id, restaurant)
  {
    return Db.then(db => {
      const query = {_id: ObjectID(id)};
      return db.collection(RESTAURANTS)
        .findOneAndUpdate(
          query,
          {$set: restaurant},
          {returnDocument: true}
        )

    });
  },

  findTopRated()
  {
    return Db.then(db => {
      const query = {'grades.grade':{ $in:['A'] }};
      return db.collection(RESTAURANTS)
        .find(query)
        .toArray()
     });
  },

  findFavorites()
  {
    return Db.then(db => {
      const query = {isFavorite:true};
      return db.collection(RESTAURANTS)
        .find(query)
        .toArray()
    });
  },

  delete(id){
    return Db.then(db => {
      const query = {_id: ObjectID(id)};
      return db.collection(RESTAURANTS)
        .findOneAndDelete(query)
    });
  },

  insert(restaurant)
  {
    return Db.then(db => {
      return db.collection(RESTAURANTS)
        .insertOne(
          restaurant
        )
    });
  }

}
