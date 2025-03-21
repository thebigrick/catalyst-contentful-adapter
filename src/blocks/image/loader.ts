import { IBlockImageData } from '@thebigrick/catalyst-cms-layer/types';

import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockImageData> = (block) => {
  return Promise.resolve({
    id: block.sys.id,
    type: 'Image',
    data: {
      src: `https:${(block.fields.image as any).fields.file.url}`,
      title: block.fields.title as string,
      width: (block.fields.image as any).fields.file.details.image.width as number,
      height: (block.fields.image as any).fields.file.details.image.height as number,
    },
  });
};

export default loader;
