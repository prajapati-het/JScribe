import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import Loader from "@/components/Loader/Loader";
import RenderCode from "@/components/ui/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLoadCodeMutation } from "@/redux/slices/api";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";

import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Compile() {
  const { urlId } = useParams();
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();
  const loadCode = useCallback(async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
      }
    } catch (error) {
      handleError(error);
    }
  }, [dispatch, urlId]);

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId, loadCode]);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="w-full h-[calc(100dvh-60px)]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="h-full min-w-[350px]" defaultSize={50}>
          <HelperHeader />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-full min-w-[350px]" defaultSize={50}>
          <RenderCode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
