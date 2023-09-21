import React, { CSSProperties, FC, ReactNode } from "react";

import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";


import MSDocRenderer from "./plugins/msdoc";
import PDFRenderer from "./plugins/pdf";
import TXTRenderer from "./plugins/txt";
import { DocRenderer, IConfig, IDocument, ITheme } from "./types";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  children?:ReactNode
}

const DocViewer: FC<DocViewerProps> = (props) => {
  const { documents} = props;

  if (!documents || documents === undefined) {
    throw new Error(
      "Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />"
    );
  }

  return (
  
        <div
          id="react-doc-viewer"
         className="flex flex-col overflow-hidden"
          {...props}
        >
          <HeaderBar />
          <ProxyRenderer />
        </div>
  
  );
};

export default DocViewer;



export { DocViewerRenderers } from "./plugins";
export * from "./types";
export * from "./utils/fileLoaders";
export {
 
  MSDocRenderer,
  PDFRenderer,
  TXTRenderer,
};
