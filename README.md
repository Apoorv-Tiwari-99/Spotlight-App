# ✨ Spotlight – Real-Time Social Media App
---

- ✅ Works on Android / iOS devices & simulators  
- ✅ Everything updates instantly (likes, follows, comments)   

## 📱 Features

- 🔐 **Google Auth** via Clerk (one-tap login)  
- 🏠 **Home Feed** with stories & posts, pull-to-refresh & logout  
- ❤️ **Like / Comment** system with real-time updates  
- 🔖 **Bookmarks** screen to save posts  
- ➕ **Create Post** — select image, add caption, share instantly  
- 🔔 **Notifications** — likes, follows & comments with deep links  
- 👤 **Profile Page** — stats, posts, animated edit-profile modal  
- 🔄 **Follow / Unfollow** other users  
- 🗑️ **Delete Own Posts** with confirmation  
- 🎨 Custom fonts, splash screen & app icon   


## ⚙️ Environment Setup

Create a `.env` file in the root directory and add:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_publishable_key>
CONVEX_DEPLOYMENT=<your_deployment_name>
EXPO_PUBLIC_CONVEX_URL=<your_convex_url>

▶️ Run the App
# Install dependencies
npm install

# Start development server
npx expo start
