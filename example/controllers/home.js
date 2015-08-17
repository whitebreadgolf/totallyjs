//home controller
app.controller({name: 'homeController'},{

	home:function(view, model, helper){

		//bind data to view
		view('home').addData('title', 'home');

		//set the grid data in the grid
		view('home').addData('griddata', model('person').getAll());

		//render view
		view('home').render();
	},

	main:function(view, model, helper){

		//bind data to view
		view('main').addData('title', 'main');

		//render view
		view('main').render();
	}, 

	addPerson: function(view, model, helper){
		model('person').add({age: 23, height: 100, weight: 123, name: 'karl'});

		this.home(view, model, helper);
	},

	deletePerson: function(view, model, helper){
		model('person').delete({ where: {name: 'karl'}});

		this.home(view, model, helper);
	},

	updatePerson: function(view, model, helper){
		model('person').updateAll({ update: {age: 24}, where: {name: 'karl'} });

		this.home(view, model, helper);
	}
});
