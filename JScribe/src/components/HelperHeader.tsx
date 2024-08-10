import { Share2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function HelperHeader() {
  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Button variant="sucess">Save</Button>
        <Button variant="secondary">
          <Share2Icon />
          Share
        </Button>
      </div>
    </div>
  );
}
