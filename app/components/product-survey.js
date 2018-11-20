import Component from '@ember/component';
import $ from 'jquery';
import {get} from '@ember';

export default Component.extend({

  scale:1,
  left:10,
  didReceiveAttrs(){
    this._super(...arguments);
    var pages = $('.flip-page');
  for(var i = 0;i<pages.length;i++){
    pages[i].classList.add('page'+i);
    if(i==0){
      pages[i].classList.add('current-page');
      $('.page'+i).css({'left':'0px',"z-index":(pages.length-i),"transform":"scale("+get('scale')+")","opacity":1});
    }else {
      $('.page'+i).css({'left':''+i*left+'px',"z-index":''+(pages.length-i)+'',"opacity":1-(0.2*i),"transform":"scale("+(scale-(0.05*i))+")"});
    }

  }
  },

  next(){
    this.forward($('.flip-page'));
  },

  previous(){
    this.reverse($('.flip-page'));
  },


forward(x){
  var center = x.length;
  for(var y = 0; y<x.length;y++){
    if(x[y].classList.contains('current-page')){
      center = y;
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+this.computeValue($('.page'+y).css('left'))-left+'px',"z-index":$('.page'+y).css('z-index')-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
      x[y].classList.remove('current-page');
    }else if(y<center){
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+this.computeValue($('.page'+y).css('left'))-left+'px',"z-index":$('.page'+y).css('z-index')-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
    }else{
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+this.computeValue($('.page'+y).css('left'))-left+'px',"z-index":parseInt($('.page'+y).css('z-index'))+1,"transform":this.matrixFnForwrd($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))+0.2)});
    }
  }
  x[++center].classList.add('current-page');
},

reverse(x){
  var center = x.length;
  for(var y = 0; y<x.length;y++){
    if(x[y].classList.contains('current-page')){
      center = y;
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+(this.computeValue($('.page'+y).css('left'))+left)+'px',"z-index":parseInt($('.page'+y).css('z-index'))-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
      x[y].classList.remove('current-page');
    }else if(y<center){
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+(this.computeValue($('.page'+y).css('left'))+left)+'px',"z-index":parseInt($('.page'+y).css('z-index'))+1,"transform":this.matrixFnForwrd($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))+0.2)});
    }else{
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+(this.computeValue($('.page'+y).css('left'))+left)+'px',"z-index":parseInt($('.page'+y).css('z-index'))-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
    }
  }
  x[--center].classList.add('current-page');
},


goToSlide(x){
},

matrixFnForwrd(matrix){
  var matArray = matrix.replace(/[^0-9\-.,]/g, '').split(',');
  return "matrix("+(parseFloat(matArray[0])+0.05)+",0,0,"+(parseFloat(matArray[0])+0.05)+",0,0)";
},

matrixFnBack(matrix){
  var matArray = matrix.replace(/[^0-9\-.,]/g, '').split(',');
  return "matrix("+(parseFloat(matArray[0]-0.05))+",0,0,"+(parseFloat(matArray[0]-0.05))+",0,0)";
},
computeValue(value){
  var x = value.split('p');
  return parseInt(x[0]);
}
});
