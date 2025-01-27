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
            <DropDown propList={independent}></DropDown>
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
