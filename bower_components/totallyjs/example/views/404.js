//404 view
app.view({name: '404', type: 'jview', input: 'javascript'}, function($){	
	return [
		$.div('#main .pviewContainer', [
			$.div('.pcenter.pviewColumn100', [
				$.h4('#title', ['Page Not Found'])
			])	
		])
	];
});