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
    'catalyst-page',
    'Landing Page',
    'Landing Page in Catalyst',
  );

  const fields: IDesiredField[] = [
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      required: true,
      localized: true,
    },
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      localized: true,
    },
    {
      id: 'seoDescription',
      name: 'SEO Description',
      type: 'Text',
      required: false,
      localized: true,
    },
    {
      id: 'seoKeywords',
      name: 'SEO Keywords',
      type: 'Symbol',
      required: false,
      localized: true,
    },
    {
      id: 'blocks',
      name: 'Blocks',
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
