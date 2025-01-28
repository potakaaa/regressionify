import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "./provider/global-provider";
import { FC } from "react";
import DropDown, { DropDownProps } from "./Dropdown";
import { Trash } from "lucide-react";

const independent = ["X1", "X2", "X3"];

const IndependentCard = () => {
  const { independents, setIndependents } = useGlobalState();

  const handleAddIndependent = (independent: string) => {
    setIndependents([...independents, independent]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-32 overflow-hidden text-ellipsis inline-block"
        >
          {independents.length > 0 ? independents[0] : "Select Independent"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select Independent Variables</AlertDialogTitle>
          <AlertDialogDescription>
            {/* HAVE TO MAP INDEPENDENTS HERE AND CREATE LAYOUR FOR ADDED INDEPENDENTS */}

            <div className="flex flex-row justify-between">
              <div className="grid grid-cols-3 gap-3">
                {independent.map((item) => (
                  <div className="flex flex-row p-2 items-center justify-between border border-secondary rounded-lg w-24">
                    <p className=" text-ellipsis inline-block overflow-hidden">
                      {item}
                    </p>
                    <button className="hover:bg-white hover:bg-opacity-10 p-1 rounded-lg">
                      <Trash size={15} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <DropDown propList={independent}></DropDown>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IndependentCard;
