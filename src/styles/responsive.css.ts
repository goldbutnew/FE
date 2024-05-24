import { StyleRule } from '@vanilla-extract/css';

export const bpStyle = (
  bp: 'mobile' | 'tablet' | 'desktop',
  rule: StyleRule,
) => {
  let breakpoint;
  switch (bp) {
    case 'mobile':
      breakpoint = '320px';
      break;
    case 'tablet':
      breakpoint = '768px';
      break;
    case 'desktop':
      breakpoint = '1024px';
      break;
  }

  return {
    '@media': {
      [`screen and (min-width: ${breakpoint})`]: rule,
    },
  };
};

// const something = style([
//   bpStyle('mobile', {color: 'red'},
//   {
//   ...
//   }])