import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/ui/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Compile() {
  const { urlId } = useParams();
  const dispatch = useDispatch();

  const loadCode = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load", {
        urlId: urlId,
      });
      dispatch(updateFullCode(response.data.fullCode));
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 500) {
          toast("Invalid URL, Default Code Loaded");
        }
      }
      handleError(error);
    }
  }, [dispatch, urlId]);
  
  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId, loadCode]);
  
  return (
    <div className="w-full h-[calc(100dvh-60px)]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          className="h-full min-w-[350px]"
          defaultSize={50}
        >
          <HelperHeader />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          className="h-full min-w-[350px]"
          defaultSize={50}
        >
          <RenderCode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
