import { IBlockHtmlData } from '@thebigrick/catalyst-cms-layer/types';

import { IBlockLoader } from '../../types';

const loader: IBlockLoader<IBlockHtmlData> = (block) => {
  return Promise.resolve({
    id: block.sys.id,
    type: 'Html',
    data: {
      html: block.fields.html as string,
    },
  });
};

export default loader;
