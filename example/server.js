var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
var fs = require('fs');
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/.."));

//db config
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var personSchema = mongoose.Schema({
	age: Number,
	height: Number,
	weight: Number,
    name: String
});

var Person = mongoose.model('Person', personSchema);

app.get('/api/person', function(req, res) {

	Person.find({}, function(err, people){

		if(people){ return res.json(people); }
		else if(err){return res.json({}); }
	});
});
app.get('/api/person/:index', function(req, res) {

	Person.find({where: {id: req.params.index}}, function(err, person){

		if(person){ return res.json(person); }
		else if(err){ return res.json({error: 'error'}); }
	});
});

//update
app.put('/api/person/:index', function(req, res) {

	//first check data
	if(req.query.person && req.params.index){

		var qData = JSON.parse(req.query.person);

		Person.findByIdAndUpdate(req.params.index, qData, function(err, person){

			if(person){ return res.json({_id: person.id}); }
			else if(err){ return res.json({data: 'error'}); }
		});
	}
	else{ return res.json({data: 'data needed'}); }
});

//add
app.put('/api/person', function(req, res) {

	//first check data
	if(req.query.person){

		//get indicies and data
		var qData = JSON.parse(req.query.person);

		Person.create( qData, function(err, person){

			if(person){ return res.json({_id: person.id}); }
			else if(err){ return res.json({data: 'error'}); }
		});
	}
	else{ return res.json({data: 'data needed'}); }
});

app.delete('/api/person/:index', function(req, res) {

	//first check data
	if(req.params.index){
		Person.findByIdAndRemove(req.params.index, function(err, person){
			
			if(person){ return res.json({_id: person.id}); }
			else if (err){ return res.json({data: 'error'}); }
		});
	}
	else{
		return res.json({data: 'data needed'});
	}	
});

app.listen(process.env.PORT || 5000);