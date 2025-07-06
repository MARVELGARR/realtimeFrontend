"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useDrawer } from "@/store/useDrawer";

import GroupSettingsComponent from "@/CustomComponent/GroupComponents/groupSettingsComponent";

const GroupSettingDrawer = () => {
  const { isOpen, type, closeDrawer } = useDrawer();

  const isDrawerOpen = isOpen && type === "groupSettings";

  const handleClose = () => {
    closeDrawer();
  };
  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleClose}>
      <DrawerContent className="text-white bg-cyan-900 h-[34rem] px-[9rem]">
        <DrawerHeader className="text-white">
          <DrawerTitle className="text-white">Settings</DrawerTitle>
          <DrawerDescription>This action can be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="">
            <GroupSettingsComponent/>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GroupSettingDrawer;
