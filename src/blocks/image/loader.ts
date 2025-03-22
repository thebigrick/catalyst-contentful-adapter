import { IBlockImageData } from '@thebigrick/catalyst-cms-layer/types';

import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockImageData> = (block) => {
  const imageFile = (block.fields.image as any).fields.file as
    | {
        url: string | null;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      }
    | undefined;

  return Promise.resolve({
    id: block.sys.id,
    type: 'Image',
    data: {
      src: imageFile ? `https:${imageFile.url}` : undefined,
      title: block.fields.title as string,
      width: imageFile ? imageFile.details.image.width : 0,
      height: imageFile ? imageFile.details.image.height : 0,
    },
  });
};

export default loader;
