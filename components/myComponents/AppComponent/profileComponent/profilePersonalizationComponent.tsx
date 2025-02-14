'use client';

import { Moon, Sun, Monitor } from "lucide-react";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ProfilePersonalizationComponent = () => {
  const { setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <strong className="text-lg font-semibold">Personalization</strong>
      <div className="text-sm">Apply color theme</div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setTheme("light")}>
          <Sun className="w-5 h-5 mr-2" /> Light
        </Button>
        <Button variant="outline" onClick={() => setTheme("dark")}>
          <Moon className="w-5 h-5 mr-2" /> Dark
        </Button>
        <Button variant="outline" onClick={() => setTheme("system")}>
          <Monitor className="w-5 h-5 mr-2" /> System
        </Button>
      </div>
    </div>
  );
};

export default ProfilePersonalizationComponent;
