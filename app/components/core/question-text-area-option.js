import Component from '@ember/component';

export default Component.extend({
  tagName: 'question-text-area-option',
  dyLabel:null,
  dyName: null,
  model:null,

  didReceiveAttrs(){
    this._super(...arguments);
  }
});
