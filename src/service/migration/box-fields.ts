import { IDesiredField } from '../../types';

const boxFields: IDesiredField[] = [
  {
    id: 'margin',
    name: 'CSS margin',
    type: 'Symbol',
    required: false,
  },
  {
    id: 'padding',
    name: 'CSS padding',
    type: 'Symbol',
    required: false,
  },
  {
    id: 'class',
    name: 'Custom CSS class',
    type: 'Symbol',
    required: false,
  },
  {
    id: 'style',
    name: 'Raw CSS style',
    type: 'Text',
    required: false,
  },
];

export default boxFields;
