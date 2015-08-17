'use strict';

define([],function(){

  /**
	* JSingleton Module - contains views, controllers, models, routes and helper functions
	
	* @exports jsingleton
	*/
	var js = {

	  /**	
		* Main singleton object
	
		* @alias jsingleton#singleton
		* @public
		*/ 
		singleton: {

		  /**	
			* View map
		
			* @alias jsingleton#singleton#views
			* @public
			*/ 
			views: {},

		  /**	
			* Route map
		
			* @alias jsingleton#singleton#routes
			* @public
			*/ 
			routes: {},

		  /**	
			* Model map
		
			* @alias jsingleton#singleton#models
			* @public
			*/ 
			models: {},

		  /**	
			* Controller map
		
			* @alias jsingleton#singleton#controllers
			* @public
			*/ 
			controllers: {},

		  /**	
			* Helper map
		
			* @alias jsingleton#singleton#helpers
			* @public
			*/ 
			helpers: {}
		}
	};

	//return singleton object
	return js;
});