'use strict';

/* Set Constants */

//number of css classes to describe size
var ROW_NUM = 100;

define([

  /**
  	* @requires jsingleton
	* @requires jview/tags/tags
	* @requires jview/views/jviewObject
    * @requires jcontroller/render
	* @requires jview/viewSize
    */
	'jsingleton',
	'jview/tags/tags',
	'jview/views/jviewObject',
	'jcontroller/render',
	'jview/viewSize'

], function(js, tags, jview, render, viewSize){

  /**
	* JView Module - returns all objects representing different types of views
	
	* @exports jview/jview
	*/
	var jv = {

	  /**
		* Function to return the View Placeholder Object, an object for referencing current views
		
		* @function jview
		* @alias jview/jview.jview
		
		* @param {Object} _options - holds data to instantiate the View Placeholder Object
		* @returns {Obejct} View Placeholder Object with helper functions and data
		*/
		jview: function(_options){

			return{
				TYPE: 'placeholder',
				name: _options.name
			};
		},
	
	  /**
		* Function to return the Form Builder Object, an object to represent a form in the dom
		
		* @function jform
		* @alias jview/jview.jform
		
		* @param {Object} _options - holds data to instantiate the Form Builder Object
		* @returns {Obejct} Form Builder Object with helper functions and data
		*/
		// jform: function(_options){

		// 	if(_options === undefined){ throw 'jform needs options to instantiate'; }
		// 	if(_options.modalName === undefined){ throw 'jform needs a modal to instantiate'; }

		// 	//validate the model
		// 	if(js.singleton.models[_options.modalName] === undefined){ throw 'model '+_options.modalName+' does not exist in app'; }

		// 	var ommitted = [];
		// 	if(_options.ommitted !== undefined && _options.ommitted.length > 0){ ommitted = _options.ommitted; }

		// 	return{

		// 		modelName: _options.modelName,

		// 		build: function(viewObj){

		// 		},

		// 		render: function(viewObj){

		// 		}
		// 	}
		// },

	  /**
		* Function to return the Table Builder Object, an object to represent a table in the dom
		
		* @function jview
		* @alias jview/jview.jtable
		
		* @param {Object} _options - holds data to instantiate the Table Builder Object
		* @returns {Obejct} Table Builder Object with helper functions and data
		*/
		jtable: function(_options){

		},

	  /**
		* Function to return the List Builder Object, an object to represent a list in the dom
		
		* @function jview
		* @alias jview/jview.jlist
		
		* @param {Object} _options - holds data to instantiate the List Builder Object
		* @returns {Obejct} List Builder Object with helper functions and data
		*/
		jlist: function(_options){

		},

	  /**
		* Function to return the Grid Builder Object, an object to represent a grid in the dom
		
		* @function jview
		* @alias jview/jview.jgrid
		
		* @param {Object} _options - holds data to instantiate the Grid Builder Object
		* @returns {Obejct} Grid Builder Object with helper functions and data
		*/
		repeat: function(_options){

			//options needed to instantiate
			if(_options === undefined){ throw 'grid needs options to instantiate'; return; }

			//set the name of the grid for future

			//check skeleton
			var _skeleton = {};
			if(_options.skeleton !== undefined){ _skeleton = _options.skeleton; }
			else{ throw 'grid needs a skeleton to instantiate'; }

			//check data name
			var _dataName = '';
			if(_options.data !== undefined){ _dataName = _options.data; }
			else{ throw "grid a name for it's data"; }

			//return the grid object
			return{

				//name type
				TYPE: 'grid',

				dataName: _dataName,

				//set the number of gridElements
				numGridElements: 0,

				//all the sub views
				gridElements: [],

				//all variables in this view
				variables: {},

				//this is plaintext
				skeleton: _skeleton,

				//data is instantiated
				pGridData: [],

				//build the text
				build: function(viewObj){

					//error checking for the name of the grid data
					if(viewObj[this.dataName] === undefined){ throw 'gridDataName '+this.dataName+' is not correct'; }
					
					//if we already built the grid just change the classes and re-add the variables
					if(this.gridElements !== undefined && this.gridElements.length === viewObj[this.dataName].length){ 
						for(var i=0;i<this.gridElements.length;i++){ 
							for(var j in viewObj[this.dataName][i]){ this.gridElements[i].setVariable({name: j, value: viewObj[this.dataName][i][j]}); }
						}
					}

					//else make all the views
					else{ 
						
						//make sure it's clear
						this.gridElements = [];

						for(var i=0;i<viewObj[this.dataName].length;i++){

							//instantiate view with skeleton
							var view = jview(this.skeleton);

							//set title and class
							view.setId(this.id+'elem'+i);

							//set varaibles for the view
							for(var j in viewObj[this.dataName][i]){ view.setVariable({name: j, value: viewObj[this.dataName][i][j]}); }
							this.gridElements.push(view);
						}
					}

					//set dom object
					return tags.div('.pviewContainer.pcenter', this.gridElements);
				},

				//make all inner views and then render
				render: function(viewObj){ return this.build(viewObj).render(viewObj); },

				getpGridData: function(){ return this.pGridData; },
				setpGridData: function(data){
					this.pGridData = data;
					this.numGridElements = data.length
				}
			};
		}	
	};

	//return our jview object
	return jv;
});


