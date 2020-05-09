const mongoose = require('mongoose');
mongoose.set("debug",true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/warbler",{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

module.exports.User = require('./user'); 
module.exports.Messages = require('./message');