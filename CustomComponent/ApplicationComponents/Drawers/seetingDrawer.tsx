"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDrawer } from "@/store/useDrawer";
import UserProfileSettingForm from "../UserProfile/userProfileSettingsForm";
import { Settings } from 'lucide-react';

const SettingsDrawer = () => {
  const { isOpen, type, closeDrawer } = useDrawer();

  const isDrawerOpen = isOpen && type === "settings";

  const handleClose = () => {
    closeDrawer();
  };
  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleClose}>
      <DrawerContent className="text-white bg-cyan-900 px-[9rem]">
        <DrawerHeader className="text-white">
          <DrawerTitle className="text-white">Settings</DrawerTitle>
          <DrawerDescription>This action can be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="">
            <UserProfileSettingForm/>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
