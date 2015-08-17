//main view
app.view({name: 'main', type: 'jview', input: 'javascript'}, function($){
	return [	
		$.div('#main .pviewContainer', [
			$.div('.pcenter.pviewColumn100', [
				$.h4('#title', ['this is [[title]]'])
			]),	
			$.div('.pcenter.pviewColumn100', [
				$.a('href="#/home"', ['home']), 
				' ', 
				$.a('href="#/main"', ['main'])
			])
		])
	];
});