import {
  getOrCreateContentType,
  updateAndPublishContentType,
  updateFields,
} from '../../service/migration/migration-utils';
import { IDesiredField, IIdemPotentMigration } from '../../types';

const migration: IIdemPotentMigration = async (environment) => {
  const contentType = await getOrCreateContentType(
    environment,
    'catalyst-html',
    'Raw HTML',
    'Raw HTML in Catalyst',
  );

  const fields: IDesiredField[] = [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
    },
    {
      id: 'html',
      name: 'HTML',
      type: 'Text',
      localized: true,
    },
  ];

  const contentTypeWithFields = updateFields(contentType, fields);

  await updateAndPublishContentType(contentTypeWithFields, 'title');
};

export default migration;
