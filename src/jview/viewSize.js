'use strict';

//0 --> xs
var XS_VIEW = 0;

//1 --> sm
var SM_VIEW = 1;

//2 --> md
var MD_VIEW = 2;

//3 --> lg
var LG_VIEW = 3;

//4 --> xl
var XL_VIEW = 4;


define([], function(render){

	var _view_size;
	if(window.innerWidth > 1 && window.innerWidth <= 640){ _view_size = XS_VIEW; }
	else if(window.innerWidth > 640 && window.innerWidth <= 760){ _view_size = SM_VIEW; }
	else if(window.innerWidth > 760 && window.innerWidth <= 960){ _view_size = MD_VIEW; }
	else if(window.innerWidth > 960 && window.innerWidth <= 1200){ _view_size = LG_VIEW; }
	else{ _view_size = XL_VIEW; }

  /**
	* View Size Module - for initializing and storing the view size
	
	* @exports jcontroller/render
	*/
	var viewSize = {

	  /**	
		* The size of the view represented as an integer

		* @public
		*/
		view_size: _view_size,
	};
	
	//export view size
	return viewSize;
});


