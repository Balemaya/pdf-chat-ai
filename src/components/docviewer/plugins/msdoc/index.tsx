'use client'
import React from "react";
import { DocRenderer } from "../../types";

const MSDocRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;
  const encodedUrl = encodeURIComponent(currentDocument.uri);
  const iFrameUrl = 'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true';
  return (
    <div className="w-full h-full " id="msdoc-renderer">
      <iframe
      className="w-full h-[70vh]"
        id="msdoc-iframe"
        title="msdoc-iframe"
        src={ iFrameUrl }
      />
    </div>
  );
};

export default MSDocRenderer;

const MSDocFTMaps = {
  doc: ["doc", "application/msword"],
  docx: [
    "docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  xls: ["xls", "application/vnd.ms-excel"],
  xlsx: [
    "xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  ppt: ["ppt", "application/vnd.ms-powerpoint"],
  pptx: [
    "pptx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
};

MSDocRenderer.fileTypes = [
  ...MSDocFTMaps.doc,
  ...MSDocFTMaps.docx,
  ...MSDocFTMaps.xls,
  ...MSDocFTMaps.xlsx,
  ...MSDocFTMaps.ppt,
  ...MSDocFTMaps.pptx,
];
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();


