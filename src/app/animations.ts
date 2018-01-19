import {animate, state, style, transition, trigger} from '@angular/animations';

export const sidebarAnimationDesktop = trigger('showSidebar', [

  state('true', style({transform : 'translate(0, 0)'})),
  state('false', style({transform : 'translate(-100%, 0)'})),
  transition('true <=> false', animate('180ms cubic-bezier(.58,.7,.46,1.02)'))
]);

export const mainViewAnimationDesktop = trigger('showSidebar', [

  state('true', style({width: '80vw'})),
  state('false', style({width: '100vw'})),
  transition('true <=> false', animate('180ms cubic-bezier(.58,.7,.46,1.02)'))
]);

0
