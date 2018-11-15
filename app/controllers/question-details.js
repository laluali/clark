import Controller from '@ember/controller';

export default Controller.extend({

  init(){
    console.log('question-details controller init')
  },

  actions:{
    testFormData: function(){
      // var testInput = this.get('testInput');
      alert(testInput);
    }
  }
});
