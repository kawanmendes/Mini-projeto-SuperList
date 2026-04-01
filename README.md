# SuperList - React Native Shopping List App

A modern, production-ready mobile application built with Expo and React Native for creating and managing shopping lists with support for both simple and purchase tasks.

## 🎨 Features

- **Dark Theme UI** with a modern gradient color scheme (#171616, #3533cd)
- **Create Shopping Lists** - Add and organize multiple shopping lists
- **Two Task Types**:
  - Simple Tasks - Basic to-do items
  - Purchase Tasks - Items with prices for budget tracking
- **Full CRUD Operations** - Create, read, update, and delete lists and tasks
- **Progress Tracking** - Visual progress indicators for list completion
- **Price Calculator** - Automatic calculation of total spending per list
- **Local Persistence** - All data saved using AsyncStorage
- **Smooth Navigation** - Stack-based navigation with smooth transitions
- **Responsive Design** - Works seamlessly on iOS and Android
- **Empty States** - Helpful UI when no data is available

## 📁 Project Structure

```
superlist/
├── src/
│   ├── screens/              # All app screens
│   │   ├── SplashScreen.tsx      # Intro splash screen
│   │   ├── HomeScreen.tsx        # Main list management
│   │   ├── ListDetailsScreen.tsx # View list tasks
│   │   ├── CreateTaskScreen.tsx  # Add new task
│   │   ├── EditTaskScreen.tsx    # Edit existing task
│   │   └── index.ts              # Screen exports
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx            # Custom button component
│   │   ├── TextInput.tsx         # Custom input field
│   │   ├── Card.tsx              # Card container
│   │   ├── ListCard.tsx          # Shopping list card
│   │   ├── TaskItem.tsx          # Task list item
│   │   ├── FAB.tsx               # Floating action button
│   │   ├── EmptyState.tsx        # Empty state UI
│   │   └── index.ts              # Component exports
│   ├── styles/               # Theme and styling
│   │   └── theme.ts              # Colors, spacing, typography
│   ├── hooks/                # Custom React hooks
│   │   └── useShoppingLists.ts   # App state management
│   ├── types/                # TypeScript types
│   │   └── index.ts              # Type definitions
│   ├── utils/                # Utility functions
│   │   ├── storage.ts            # AsyncStorage operations
│   │   └── helpers.ts            # Helper functions
│   └── navigation/           # Navigation setup
│       └── RootNavigator.tsx     # Stack navigator config
├── App.tsx                   # Root app component
├── index.ts                  # Expo entry point
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── app.json                  # Expo config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)
- Expo Go app (for testing on physical devices)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd superlist
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm start
   ```

4. **Choose your platform:**
   - Press `i` for iOS
   - Press `a` for Android
   - Press `w` for web
   - Or scan the QR code with Expo Go app

## 📱 App Screens

### 1. Splash Screen
- Displays SuperList logo with animations
- Tap anywhere to proceed to Home screen
- Clean, minimal intro experience

### 2. Home Screen
- View all shopping lists
- Create new lists with floating action button
- Edit list titles inline
- Mark lists as complete
- Delete lists with confirmation
- Progress indicators for each list
- Empty state when no lists exist

### 3. List Details Screen
- View all tasks in a specific list
- Summary card showing:
  - Total items count
  - Completed items count
  - Total spending (for purchase tasks)
- Add tasks with floating action button
- Mark tasks as complete
- Edit tasks
- Delete tasks with confirmation
- Empty state when no tasks exist

### 4. Create Task Screen
- Select task type (Simple or Purchase)
- Enter task title
- Enter price (for purchase tasks)
- Live preview of task
- Validation and error handling

### 5. Edit Task Screen
- Modify task title
- Update price (if applicable)
- See current task status
- Delete task with confirmation
- Live preview of changes

## 🎮 User Interactions

### Lists Management
- **Create**: Tap + button on Home screen, enter title
- **Edit**: Tap edit icon (✏️) on list card, modify title, save
- **Delete**: Tap delete icon (🗑️), confirm deletion
- **Complete**: Tap checkmark (✔), toggle completion status
- **View**: Tap on list card to see tasks

### Tasks Management
- **Create**: Tap + button on List Details screen, choose type, enter details
- **Edit**: Tap edit icon (✏️), modify details, save
- **Delete**: Tap delete icon (🗑️), confirm deletion
- **Complete**: Tap checkbox, toggle completion status

## 💾 Data Persistence

All data is automatically saved to device storage using AsyncStorage:
- Shopping lists
- Tasks within lists
- Task completion states
- List completion states

Data persists between app sessions.

## 🎨 UI Components

### Available Components

1. **Button** - Customizable button with variants
   - Variants: primary, secondary, danger, success
   - Sizes: small, medium, large

2. **TextInput** - Modern text input field
   - Label support
   - Multi-line support
   - Keyboard types
   - Max length

3. **Card** - Container component
   - Variants: default, elevated
   - Flexible styling

4. **ListCard** - Shopping list card
   - Progress bar
   - Task count
   - Action buttons

5. **TaskItem** - Individual task
   - Checkbox
   - Price display
   - Action buttons

6. **FAB** - Floating action button
   - Positioned bottom-right
   - Customizable icon

7. **EmptyState** - Empty state UI
   - Icon, title, description

## 🎨 Theme & Colors

- **Dark Background**: #171616
- **Darker Shade**: #0f0f0f
- **Primary Accent**: #3533cd (purple-blue)
- **Cards**: #1e1e1e
- **Success**: #4caf50
- **Error**: #f44336
- **Text**: White and grays

## 🔧 Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack)
- **State Management**: React Hooks
- **Persistence**: AsyncStorage
- **Styling**: StyleSheet (React Native)
- **Safe Area**: react-native-safe-area-context

## 📝 Key Files

### Types (`src/types/index.ts`)
- `Task` - Individual task type
- `ShoppingList` - Shopping list type
- `RootStackParamList` - Navigation param types
- `AppContextType` - App context interface

### Hooks (`src/hooks/useShoppingLists.ts`)
- `useShoppingLists()` - Main app state hook with all operations

### Theme (`src/styles/theme.ts`)
- `COLORS` - Color palette
- `SPACING` - Spacing values
- `BORDER_RADIUS` - Border radius values
- `SHADOWS` - Shadow definitions
- `TYPOGRAPHY` - Font styles

### Utils
- `storage.ts` - AsyncStorage operations
- `helpers.ts` - Utility functions

## 🚀 Build & Deploy

### Web
```bash
npm run web
```

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## 📦 Dependencies

- `expo` - Framework
- `react-native` - UI library
- `react` - Core framework
- `@react-navigation/native` - Navigation
- `@react-navigation/stack` - Stack navigator
- `@react-native-async-storage/async-storage` - Data persistence
- `react-native-screens` - Navigation optimization
- `react-native-gesture-handler` - Gesture handling
- `react-native-safe-area-context` - Safe area handling

## ✨ Best Practices Implemented

✅ Type-safe code with TypeScript
✅ Modular component architecture
✅ Custom hooks for state management
✅ Consistent styling with theme system
✅ Proper error handling
✅ Input validation
✅ Smooth animations and transitions
✅ Accessibility considerations
✅ Clean code structure
✅ Comprehensive comments
✅ Reusable components
✅ Persistent data storage

## 🐛 Troubleshooting

### App not loading?
- Clear cache: `expo start -c`
- Re-install dependencies: `rm -rf node_modules && npm install`

### Storage not working?
- Check AsyncStorage permissions
- Ensure device has available storage

### Navigation issues?
- Verify screen names match RootStackParamList
- Check navigation props are passed correctly

## 📄 License

This project is provided as-is for educational and commercial use.

## 🎯 Future Enhancements (Optional)

- Cloud sync with Firebase
- Sharing lists with other users
- Categories for lists
- Search functionality
- Advanced filtering
- Dark/Light theme toggle
- Multiple language support
- Push notifications
- Image attachments

---

**SuperList** - Built with ❤️ using React Native and Expo
