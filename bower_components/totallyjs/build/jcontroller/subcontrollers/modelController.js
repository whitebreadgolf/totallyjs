define(["jsingleton","jmodel/jmodel","jmodel/alterModel/delete","jmodel/alterModel/add","jmodel/alterModel/get","jmodel/alterModel/update"],function(e,t,n,r,i,s){var o=function(e){return{name:e,add:function(e){r.addToModel(e,this.name)},get:function(e){return i.getFromModel(e,this.name)},getAll:function(){return i.getFromModel({},this.name)},"delete":function(e){n.deleteFromModel(e,this.name,!1)},deleteAll:function(e){n.deleteFromModel(e,this.name,!0)},update:function(e){s.updateModel(e,this.name,!1)},updateAll:function(e){s.updateModel(e,this.name,!0)}}};return o});