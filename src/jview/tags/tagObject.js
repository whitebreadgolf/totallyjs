'use strict';

define([

  /**
  	* @requires jview/tags/tagObjectRender
    */
	'jview/tags/tagObjectRender'

], function(tor){

  /**
	* Tag Object Module - returns the constructed tag object
	
	* @exports jview/tags/tagObject
	*/
	var to = {

	  /**
		* Function to return the Tag Object, an object for referencing html tags
		
		* @function tagObjectBuilder
		* @alias jview/tags/tagObject.tagObjectBuilder
		
		* @param {string} _identifier - string holding all tag identifiers
		* @param {Object[]} _content - all tag object within the current tag object
		* @param {string} _tag - name of tag
		* @returns {Object} Tag Object with helper functions and data
		*/
		tagObjectBuilder: function(_identifier, _content, _tag){
			return { 

				//name type
				TYPE: 'tag',

				//all variables in this view
				variables: {},

				content: _content, identifier: _identifier, type: _tag,

				addElementHandlers: function(){ 
					for(var elem in this.content){ if(this.content[elem] instanceof Object){this.content[elem].addElementHandlers();}}
				},
				render: function(viewObj){ return tor(this.identifier, this.content, this.type, viewObj);  }
			};
		},
	};

	return to;
});