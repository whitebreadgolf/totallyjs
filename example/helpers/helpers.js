app.helper({name: 'linkRenderHome'}, function(view, model, listener, data){

	//bind data to view
	view('home').addData('title', 'home');

	//set the grid data in the grid
	view('home').addData('griddata', model('person').getAll());

	view('home').render();
});