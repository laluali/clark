import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'question-description',
  classNameBindings: ['skipSlide'],
  model: null,
  currentSlide: null,
  userService: inject('user-journey-service'),

  didRender(){
    this._super(...arguments);
  },

  actions:{
    beforeChange($event, currentSlide, nextSlide){
      if((nextSlide - currentSlide) > 1){
        for(let temp = currentSlide; temp < nextSlide; temp++){
          $event.$slides[temp].classList.add('skip-slide');
        }
      } else if($event.$slides[nextSlide].classList.contains('skip-slide')) {
        $event.$slides[nextSlide].classList.remove('skip-slide')
      }
    },
    afterChange($event, currentSlide){
      this.userService.setSlidesJourney(currentSlide);
      this.userService.setCurrentSlickDetails('currentSlide', currentSlide);
    }
  }
});
