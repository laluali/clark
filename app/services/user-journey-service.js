import Service from '@ember/service';
import { A } from '@ember/array';
import { get, set } from '@ember/object';
import EmberObject from '@ember/object';

export default Service.extend({

  slidesIdArray: A(),
  slidesJourney: A(),
  answerObject: EmberObject.create(),
  currentSlideDetails: EmberObject.create(),
  slideDetails: EmberObject.create(),

  init() {
    this._super(...arguments);
  },

  setCurrentSlickDetails(key,value){
    return set(this.currentSlideDetails, key, value);
  },

  getCurrentSlickDetails(key){
    return get(this.currentSlideDetails, key);
  },

  setArray(object) {
      return this.slidesIdArray.addObject(object);
  },

  getValAtIndex(index) {
      return this.slidesIdArray.objectAt(index);
  },

  getIndexOf(identifier) {
    return this.slidesIdArray.indexOf (identifier);
  },

  setAnswerObject(key,value){
    return set(this.answerObject, key, value);
  },

  getAnswerObject(key){
    if(key < 0){
      return '';
    } else {
      return get(this.answerObject, key);
    }
  },

  setSlidesJourney(object) {
    return this.slidesJourney.addObject(object);
  },

  getValAtIndexSlidesJourney(index) {
    return this.slidesJourney.objectAt(index);
  },

  getIndexOfSlidesJourney(identifier) {
    return this.slidesJourney.indexOf(identifier);
  }

});
