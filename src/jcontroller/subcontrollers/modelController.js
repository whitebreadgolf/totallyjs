'use strict';

define([

  /**
	* @requires jsingleton 
	* @requires jmodel/jmodel
	* @requires jmodel/alterModel/delete
	* @requires jmodel/alterModel/add
	* @requires jmodel/alterModel/get
	* @requires jmodel/alterModel/update
	*/
	'jsingleton', 
	'jmodel/jmodel',
	'jmodel/alterModel/delete',
	'jmodel/alterModel/add',
	'jmodel/alterModel/get',
	'jmodel/alterModel/update'

], function(js, jm, jdelete, add, get, update){

  /**
	* Model Controller Module - object uesd to control access to the model

	* @exports jcontroller/subcontrollers/modelController

	* @param {string} _modelName - model to be modified

	* @returns {Object} object that the user can use to modify a particular model
	*/	
	var model = function(_modelName){
		return{

		  /**
			* The name of the model

			* @public
			*/
			name: _modelName,

		  /**
			* Function used to add data to a model

			* @function add
			* @alias jcontroller/subcontrollers/modelController.add

			* @param {Object} _data - an expected data object
			*/
			add: function(_data){ add.addToModel(_data, this.name); },

		  /**
			* Function used to get data from the model

			* @function get
			* @alias jcontroller/subcontrollers/modelController.get

			* @param {Object} _data - an expected data object
			*/
			get: function(_data){ return get.getFromModel(_data, this.name); },

		  /**
			* Function used to get all data from a model

			* @function getAll
			* @alias jcontroller/subcontrollers/modelController.getAll

			* @param {Object} _data - an expected data object
			*/
			getAll: function(){ return get.getFromModel({}, this.name); },
			
		  /**
			* Function used to delete the first instance of data from a model

			* @function delete
			* @alias jcontroller/subcontrollers/modelController.delete

			* @param {Object} _data - an expected data object
			*/
			delete: function(_data){ jdelete.deleteFromModel(_data, this.name, false); },

		  /**
			* Function used to delete data from a model

			* @function deleteAll
			* @alias jcontroller/subcontrollers/modelController.deleteAll

			* @param {Object} _data - an expected data object
			*/
			deleteAll: function(_data){ jdelete.deleteFromModel(_data, this.name, true); },

		  /**
			* Function used to update the first instance of data from a model

			* @function update
			* @alias jcontroller/subcontrollers/modelController.update

			* @param {Object} _data - an expected data object
			*/
			update: function(_data){ update.updateModel(_data, this.name, false); },

		  /**
			* Function used to update data from a model

			* @function updateAll
			* @alias jcontroller/subcontrollers/modelController.updateAll

			* @param {Object} _data - an expected data object
			*/
			updateAll: function(_data){ update.updateModel(_data, this.name, true); },
		};
	};

	//return model controller object
	return model;
});