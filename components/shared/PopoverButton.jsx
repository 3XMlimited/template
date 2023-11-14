import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Delete, CheckSquare } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function PopoverButton({ name, value, setValue }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#49C1F0] text-white h-[50px] min-w-[120px]  text-center"
        >
          <div className="space-x-1  flex text-center">{name}</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Button Link</h4>
            <p className="text-sm text-muted-foreground">
              Set the button name and the link
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="name"
                value={value.button_name}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, button_name: e.target.value }))
                }
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Link</Label>
              <Input
                id="link"
                value={value.button_link}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, button_link: e.target.value }))
                }
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverButton;
