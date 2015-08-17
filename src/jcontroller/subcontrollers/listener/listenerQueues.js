'use strict';

define([], function(){

  /**
	* Listener Queues Module - object uesd to access all listeners added to a view

	* @exports jcontroller/subcontrollers/listener/listenerQueues
	*/
	var listenerQueue = {
	
	  /**
		* Listener queue for class binded listeners

		* @public
		*/
		classListenerQueue: {},

	  /**
		* Listener queue for id binded listeners

		* @public
		*/
		idListenerQueue: {}
	};

	//export listener queues 
	return listenerQueue;
});