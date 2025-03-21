import { IBlockRichTextData } from '@thebigrick/catalyst-cms-layer/types';

import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockRichTextData> = (block) => {
  return Promise.resolve({
    id: block.sys.id,
    type: 'RichText',
    data: {
      richText: block.fields.text,
    },
  });
};

export default loader;
