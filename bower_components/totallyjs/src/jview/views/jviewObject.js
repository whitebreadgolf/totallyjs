'use strict';

define([

  /**
	* @requires jview/tags/tags
    */
	'jview/tags/tags',

], function(tags){

  /**
	* JView Object Module - used as base object for a html tag object
	
	* @exports jview/jviewObject
	* @returns {Object} jview Object data and helper functions
	*/
	var jview = function(_dom){

		//return view object
		return {

			//name type
			TYPE: 'view',

			//stores tags and content as an object
			dom: _dom,

			//title of the view
			id: '',

			//optional class
			class: '',

			//style
			style: '',

			//all variables in this view
			variables: {},

			//render function
			render: function(viewObj){

				//insert variables
				for(var vars in this.variables){ viewObj[vars] = this.variables[vars];}

				//format identification string
				var idString = '#' + this.id + this.TYPE +' .' + this.class + ' style="' + this.style + '"';

				//return the rendered tags wrapped in a div with the idString
				return tags.div(idString, this.dom).render(viewObj); 
			},

			getId: function(){ return this.title; },
			setId: function(_id){ this.id = _id; },

			getClass: function(){ return this.class; },
			setClass: function(_class, _concat){ 
				
				if(_concat){
					//if not empty, concat
					if(this.class === ''){ this.class = _class; }
					else{ this.class += _class; }
				}
				else{ this.class = _class; }
			},

			getStyle: function(){ return this.style; },
			setStyle: function(_style){
				this.style = _style;
			},

			getVariable: function(_var){ if(this.variables[_var] !== undefined){return this.variables[_var];} else{ return null; }},
			setVariable: function(_varObj){ this.variables[_varObj.name] = _varObj.value; },
		};
	};

	//export jviewObject
	return jview;
});