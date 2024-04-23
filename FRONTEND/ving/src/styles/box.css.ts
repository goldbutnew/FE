import { recipe } from '@vanilla-extract/recipes';
import { flex } from './common.css';

export const defaultBox = flex({
  direction: 'column',
  align: 'start',
  justify: 'center'
})

export const columnbox = flex({
  direction: 'column',
  align: 'center',
  justify: 'center'
});

export const rowbox = flex({
  direction: 'row',
  align: 'center',
  justify: 'center'
})
