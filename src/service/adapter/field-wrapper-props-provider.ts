import { ContentfulLivePreview } from '@contentful/live-preview';
import { IBlock, IFieldWrapperPropsProvider } from '@thebigrick/catalyst-cms-layer/types';

const fieldWrapperPropsProvider: IFieldWrapperPropsProvider = (block: IBlock, fieldId: string) => {
  return ContentfulLivePreview.getProps({ entryId: block.id, fieldId }) as Record<string, any>;
};

export default fieldWrapperPropsProvider;
