# PROMPTS.md

This document contains a curated log of prompts used during the development of this project.  
Prompts were used selectively for brainstorming, architecture decisions, optimization strategies, and best practices — while ensuring full understanding and ownership of the implementation.

---

## 🧠 Project Setup & Architecture

- Design a scalable folder structure for a React + TypeScript frontend application with features like routing, global state, API handling, and reusable components.

- Should I use Context API or Redux for managing selection state across routes in a React app? Explain tradeoffs.

- What is the best way to structure a monorepo with frontend and backend using docker-compose?

---

## 🔗 Data Fetching & Custom Hook

- Create a custom React hook using TypeScript to fetch data from an API. It should handle loading, error, and empty states explicitly.

- How can I prevent unnecessary re-fetching in a custom hook when dependencies change?

- What are best practices for error handling in frontend API calls using fetch?

---

## ⚡ Performance Optimization

- My React app is rendering a large list of images. How can I optimize performance using memoization and list virtualization?

- Explain how to optimize large lists in React for better performance.

- When should I use useMemo vs useCallback in a real-world React app?

---

## 🗂 State Management

- How can I persist selected items across routes in React using Context API?

- What is the best way to manage selection state for a list with Select All, Clear Selection, and individual selection?

- How does Redux compare to Context API for managing global state in medium-to-large applications?

---

## 🎨 UI / UX with styled-components

- How to implement responsive grid layout in React using styled-components for mobile, tablet, and desktop?

- Best practices for converting Figma designs into pixel-perfect React components.

- How can I design reusable and customizable UI components in React?

---

## 🧭 Routing

- How to implement dynamic routing in React Router for a detail page like /pets/:id?

- How to preserve state when navigating between routes in React?

---

## 🔎 Search, Sort & Pagination

- How to implement search functionality in React that filters data based on multiple fields like title and description?

- How to implement sorting (A-Z, Z-A, date newest/oldest) efficiently in React?

- What are the pros and cons of pagination vs infinite scroll in a React app?

---

## 📦 File Download Feature

- How can I allow users to download multiple images from a React app and calculate total file size before downloading?

- What are browser limitations when downloading multiple files programmatically?

---

## 🧹 Code Quality & Best Practices

- What are best practices for writing clean and maintainable React + TypeScript code?

- How to structure reusable components to improve scalability in frontend applications?

---

## 🐛 Debugging & Edge Cases

- How to debug a React app when API works in Postman but fails in browser?

- What are common causes of memory leaks in React applications and how to fix them?

---

## 🚀 Interview & Review Preparation

- If you were reviewing this frontend assignment as a senior engineer, what improvements would you suggest?

- How can I make this project stand out in a frontend interview assignment?

---