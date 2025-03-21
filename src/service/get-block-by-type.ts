import { IBlockDefinition } from '../types';

import blocksRegistry from './blocks-registry';

const getBlockByType = (type: string): IBlockDefinition => {
  if (!(type in blocksRegistry)) {
    throw new Error(`Block type "${type}" is not supported`);
  }

  return blocksRegistry[type];
};

export default getBlockByType;
