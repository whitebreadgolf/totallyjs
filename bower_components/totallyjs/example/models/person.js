//model example
app.model({name: 'person'},{

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
		
		//routes show how data is sent to backend
		config: {
			base_route: '/api/person',
			routes : {
				get: {route: '/api/person/|index|', params: []},
				getAll: {route: '/api/person', params: []},
				add: {route: '/api/person', params: [{name: 'person', type: 'OBJECT'}]},
				delete: {route: '/api/person/|index|', params: []},
				//update: {route: '/api/person/|index|', params: [{name: 'person', type: 'OBJECT'}]}
			},
			handlers: {

			}
		}
	},

	methods: {
		
	}
});