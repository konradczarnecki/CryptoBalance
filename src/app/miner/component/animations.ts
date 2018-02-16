import {animate, state, style, transition, trigger} from "@angular/animations";

export const expandAnimation = trigger('expandAnimation', [

  state('collapsed', style({width: '15px', height: '15px'})),
  state('expanded', style({width: '*', height: '*'})),
  transition('collapsed <=> expanded', animate('180ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const fadeAnimation = trigger('fadeAnimation', [

  state('collapsed', style({opacity: 0})),
  state('expanded', style({opacity: 1})),
  transition('collapsed <=> expanded', animate('180ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
