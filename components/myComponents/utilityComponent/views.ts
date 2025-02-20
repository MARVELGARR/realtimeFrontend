
import React from "react";
import { Phone, Users } from "lucide-react"
import { Views } from "./types"

export const views: Views = {
  main: {
    title: "New Chat",
    items: [

      { id: "searchphone", label: "Search by Phone", view: "searchphone", icon: React.createElement(Phone, { className: "h-5 w-5 mr-2 " }) },
      { id: "newgroup", label: "New Group", view: "createnewgroup", icon: React.createElement(Users, { className: "h-5 w-5 rounded-full border mr-2" }) },
      
    ],
  },
  personal: {
    title: "Personal Chat",
    items: [
      { id: "quick", label: "Quick Chat" },
      { id: "scheduled", label: "Scheduled Chat" },
    ],
  },
  team: {
    title: "Team Chat",
    items: [
      { id: "general", label: "General Team" },
      { id: "private", label: "Private Team" },
    ],
  },
  project: {
    title: "Project Chat",
    items: [
      { id: "development", label: "Development" },
      { id: "design", label: "Design" },
    ],
  },
  searchphone: {
    title: "Search by Phone",
    items: [],
  },
  createnewgroup: {
    title: "Create New Group",
    items: [],
  },
  groupdetails: {
    title: "Group Details",
    items: [],
  },
}

