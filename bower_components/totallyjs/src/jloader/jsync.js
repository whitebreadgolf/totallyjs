'use strict';

define([], function(){

  /**
	* JSync Module - used to keep track of the file loading status

	* @exports jloader/jsync
	*/	
	var sync = {
	
	  /**
		* Integer to check loading status of scripts

		* @public
		*/
		loadingStatus: 0,

	  /**
		* Indicates that file loading has been started

		* @public
		*/
		start: false
	};

	//export sync object
	return sync;
});