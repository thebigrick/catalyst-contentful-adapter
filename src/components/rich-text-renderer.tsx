import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { IRichTextRendererProps } from '@thebigrick/catalyst-cms-layer/types';
import React from 'react';

const RichTextRenderer: React.FC<IRichTextRendererProps<Document>> = ({ richText }) => {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="text-4xl">{children}</h1>,
      [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-3xl">{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-2xl">{children}</h3>,
      [BLOCKS.HEADING_4]: (node: any, children: any) => <h4 className="text-xl">{children}</h4>,
      [BLOCKS.HEADING_5]: (node: any, children: any) => <h5 className="text-lg">{children}</h5>,
      [BLOCKS.HEADING_6]: (node: any, children: any) => <h6 className="text-base">{children}</h6>,
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="my-4 text-lg">{children}</p>,
    },
  };

  return documentToReactComponents(richText, options);
};

export default RichTextRenderer;
