import { ContentType, Environment } from 'contentful-management';

import { IDesiredField } from '../../types';

/**
 * Retrieves the content type if it exists, otherwise creates it.
 * @param environment - The Contentful environment.
 * @param contentTypeId - The ID of the content type.
 * @param name - The name of the content type.
 * @param description - A description for the content type.
 * @returns {Promise<ContentType>} The content type.
 */
export const getOrCreateContentType = async (
  environment: Environment,
  contentTypeId: string,
  name: string,
  description: string,
): Promise<ContentType> => {
  let contentType: ContentType;

  try {
    contentType = await environment.getContentType(contentTypeId);
  } catch (err: any) {
    if (err.name === 'NotFound') {
      contentType = await environment.createContentTypeWithId(contentTypeId, {
        name,
        description,
        fields: [],
      });
    } else {
      throw err;
    }
  }

  return contentType;
};

/**
 * Updates or creates the fields of the content type according to the desired state.
 * @param contentType - The content type to update.
 * @param desiredFields - Array of desired fields.
 * @returns {ContentType} The updated content type.
 */
export const updateFields = (
  contentType: ContentType,
  desiredFields: IDesiredField[],
): ContentType => {
  const fields = (contentType.fields as any[] | undefined) || [];

  desiredFields.forEach((field) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const existingField = fields.find((f: any) => f.id === field.id);

    if (existingField) {
      // Update basic properties if they differ
      if (existingField.name !== field.name) {
        existingField.name = field.name;
      }

      if (existingField.type !== field.type) {
        existingField.type = field.type;
      }

      if (field.linkType !== undefined && existingField.linkType !== field.linkType) {
        existingField.linkType = field.linkType;
      }

      if (
        field.validations !== undefined &&
        JSON.stringify(existingField.validations) !== JSON.stringify(field.validations)
      ) {
        existingField.validations = field.validations;
      }

      if (field.required !== undefined && existingField.required !== field.required) {
        existingField.required = field.required;
      }

      if (field.localized !== undefined && existingField.localized !== field.localized) {
        existingField.localized = field.localized;
      }

      if (
        field.items !== undefined &&
        JSON.stringify(existingField.items) !== JSON.stringify(field.items)
      ) {
        existingField.items = field.items;
      }
    } else {
      fields.push(field);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  contentType.fields = fields.filter((f: any) => desiredFields.some((df) => df.id === f.id));

  return contentType;
};

/**
 * Sets the display field of the content type.
 * @param contentType - The content type to update.
 * @param displayField - The field id to set as the display field.
 * @returns {ContentType} The content type with updated display field.
 */
export const setDisplayField = (contentType: ContentType, displayField: string): ContentType => {
  if (contentType.displayField !== displayField) {
    contentType.displayField = displayField;
  }

  return contentType;
};

/**
 * Updates and publishes the content type.
 * Optionally sets the display field if provided.
 * @param inContentType - The content type to update.
 * @param displayField - (Optional) The field id to set as the display field.
 * @returns {Promise<void>}
 */
export const updateAndPublishContentType = async (
  inContentType: ContentType,
  displayField?: string,
): Promise<void> => {
  let contentType = inContentType;

  if (displayField) {
    contentType = setDisplayField(contentType, displayField);
  }

  const updatedContentType = await contentType.update();

  await updatedContentType.publish();
};
