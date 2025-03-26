"use client";
import io from "socket.io-client";


export const socket = io(`ws://${process.env.NEXT_PUBLIC_API_URL_WBESOCKET}`,{
    transports: ["websocket"],
});
socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    sessionStorage.setItem("status", "online");
});
socket.on("disconnect", () => {
    sessionStorage.setItem("status", "offline");
});

socket.on("connect_error", (error: any) => {
    console.error("Socket connection error:", error);
});