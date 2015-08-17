'use strict';

define([

  /**
	* @requires jcontroller/subcontrollers/listener/listenerQueues
	*/
	'jcontroller/subcontrollers/listener/listenerQueues'

], function(listenerQueue){

  /**
	* Listener Object Module - object uesd to control access to listeners
	
	* @exports jcontroller/subcontrollers/listener/listenerObject
	*/	
	var listenerObject = {
	
	  /**
		* Function used clear all listeners from the listenerQueue

		* @function clearListeners
		* @alias jcontroller/subcontrollers/listener/listenerObject.clearListeners
		*/
		clearListeners: function(){

			//remove class listners from the dom
			for(var classListener in listenerQueue.classListenerQueue){

				var elements = document.getElementsByClassName(classListener);

				for(var elem=0; elem<elements.length; elem++){ 
					for(var type in listenerQueue.classListenerQueue[classListener]){

						if(elements !== undefined){ elements[elem].removeEventListener(type, event); }

						else{ throw "class name doesn't exist"; }
					}	
				}
			}

			//remove id listeners from the dom
	 		for(var idListener in listenerQueue.idListenerQueue){

				var element = document.getElementById(idListener);

				for(var type in listenerQueue.idListenerQueue[idListener]){

					if(element !== undefined){ element.removeEventListener(type, event); }

					else{ throw "id doesn't exist"; }
				}
			}

			//empty the eventlistener queues
			listenerQueue.classListenerQueue = {};
			listenerQueue.idListenerQueue = {};
		},

	  /**
		* Function called after the view is rendered to add all the user specified listeners

		* @function addAllListeners
		* @alias jcontroller/subcontrollers/listener/listenerObject.addAllListeners
		*/
		addAllListeners: function(){
			//adding all listners bined to classes
			for(var classListener in listenerQueue.classListenerQueue){

				var elements = document.getElementsByClassName(classListener);

				for(var elem=0; elem<elements.length; elem++){ 
					for(var type in listenerQueue.classListenerQueue[classListener]){

						if(elements !== undefined){

							//actually add the listener here
							elements[elem].addEventListener(type, function event(e){ 

								//elem is the target element
								var real_targ = e.target;

								//return specified handler with element and event
								while(real_targ !== undefined){

									if(listenerQueue.classListenerQueue[real_targ.className] && listenerQueue.classListenerQueue[real_targ.className][e.type].handler){
										listenerQueue.classListenerQueue[real_targ.className][e.type].handler(real_targ); 
										break;
									}

									else{ real_targ = real_targ.parentElement; }
								}
							});
						}

						else{ throw "class name doesn't exist"; }
					}	
				}
			}

			//adding all listeners binded to ids
	 		for(var idListener in listenerQueue.idListenerQueue){

				var element = document.getElementById(idListener);

				for(var type in listenerQueue.idListenerQueue[idListener]){

					if(element !== undefined){
						element.addEventListener(type, function event(e){ 

							//real_targ is the target element
							var real_targ = e.target;

							//return specified handler with element and event
							while(real_targ !== undefined){

								if(real_targ && real_targ.id && listenerQueue.idListenerQueue[real_targ.id] && listenerQueue.idListenerQueue[real_targ.id][e.type].handler){
									listenerQueue.idListenerQueue[real_targ.id][e.type].handler(real_targ); 
									break;
								}

								else{ real_targ = real_targ.parentElement; }
							}
						});
					}

					else{ throw "id doesn't exist"; }
				}
			}
		}
	};

	return listenerObject;
});