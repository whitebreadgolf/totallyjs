var ROW_NUM=100;define(["jsingleton","jview/tags/tags","jview/views/jviewObject","jcontroller/render","jview/viewSize"],function(e,t,n,r,i){var s={jview:function(e){return{TYPE:"placeholder",name:e.name}},jform:function(t){if(t===undefined)throw"jform needs options to instantiate";if(t.modalName===undefined)throw"jform needs a modal to instantiate";if(e.singleton.models[t.modalName]===undefined)throw"model "+t.modalName+" does not exist in app";var n=[];return t.ommitted!==undefined&&t.ommitted.length>0&&(n=t.ommitted),{modelName:t.modelName,build:function(e){},render:function(e){}}},jtable:function(e){},jlist:function(e){},jgrid:function(e){if(e===undefined)throw"grid needs options to instantiate";var r="";if(e.name===undefined)throw"grid needs a title";r=e.name;var s=[];if(e.columns){if(e.columns.default===undefined)throw"columns option needs default value";e.columns.xs!==undefined?s.push(e.columns.xs):s.push(e.columns.default),e.columns.sm!==undefined?s.push(e.columns.sm):s.push(e.columns.default),e.columns.md!==undefined?s.push(e.columns.md):s.push(e.columns.default),e.columns.lg!==undefined?s.push(e.columns.lg):s.push(e.columns.default),e.columns.xl!==undefined?s.push(e.columns.xl):s.push(e.columns.default)}var o={};if(e.skeleton===undefined)throw"grid needs a skeleton to instantiate";o=e.skeleton;var u="";if(e.gridDataName===undefined)throw"grid a name for it's data";return u=e.gridDataName,{id:r,colSizeArray:s,TYPE:"grid",gridDataName:u,numGridElements:0,gridElements:[],variables:{},skeleton:o,pGridData:[],build:function(e){if(e[this.gridDataName]===undefined)throw"gridDataName "+this.gridDataName+" is not correct";if(this.gridElements!==undefined&&this.gridElements.length===e[this.gridDataName].length)for(var r=0;r<this.gridElements.length;r++){this.gridElements[r].setStyle(this.formatStyle());for(var i in e[this.gridDataName][r])this.gridElements[r].setVariable({name:i,value:e[this.gridDataName][r][i]})}else{this.gridElements=[];for(var r=0;r<e[this.gridDataName].length;r++){var s=n(this.skeleton);s.setId(this.id+"elem"+r),s.setStyle(this.formatStyle());for(var i in e[this.gridDataName][r])s.setVariable({name:i,value:e[this.gridDataName][r][i]});this.gridElements.push(s)}}return t.div(".pviewContainer.pcenter",this.gridElements)},formatStyle:function(){return"width:"+Math.floor(ROW_NUM/this.colSizeArray[i.view_size])+"%;display:inline-block;"},render:function(e){return this.build(e).render(e)},getpGridData:function(){return this.pGridData},setpGridData:function(e){this.pGridData=e,this.numGridElements=e.length}}}};return s});