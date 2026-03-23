// src/routes/index.tsx
import React from "react";
import { useRoutes } from "react-router-dom";


const routes = [
  {
    element: <p>a</p>,
    children: [
      { path: "/", element: <p>Home</p> },
      { path: "/products", element: <p>Products</p> },
    ],
  },
  {
    element: <p>b</p>,
    children: [
      { path: "/login", element: <p>Login</p> },
    ],
  },
];

export default function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}
