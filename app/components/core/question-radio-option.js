import Component from '@ember/component';

export default Component.extend({
  tagName: 'question-radio-option',
  attributeBindings: ['checked'],
  dyName: null,
  dyValue: null,
  dyLabel:null,
  isChecked: null,
  checked:null,
  index:null,
  didReceiveAttrs(){
    this._super(...arguments);
  },

  actions:{
    selection (){
      // this.model.form[this.get(dyName)] = dyValue; TODO create form submission object
      this.get('checked')?this.set('checked', null):this.set('checked','checked');
    }
  }
});
