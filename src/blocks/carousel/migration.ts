import blocksRegistry from '../../service/blocks-registry';
import boxFields from '../../service/migration/box-fields';
import {
  getOrCreateContentType,
  updateAndPublishContentType,
  updateFields,
} from '../../service/migration/migration-utils';
import { IBlockDefinition, IDesiredField, IIdemPotentMigration } from '../../types';

const migration: IIdemPotentMigration = async (environment) => {
  const contentType = await getOrCreateContentType(
    environment,
    'catalyst-carousel',
    'Carousel',
    'Carousel in Catalyst',
  );

  // Avoid circular carousels
  const availableBlocksRegistry = Object.entries(blocksRegistry).reduce<
    Record<string, IBlockDefinition>
  >((acc, [key, value]) => {
    if (key !== 'catalyst-carousel') {
      acc[key] = value;
    }

    return acc;
  }, {});

  const fields: IDesiredField[] = [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'blocks',
      name: 'Blocks',
      type: 'Array',
      required: true,
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: Object.keys(availableBlocksRegistry),
          },
        ],
      },
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
