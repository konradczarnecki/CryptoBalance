import {animate, state, style, transition, trigger} from '@angular/animations';

export const sidebarAnimation = trigger('sidebarAnimation', [

  state('shownDesktop', style({transform : 'translate(0, 0)'})),
  state('shownMobile', style({transform : 'translate(0, 0)'})),
  state('hiddenDesktop', style({transform : 'translate(-100%, 0)'})),
  state('hiddenMobile', style({transform : 'translate(0, 100%)'})),
  transition('shownDesktop <=> hiddenDesktop', animate('100ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  transition('shownMobile <=> hiddenMobile', animate('120ms cubic-bezier(.58,.7,.46,1.02)'))
]);

export const mainViewAnimation = trigger('mainViewAnimation', [

  state('shownDesktop', style({width : '*'})),
  state('shownMobile', style({})),
  state('hiddenDesktop', style({width : '100%', position: 'absolute', top : 0, right: 0})),
  state('hiddenMobile', style({})),
  transition('shownDesktop <=> hiddenDesktop', animate('140ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  transition('shownMobile <=> hiddenMobile', animate('180ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
]);

export const donationExpand = trigger('donationExpand', [

  state('collapsed', style({width: '*'})),
  state('expanded', style({width: '980px'})),
  transition('collapsed <=> expanded', animate('180ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const donationOpacity = trigger('donationOpacity', [
  state('in', style({opacity: 0.8})),
  transition(':enter', [style({opacity : 0}), animate('150ms linear')]),
  transition(':leave', animate('300ms linear', style({opacity : 0})))
]);
