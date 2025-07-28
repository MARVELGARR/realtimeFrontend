"use client";
import io from "socket.io-client";


export const socket = io(`wss://${process.env.NEXT_PUBLIC_API_URL_WBESOCKET}`);