//model example
app.model({name: 'person'}, {

	primary_key: '_id',

	//name types
	layout: {
		age: 'INTEGER',
		height: 'INTEGER',
		weight: 'INTEGER',
		name: 'STRING'
	},

	//check values before they are added
	validation: {
		age: function(value){
			if(value > 0 && value < 100){ return true; } return false;
		}
	},

	initialize: [
		{age: 34, height: 88, weight: 193, name: 'bill'},
		{age: 23, height: 100, weight: 123, name: 'karl'},
	],

	backend: {

		base_route: '/api/person',
		
		//more configurations to come in the future
	}
});