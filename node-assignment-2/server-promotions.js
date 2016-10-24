var mongoose = require('mongoose');
var Promotions = require('./models/promotions');

var objectPromo = require('./data/objectPromo'); 

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected correctly to server');

    Promotions.create(objectPromo, function(err, promo){
        if (err) throw err;
        console.log('Promo created successfully');
        console.log(promo);

        var id = promo._id;

        setTimeout(function(){
            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description: "update"
                    }
                },
                {
                    new: true
                }
            )
            .exec(function(err, promo){
                if (err) throw err;
                console.log("Updated successfully");
                console.log(promo);

                db.collection('promotions').drop(function(){
                    db.close();
                });
            });
        }, 3000);
    });

});