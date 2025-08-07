# 📡 Realtime Frontend

A realtime-ready frontend application built with **Next.js**, **Socket.IO**, and **TypeScript**. This project demonstrates seamless online presence tracking, user connectivity status, and real-time communication with a backend socket server.

🌐 **Live Demo**: [https://realtime-frontend-olive.vercel.app](https://realtime-frontend-olive.vercel.app)

🧠 **Backend Repo (Optional)**: [realtimeBackend](https://github.com/MARVELGARR/realtimeBackend) *(if available)*

---

## ✨ Features

- 🔌 **Realtime Presence Detection** — Tracks and displays which users are currently online.
- 💬 **Socket.IO Integration** — Robust websocket handling with reconnection and heartbeat mechanisms.
- 📦 **Persistent User Sessions** — Uses local storage to persist user login and maintain state.
- ✅ **Heartbeat System** — Keeps the server in sync with client activity and online status.
- 🛠️ Built with **Next.js 14**, **TypeScript**, and **Context API**.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16+)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) or `npm`

### Installation

```bash
git clone https://github.com/MARVELGARR/realtimeFrontend.git
cd realtimeFrontend
yarn install   # or npm install
```

### Environment Setup

Create a `.env.local` file at the root of your project and add:

```env
NEXT_PUBLIC_API_URL_WBESOCKET=your-backend-domain.com
```

Make sure the backend Socket.IO server is live and CORS-enabled.

### Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🔁 Socket Events Overview

| Event             | Direction     | Description                                   |
|------------------|---------------|-----------------------------------------------|
| `user-connected` | Client → Server | Sent when user connects                       |
| `heartbeat`      | Client → Server | Periodic ping to keep the connection alive    |
| `check-my-status`| Client → Server | Ask server if the user is still online        |
| `isOnline`       | Server → Client | Response with the current online status       |
| `online-users`   | Server → Client | Broadcasted list of online user IDs           |

---

## 🧩 Project Structure

```
.
├── configs/
│   └── socket.ts        # Socket.IO client instance
├── hooks/
│   └── useLocalStorage/ # Hook to persist user session
├── context/
│   └── SocketProvider   # Context for realtime data
├── pages/               # Next.js pages
└── types/               # TypeScript types
```

---

## 🧪 Demo Credentials (Optional)

To simulate user sessions, you can manually set a `user-session` in `localStorage` using your browser console:

```js
localStorage.setItem('user-session', JSON.stringify({ id: 'user-id-123' }));
```

Then refresh the page.

---

## 📸 Screenshots

> (Add a few screenshots or screen recordings here if possible)

---

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Sockets**: Socket.IO
- **Storage**: LocalStorage (via custom hook)
- **Deployment**: Vercel

---

## 📬 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

---

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)