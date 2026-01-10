# Project Notes

## 📌 General Project Approach

The project was built following the principle of **quality over quantity**.  
Although the initial implementation was designed to work with a single JSON file, the overall architecture allows for **easy future expansion and scalability**, both in terms of data volume and additional features.

---

## 🚦 Lighthouse & Performance

### Incognito Mode

The application performs **best when tested in incognito mode**.  
This is because open **DevTools** can significantly affect performance measurements and add extra overhead during testing.

➡️ **Recommendation:**  
Run Lighthouse audits and present the application in incognito mode with DevTools closed to achieve the most accurate results.

---

### 📊 Charts & Dedicated Routes

One of the main goals of this project was to achieve **100% Lighthouse scores** across all categories.  
To make this possible, the application logic was intentionally split into separate routes:

- **`/` (main route)**
  - The application loads without initializing charts
  - Charts are rendered **only after clicking the “Show charts” button**
  - Ensures maximum performance for the initial view

- **`/charts`**
  - All charts are automatically initialized on page load
  - Dedicated route for data analysis and visualization

⚠️ Important notes:

- The `/charts` route does not reach 100% in **Performance** due to the cost of rendering charts,
- However, the charts are **highly optimized**, and separating routes allows the main view to retain excellent performance scores.

![Lighthouse score](./lighthouse.png)

---

### 🚧 Error Route (404)

When working with routing, situations may occur where no route matches the current path.  
Such cases can be handled easily by adding a dedicated error route (e.g. 404) using `react-router`.

```
Error: No route matches URL "/robots.txt"
    at getInternalRouterError (file:///home/embe/Desktop/base/node_modules/react-router/dist/development/chunk-WWGJGFF6.mjs:5049:5)
    at Object.query (file:///home/embe/Desktop/base/node_modules/react-router/dist/development/chunk-WWGJGFF6.mjs:3179:19)
    at handleDocumentRequest (file:///home/embe/Desktop/base/node_modules/react-router/dist/development/chunk-PMGK554W.mjs:1304:38)
    at requestHandler (file:///home/embe/Desktop/base/node_modules/react-router/dist/development/chunk-PMGK554W.mjs:1176:24)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at nodeHandler (/home/embe/Desktop/base/node_modules/@react-router/dev/dist/vite.js:3499:30)
    at /home/embe/Desktop/base/node_modules/@react-router/dev/dist/vite.js:3505:17
No routes matched location "/robots.txt"
```

❗ **Important:**  
Adding a global error route may **significantly reduce Lighthouse scores**, especially **SEO** (for example, from 100% down to ~70%).

➡️ This represents a conscious trade-off between:

- full error handling support
- and maintaining maximum Lighthouse scores

---

## ⚡ Performance & Best Practices

From the beginning, the project focused heavily on **performance and responsiveness**.  
To achieve this, multiple optimization techniques were applied:

### Memoization & Render Optimization

Filtering, sorting, and metric calculations are memoized (`useMemo`) to optimize performance for the current dataset (~1000 records), but for larger datasets or frequent updates, additional techniques such as virtualized rendering or Web Workers should be considered.

- `useMemo` – for caching expensive calculations and data transformations
- `React.memo` – to prevent unnecessary component re-renders
- `useCallback` – to stabilize function references between renders

In some places, memoization may appear excessive, but as the project grows, these optimizations will **provide real performance benefits and improve scalability**.

---

### Lazy Loading

- `React.lazy`
- `Suspense`

Used for:

- deferring the loading of components and modules,
- reducing initial bundle size,
- displaying fallback UI while components are loading.

---

### Data Immutability (`readonly`)

In many places, the `readonly` modifier was intentionally used extensively:

- enforcing **data immutability**,
- improving **type safety**,
- reducing the risk of accidental state mutations,
- making the project easier to maintain and scale long-term.

---

## 🎨 Styling

The following stylistic approaches were used in the project:

- **TailwindCSS** – as the primary styling solution for fast, consistent, and performant UI development
- **SCSS** (`mixin, include, BEM`) – used selectively to demonstrate alternative styling approaches and integration with traditional stylesheets where appropriate
- **Styled Component** - also added a styled component to show a different approach to styling

⚠️ A sample usage of `styled-components` was added to the project for demonstration purposes only, however it is not the recommended approach. With `styled-components`, styles are injected at render time, which may cause a brief flash of unstyled content and visible layout shifts. In our case, loading scss files before rendering components provides more stable initial styling and prevents the page from visually “jumping” during load.

---

## 💾 Data Persistence (localStorage)

The project demonstrates how to use **localStorage** as a browser-side cache:

- faster application response,
- preserved state between user sessions,
- reduced need for repeated data processing.

---

## 🌍 SSR Compatibility & Mobile Detection

The project was built with **full Server-Side Rendering (SSR) compatibility** in mind.

One of the key challenges was:

- correctly detecting mobile layouts using `window.matchMedia`,
- while ensuring the code also runs safely on the server, where the `window` object does not exist.

The final solution:

- avoids SSR-related runtime errors,
- maintains correct behavior on the client side.

---

## 📈 Chart Libraries – Experiments

During development, multiple charting libraries were evaluated, mainly:

- **Nivo**
- **Recharts**

### Nivo

**Pros:**

- visually appealing,
- extensive customization options

**Cons:**

- significantly more boilerplate code,
- slower data updates,
- SVG (`<g />`) issues during window resizing.

### Recharts (Final Choice)

**Pros:**

- simpler and cleaner implementation,
- better overall performance,
- more stable during screen size changes,
- smoother animations when data updates.

➡️ Ultimately, **Recharts** is the only library used in the application.  
However, **Nivo-related code remains in the project** and can be easily reused in the future if needed.

---

## ✅ Summary

This project was built with a strong focus on:

- thoughtful architecture,
- high code quality,
- performance optimization,
- scalability and future-proof design.

It applies best practices for **React + TypeScript**, along with multiple performance-oriented techniques, resulting in a fast, stable, and maintainable application.

## Not used code

- /app/components/Charts/Nivo
- /app/utils/filters.utils.ts -> applyFiltersLazy
- /app/store/ThemeContext.tsx
- /app/hooks/Table/useTableSorting.ts
- /app/utils/table.utils.ts
- /app/utils/utils.ts -> areNumbers
