import Component from '@ember/component';
import $ from 'jquery';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
  model:null,
  scale:1,
  left:20,
  backDisabled: null,
  forwardDisabled: null,
  currentSlide:0,
  slide_1 : ['list_12111610','list_12111777', 'list_12110966', 'list_12110967'],
  slide_2 : ['list_12110968','list_13907264', 'list_12111854'],
  slide_3 : ['list_12110972','list_13913438', 'list_12110969'],
  slide_4 : ['list_12110970','list_12110971'],
  slide_5 : ['list_12110965','list_12111717'],
  slide_6 : ['list_12111755','date_22039590','textarea_12110979'],
  masterSlide : Array(),

  init(){
    this._super(...arguments);
    for(var x =1;x<=6;x++){
      var tempArr = [];
      var tempSlide = 'slide_'+x;
      this[tempSlide].forEach(
        slide=>{
          tempArr.push(
            this.model.questionnaire.questions.find(
              question=> question.identifier === slide
            )
          );
        });
      this.masterSlide.push(tempArr);
    }
    set(this,'backDisabled',true);
  },
  didReceiveAttrs(){
    this._super(...arguments);
  },

  didRender() {
    var pages = $('.flip-page');
    pages.each(
      (i, page) =>{
        pages[i].classList.add('page'+i);
        if(i==0){
          pages[i].classList.add('current-page');
          $('.page'+i).css({'left':'0px',"z-index":(pages.length-i),"transform":"scale("+this.scale+")","opacity":1});
        }else {
          $('.page'+i).css({'left':''+i*this.left+'px',"z-index":''+(pages.length-i)+'',"opacity":1-(0.2*i),"transform":"scale("+(this.scale-parseFloat(0.05*i))+")"});
        }
      }
    );
    run.later(this, function() {
      $('html, body').animate({scrollTop: '+=100px'}, 800);
    }, 2000);
  },

 actions:{
   next(){
     if(this.currentSlide<this.masterSlide.length-1){
       ++this.currentSlide;
       this.forward($('.flip-page'));
     }else{
       //TODO showError();
     }
   },

   previous(){
     if(this.currentSlide>0){
       --this.currentSlide;
       this.reverse($('.flip-page'));
       //TODO showError();
     }
   },
   selection (question, currentSlide, $event){

   }
 },


forward(x){
  var center = x.length;
  for(var y = 0; y<x.length;y++){
    if(x[y].classList.contains('current-page')){
      center = y;
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+this.computeValue($('.page'+y).css('left'))-parseFloat(this.left)+'px',"z-index":$('.page'+y).css('z-index')-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
      x[y].classList.remove('current-page');
    }else if(y<center){
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+this.computeValue($('.page'+y).css('left'))-parseFloat(this.left)+'px',"z-index":$('.page'+y).css('z-index')-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
    }else{
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+this.computeValue($('.page'+y).css('left'))-parseFloat(this.left)+'px',"z-index":parseInt($('.page'+y).css('z-index'))+1,"transform":this.matrixFnForwrd($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))+0.2)});
    }
  }
  x[++center].classList.add('current-page');
},

reverse(x){
  var center = x.length;
  for(var y = 0; y<x.length;y++){
    if(x[y].classList.contains('current-page')){
      center = y;
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+(this.computeValue($('.page'+y).css('left'))+parseFloat(this.left))+'px',"z-index":parseInt($('.page'+y).css('z-index'))-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
      x[y].classList.remove('current-page');
    }else if(y<center){
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+(this.computeValue($('.page'+y).css('left'))+parseFloat(this.left))+'px',"z-index":parseInt($('.page'+y).css('z-index'))+1,"transform":this.matrixFnForwrd($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))+0.2)});
    }else{
      $('.page'+y).css({'transition-timing-function' : 'ease-in','transition':'2s','left':''+(this.computeValue($('.page'+y).css('left'))+parseFloat(this.left))+'px',"z-index":parseInt($('.page'+y).css('z-index'))-1,"transform":this.matrixFnBack($('.page'+y).css('transform')),"opacity":(parseFloat($('.page'+y).css('opacity'))-0.2)});
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
