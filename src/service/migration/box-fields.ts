import { IDesiredField } from '../../types';

const boxFields: IDesiredField[] = [
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
