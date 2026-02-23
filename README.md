# 🎴 Flip 7 – Card Game

A React-based implementation of the classic Flip 7 card game supporting 3–18 players with full game mechanics and state management.

## 🛠️ Built With

- **React** – Function components with hooks
- **TypeScript** – Type-safe development
- **useReducer** – Centralized state management
- **Vite** – Lightning-fast build tooling

## ✨ Features

- **Dynamic Player Setup** – Configure 3–18 players
- **Smart Card Logic** – Duplicate detection with Bust mechanics
- **Special Cards**
  - 🔒 **Freeze Card** – Forces next player to stop
  - 🎯 **Three Flip Card** – Draw 3 additional cards
  - 🛡️ **Second Chance Card** – One-time bust protection
- **Round Scoring** – Track scores across rounds
- **Win Condition** – First to 200 points wins

## 🏗️ Architecture

The project maintains clean separation of concerns:

```
src/
├── components/       # UI Components
├── domain/          # Game logic, reducer & rules
├── hooks/           # Custom React hooks
└── assets/          # Static resources
```

**State Management:** All game state transitions flow through a centralized `useReducer`, ensuring predictable behavior and maintainability.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📋 Design Philosophy

This implementation prioritizes:

- ✅ **Correct Game Logic** – Faithful implementation of all rules
- ✅ **Clean Architecture** – Separation of concerns
- ✅ **Maintainability** – Clear code structure
- ✅ **Scalability** – Easy to extend with new features
