import React, { FC, useContext } from "react";
import { DocViewerContext } from "../state";
import { nextDocument, previousDocument } from "../state/actions";
import { IStyledProps } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DocumentNav: FC<{}> = () => {
  const {
    state: { currentDocument, currentFileNo, documents },
    dispatch,
  } = useContext(DocViewerContext);

  if (documents.length <= 1 || !currentDocument) return null;

  let fileName = currentDocument.uri;

  const splitURL = fileName.split("/");
  if (splitURL.length) {
    //@ts-ignore
    fileName = splitURL[splitURL.length - 1];
  }

  return (
    <div id="doc-nav" className="min-w-[150px] flex flex-row items-center justify-end py-3 ">
    
      <p id="doc-nav-info">
        Doc {currentFileNo + 1} of {documents.length}
      </p>

      <Button
          size={'icon'}
        id="doc-nav-prev"
    
        onClick={() => dispatch(previousDocument())}
        disabled={currentFileNo === 0}
      >
        <ChevronLeft color="#fff" size="60%" />
      </Button>

      <Button
          size={'icon'}
        id="doc-nav-next"
        onClick={() => dispatch(nextDocument())}
        disabled={currentFileNo >= documents.length - 1}
      >
        <ChevronRight color="#fff" size="60%" />
      </Button>
    </div>
  );
};

