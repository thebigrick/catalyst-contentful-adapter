import { IBlock, ICmsContext } from '@thebigrick/catalyst-cms-layer/types';
import { Entry, EntrySkeletonType } from 'contentful';
import { Environment } from 'contentful-management';
import DataLoader from 'dataloader';

export type IIdemPotentMigration = (environment: Environment) => Promise<void>;

export interface IDesiredField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  localized?: boolean;
  linkType?: string;
  validations?: any[];
  items?: {
    type: string;
    linkType?: string;
    validations?: any[];
  };
}

export interface IBlockDefinition {
  migration: IIdemPotentMigration;
  loader: IBlockLoader;
}

export type IBlockLoader<TData = any> = (
  block: Entry<EntrySkeletonType, any>,
  context: ICmsContext,
  blocksLoader: DataLoader<any, any>,
) => Promise<IBlock<TData>>;
