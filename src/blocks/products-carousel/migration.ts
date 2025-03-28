import boxFields from '../../service/migration/box-fields';
import {
  getOrCreateContentType,
  updateAndPublishContentType,
  updateFields,
} from '../../service/migration/migration-utils';
import { IDesiredField, IIdemPotentMigration } from '../../types';

const migration: IIdemPotentMigration = async (environment) => {
  const contentType = await getOrCreateContentType(
    environment,
    'catalyst-products-carousel',
    'Products Carousel',
    'Products Carousel in Catalyst',
  );

  const fields: IDesiredField[] = [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'products',
      name: 'Product IDs',
      type: 'Array',
      items: {
        type: 'Symbol',
      },
      required: true,
    },
    {
      id: 'showButtons',
      name: 'Show Buttons',
      type: 'Boolean',
      required: false,
    },
    {
      id: 'showScrollbar',
      name: 'Show Scrollbar',
      type: 'Boolean',
      required: false,
    },
    ...boxFields,
  ];

  const contentTypeWithFields = updateFields(contentType, fields);

  await updateAndPublishContentType(contentTypeWithFields, 'title');
};

export default migration;
