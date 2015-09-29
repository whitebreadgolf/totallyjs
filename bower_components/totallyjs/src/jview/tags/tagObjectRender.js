'use strict';

define([

  /**
  	* @requires jview/tags/tagContentParser
    */
	'jview/tags/tagContentParser'

], function(tcp){

  /**
	* Tag Object Render Module - control logic for printing out a tag with content
	
	* @exports jview/tags/tagObjectRender
	*/
	var tor = function (identifier, content, tag, viewObj){

		if(identifier !== undefined && Object.keys(identifier).length != 0 && content !== undefined && content.length != 0){ return '<'+ tag +''+ tcp.getIdentifiers(identifier) +'>'+ tcp.allContent(content, viewObj) +'</'+ tag +'>'; }
		
		else if(identifier !== undefined && Object.keys(identifier).length != 0){ return '<'+ tag +''+ tcp.getIdentifiers(identifier) +'></'+ tag +'>'; }
		
		else if(content !== undefined && content.length != 0){ return '<'+ tag +'>'+ tcp.allContent(content, viewObj) +'</'+ tag +'>'; }
		
		else{ return '<'+ tag +'></'+ tag +'>';	}
	};

	//export tag object render object
	return tor;
});