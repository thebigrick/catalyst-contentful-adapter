import { IBlockDefinition } from '../types';

import blocksRegistry from './blocks-registry';
import containersRegistry from './caontainers-registry';

let leafBlocks: Record<string, IBlockDefinition> | undefined;

/**
 * Returns only non-container blocks
 */
const getLeafBlocksRegistry = (): Record<string, IBlockDefinition> => {
  if (leafBlocks === undefined) {
    leafBlocks = {};

    for (const key in blocksRegistry) {
      if (!(key in containersRegistry)) {
        leafBlocks[key] = blocksRegistry[key];
      }
    }
  }

  return leafBlocks;
};

export default getLeafBlocksRegistry;
