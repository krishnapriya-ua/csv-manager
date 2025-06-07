# Technical Approach – CSV Manager App

## Overview

This project is a **CSV Manager App** built using the **Wasp full-stack framework**, which combines **React** for the frontend, **Node.js** for the backend, and **PostgreSQL** as the database. The app allows users to upload CSV files, view them in a clean tabular format, and edit individual cells with a smooth UI and save mechanism.

---

## Key Architectural Decisions

- **Wasp Framework**: We chose Wasp because of its powerful full-stack structure that simplifies routing, authentication, and database handling while using familiar technologies like React and Node.js.
  
- **Database Design**: The `CsvFile` and `CsvRow` entities were modeled to support scalable handling of large files. Each uploaded CSV file is stored as metadata (`CsvFile`) and its rows are saved in the `CsvRow` table, indexed by `rowIndex`.

- **Edit Cell Flow**: Instead of making cells editable by default, we opted for a click-to-edit flow. On clicking a cell, it turns into an input field with a save button, ensuring user intent before committing updates.

- **Single Source of Truth**: Each update to a CSV cell is stored directly in the backend, ensuring that frontend and backend data remain consistent.

---

## Challenges Faced and Solutions

1. **Handling Editable Tables Without Third-Party Libraries**:
   - Challenge: Creating a custom editable table UI without using libraries like Material Table.
   - Solution: Implemented conditional rendering for input fields within table cells, using `useState` to manage per-cell edits.

2. **Row and Column Mapping from CSV Files**:
   - Challenge: Mapping uploaded CSV data into database-friendly structures.
   - Solution: Parsed the CSV in the frontend and sent structured JSON (with `rowIndex` and `rowData`) to the backend via the `uploadCsvFile` action.

3. **TypeScript Error with Spread Operator**:
   - Challenge: Encountered `Spread types may only be created from object types`.
   - Solution: Ensured fallback for `row.rowData ?? {}` and verified it's a plain object before using the spread operator.

4. **Wasp-specific Syntax for Operations and Actions**:
   - Challenge: Learning Wasp's unique configuration setup (`main.wasp`) for linking server operations.
   - Solution: Created reusable operations like `getCsvFiles`, `getCsvFileById`, and `updateCsvCell` in the `operations.ts` file and linked them properly in `main.wasp`.

---

## Libraries / Tools Chosen and Why

- **Wasp**: For its rapid full-stack scaffolding with clean integration of backend/frontend/auth/db.
- **React**: To manage dynamic UI updates and render editable components with ease.
- **Node.js**: Used for server-side operations to handle file storage, processing, and updating.
- **PostgreSQL**: Chosen for its structured data handling and compatibility with Wasp.
- **Tailwind CSS**: Used for styling the UI to maintain a clean and responsive look without writing custom CSS from scratch.

---

## Cursor AI Chat History

The complete Cursor AI chat history has been exported and added in the folder:  
📁 `cursor-ai-chat-history/`


