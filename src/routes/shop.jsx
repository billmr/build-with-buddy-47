import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  component: ShopLayout,
});

function ShopLayout() {
  return <Outlet />;
}

export default ShopLayout;
