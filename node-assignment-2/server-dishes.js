var mongoose = require('mongoose');
var assert = require('assert');
var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';

var objectDish = require('./data/objectDish');
var objectCommentDish = require('./data/objectCommentDish');

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('Connect corretly to server');

    Dishes.create(objectDish, function(err, dish){
        if (err) throw err;

        console.log('Dish created successfully');
        console.log(dish);

        var id = dish._id;

        setTimeout(function(){
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: "Update"
                }
            },{
                new: true
              }
            )
            .exec(function(err, dish){
                if (err) throw err;
                console.log('Updated successfully');
                console.log(dish);

                dish.comments.push(objectCommentDish);

                dish.save(function(err, dish){
                    if (err) throw err;
                    console.log('Saved successfully');
                    console.log(dish);

                    db.collection('dishes').drop(function(){
                        db.close();
                    });
                });

            });
        }, 3000);
    });
});