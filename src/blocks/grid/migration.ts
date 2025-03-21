import blocksRegistry from '../../service/blocks-registry';
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
    'catalyst-grid',
    'Simple grid',
    'Simple Gird in Catalyst',
  );

  const fields: IDesiredField[] = [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
    },
    ...boxFields,
    {
      id: 'columns',
      name: 'Columns',
      type: 'Number',
      required: true,
      validations: [
        {
          range: {
            min: 1,
            max: 12,
          },
        },
      ],
    },
    {
      id: 'mdColumns',
      name: 'Columns (tablet)',
      type: 'Number',
      required: true,
      validations: [
        {
          range: {
            min: 1,
            max: 12,
          },
        },
      ],
    },
    {
      id: 'lgColumns',
      name: 'Columns (large screen)',
      type: 'Number',
      required: true,
      validations: [
        {
          range: {
            min: 1,
            max: 12,
          },
        },
      ],
    },
    {
      id: 'gap',
      name: 'Gap',
      type: 'Number',
      required: true,
      validations: [
        {
          range: {
            min: 1,
            max: 6,
          },
        },
      ],
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
            linkContentType: Object.keys(blocksRegistry),
          },
        ],
      },
    },
  ];

  const contentTypeWithFields = updateFields(contentType, fields);

  await updateAndPublishContentType(contentTypeWithFields, 'title');
};

export default migration;
