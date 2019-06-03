//
//import { flyin } from './animations';

import { trigger, state, style, animate, transition, keyframes, query } from '@angular/animations';

export const simpleFadeIn = [
  trigger("simpleFadeIn", [
    transition("* => *", [
      query(":enter", style({ opacity: 0 }), { optional: true }),
      query(":enter", animate("1.5s 0.5s ease-in"), { optional: true })
    ])
  ])
]

export const flyin = [
  trigger('flyin', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate('700ms ease-in')
    ])
  ])
];

export const rotateIn = [
  trigger('rotateIn', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'rotate(-180deg)' }),
      animate('700ms ease-out')
    ])
  ])
];

export const flyFromBottom = [
  trigger('flyFromBottom', [
    state('in', style({ transform: 'translateY(0)' })),
    transition('void => *', [
      style({ transform: 'translateY(100%)' }),
      animate('700ms ease-in')
    ])
  ])
];

export const flyItems = [
  trigger('flyItems', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      animate(700, keyframes([
        style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
      ]))
    ]),
    transition('* => void', [
      animate(500, keyframes([
        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
      ]))
    ])
  ])
];