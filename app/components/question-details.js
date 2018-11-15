import Component from '@ember/component';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  tagName: 'question-details',
  destinationSlide: null,
  userService: inject('user-journey-service'),
  questionObj:null,
  backDisabled: null,
  forwardDisabled: null,

  didReceiveAttrs(){
    this._super(...arguments);
    this.userService.setArray(this.questionObj.identifier);
    if(this.get('currentSlide') === 0){
      this.set('backDisabled', true);
    }else if(this.get('currentSlide') === 0){
      this.set('forwardDisabled', true);
    } else {
      this.set('backDisabled', null);
      this.set('forwardDisabled', null);
    }
  },

  actions:{
    selection (question, currentSlide, $event){
      if(this.userService.hasAnswerObject(currentSlide)
        && (this.userService.getAnswerObject(currentSlide) !== $event.target.value)){
        this.userService.cutArray(currentSlide);
      } else {
        this.userService.setAnswerObject(currentSlide, $event.target.value);
      }

      if(question.jumps.length>0){
        let element = $('#'+$event.target.name)[0];
        question.jumps.forEach(
          jump => {
            jump.conditions.forEach(
              condition=>{
                if((condition.field === element.id) && ($event.target.value === condition.value)){
                  this.jumpToSlide(this.userService.getIndexOf(jump.destination.id));
                }
              }
            );
          }
        );
      } else {
        this.jumpToSlide(++currentSlide);
      }
    },

    onBackClick(){
      this.userService.setCurrentSlickDetails('direction', 0);
      let slideJourneyIndex = this.userService.getIndexOfSlidesJourney(this.userService.getCurrentSlickDetails('currentSlide'));
      this.jumpToSlide(this.userService.getValAtIndexSlidesJourney(--slideJourneyIndex));
    },

    onNextClick(){
      this.userService.setCurrentSlickDetails('direction', 1);
      let currentSlideIndex = this.userService.getCurrentSlickDetails('currentSlide');
      if(this.userService.getAnswerObject(this.userService.getIndexOfSlidesJourney(currentSlideIndex)) !== ''
        && this.userService.getAnswerObject(currentSlideIndex) !== undefined){
        this.jumpToSlide(++currentSlideIndex);
      }
    }
  },

  jumpToSlide(slideNumber){
    $('.slick-slider').slick('slickGoTo',slideNumber);
  }
});
