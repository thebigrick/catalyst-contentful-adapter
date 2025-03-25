import { IBlockDefinition } from '../../types';

import loader from './loader';
import migration from './migration';

const definition: IBlockDefinition = {
  migration,
  loader,
};

export default definition;
