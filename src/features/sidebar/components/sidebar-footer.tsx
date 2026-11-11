import { TooltipContent, Tooltip, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { SignOutDialog } from "@/features/sign-out/components/sign-out-dialog";
import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";

export const SidebarFooter = () => {
  return (
    <footer className="aspect-square flex items-center justify-center border-t">
      <Tooltip>
        <SignOutDialog>
          <TooltipTrigger
            render={
              <Button size="icon-lg" variant="secondary">
                <LogOut />
              </Button>
            }
          />
        </SignOutDialog>
        <TooltipContent>Sair</TooltipContent>
      </Tooltip>
    </footer>
  );
};
