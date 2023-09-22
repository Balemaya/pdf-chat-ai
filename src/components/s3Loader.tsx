'use client'
import {   useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "@/app/api/_trpc/client";
import { Button } from "./ui/button";
import { IconRefresh, IconSpinner } from "./ui/icons";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";
//@ts-expect-error
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const DocumentViewer=({  signedUrl, docName, isLoading, type}: {  signedUrl?:string, docName?:string, isLoading: boolean, type?:string} ) => {
  const [msUrl , setMsUrl ]=useState<string>()
  const [gUrl , setGUrl ]=useState<string>()
  const [name, setName]=useState<string>()
  const [isMsDoc, setIsMsDoc]=useState<boolean>()
  const [isPdf, setIsPdf]=useState<boolean>()
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(num:number) {
    setNumPages(num);
  }
  const reloadIFrame = () => {
    const iframeElement = document.querySelector("iframe");
    iframeElement?.contentWindow?.location.reload();
  };
  

  useEffect(()=> {
  if(signedUrl) {
    setGUrl('https://docs.google.com/viewer?url=' + encodeURIComponent(signedUrl) + '&embedded=true')
  setMsUrl(  `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    signedUrl
   )}`)
  }
  }, [signedUrl])
  useEffect(()=> {
    const msDocs= [ "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",   "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
    if(docName && type) {
      setName(docName)
      setIsMsDoc(msDocs.includes(type))
     setIsPdf(type==="application/pdf")
    }
    }, [docName, type])

  if (!type) return null
  if (!name) return null
  if (!signedUrl) return null

  console.log(isPdf)
  if(isPdf) {

    return (
      <Card className="w-full h-[85vh] " >
      <CardHeader className="flex flex-row justify-end space-x-3 items-center">
    
      <Button  variant={'outline'} onClick={() => setPageNumber((prev) => prev - 1)} disabled={pageNumber <= 1}>
        <ChevronLeft  className="w-8 h-8"/>
      </Button>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Button  variant={'outline'} onClick={() => setPageNumber((prev) => prev + 1)} disabled={!numPages || (numPages !==undefined && pageNumber >= numPages) }>
      <ChevronRight  className="w-8 h-8"/>
      </Button>

      </CardHeader>
      <CardContent className="w-full h-[90%] flex justify-center items-center">
      <Document
        file={'https://prod-assignments.s3.ap-south-1.amazonaws.com/student/mgmt11learn156/23558/1633438144000.pdf'}
        onLoadSuccess={e=> onDocumentLoadSuccess(e.numPages) }
      >
        <Page pageNumber={pageNumber} />
      </Document>
      </CardContent>
      
    </Card>
    )
  }

  return (
<>
{!isPdf &&
      <Card className="w-full h-[85vh] ">
      <CardHeader>
        <CardTitle className="h-[90%] overflow-hidden flex flex-row justify-between">
          {name}
          <Button size={'sm'} variant={'outline'} >
            
            <IconRefresh className={`w-8 h-6 }`} onClick={reloadIFrame}/>
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[90%]">
      <iframe
      className="w-full h-full rounded-lg"
        src={ isMsDoc? msUrl : gUrl}
  
      />
      </CardContent>
      
    </Card>
}
</>
  );
};

