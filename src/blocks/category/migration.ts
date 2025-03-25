import blocksRegistry from '../../service/blocks-registry';
import {
  getOrCreateContentType,
  updateAndPublishContentType,
  updateFields,
} from '../../service/migration/migration-utils';
import { IDesiredField, IIdemPotentMigration } from '../../types';

const migration: IIdemPotentMigration = async (environment) => {
  const contentType = await getOrCreateContentType(
    environment,
    'catalyst-category',
    'Category',
    'BigCommerce Category in Catalyst',
  );

  const fields: IDesiredField[] = [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      localized: true,
    },
    {
      id: 'categoryId',
      name: 'Category ID',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'header',
      name: 'Header',
      type: 'Array',
      required: true,
      localized: false,
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
