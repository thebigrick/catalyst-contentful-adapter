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
    'catalyst-image',
    'Image',
    'Image in Catalyst',
  );

  const fields: IDesiredField[] = [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      linkType: 'Asset',
      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],
    },
    ...boxFields,
  ];

  const contentTypeWithFields = updateFields(contentType, fields);

  await updateAndPublishContentType(contentTypeWithFields, 'title');
};

export default migration;
