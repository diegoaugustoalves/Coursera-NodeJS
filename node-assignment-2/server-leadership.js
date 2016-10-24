var mongoose = require('mongoose');
var Leaders = require('./models/leadership');
var objectLeader = require('./data/objectLeader');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
    console.log('Connected corretly to server');

    Leaders.create(objectLeader, function(err, leader){
        if (err) throw err;
        console.log('Leader created successfullly');
        console.log(leader);

        var id = leader._id;

        setTimeout(function(){
            Leaders.findByIdAndUpdate(id, {
                $set:{
                    description: "Update"
                }
            },{
                new: true
            })
            .exec(function(err, leader){
                console.log('Leader updated successfully');
                console.log(leader);

                db.collection('leaders').drop(function(){
                    db.close();
                });
            });
        }, 3000);
    });
});