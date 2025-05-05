# Vidus Full-Stack (Node.js + Vue.js) WebRTC Video Conference Quick Starter Kit

A complete quick-start package for building WebRTC video conference applications with Node.js backend and Vue.js frontend.

## Project Structure
```
├── backend/ # Node.js backend with Vidus authorization server
├── frontend/ # Vue.js frontend with Vidus WebRTC implementation
└── README.md # This file
```

## Key Features

✅ **WebRTC Video Conferencing**  
✅ Real-time peer-to-peer connections  
✅ Multi-user video/audio rooms  
✅ Screen sharing capability  
✅ Text chat alongside video  

## Prerequisites

- Node.js v16+ (recommended v18+)
- npm (comes with Node.js) or yarn
- Git
- Modern browser with WebRTC support (Chrome, Firefox, Edge)

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/CodeNidus/vidus-node-vue-quickstart.git
cd vidus-node-vue-quickstart
```

### 2. Backend Setup (Node Authorization Server)
```
cd backend
npm install
```

Set Environment Configuration
```
cp .env.example .env
```

Configure these key variables:
```
PORT=your_backend_app_port_number_like_3000
VIDUS_APP_ID=your_vidus_project_app_id
VIDUS_APP_SECRET=your_vidus_project_secret_key
```

Run the Backend
```
node .
```

### 3. Frontend Setup (Vue WebRTC Client)
```
cd ../frontend
npm install
```

Set Environment Configuration
```
cp .env.example .env
```

Configure these key variable:
```
VUE_APP_API_BASE_URL="http://localhost:your_backend_app_port_number_like_3000"
```

Run the Fronted
```
npm run serve
```

### 4. Using the Video Conference
Open the frontend in two or more multiple browsers
Set your custom username by email format and get autorization token
Create or choose a room with a unique id
Allow camera/microphone permissions when prompted, set your name and join!

Controls available:
- Mute/unmute audio
- Enable/disable video
- Share screen
- Send text messages
- View participant list

## Support
For issues or questions, please contact with us by info@codenidus.com

## License

