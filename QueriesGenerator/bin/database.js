var mongoose = require('mongoose');
var searchEngine = require('../models/search-engine');
var searchTag = require('../models/search-tag');



// database configuration
var mongodb_host="52.214.65.240";
var mongodb_username="helloworld";
var mongodb_password="helloworld!Arbigrine";
var mongodb_db_name="tts_db";
var mongodb_conn_string='mongodb://'+mongodb_username+':'+mongodb_password+'@'+mongodb_host+'/'+mongodb_db_name;


mongoose.set('debug', true);
mongoose.model('search-engine',searchEngine);
mongoose.model('search-tag',searchTag);


mongoose.connect(mongodb_conn_string, {server:{auto_reconnect:true}});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        process.exit(0);
    });
});