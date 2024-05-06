"use client";

/*DashboardLayout
- This component is a layout component that wraps the dashboard pages.
- Its a "blank" layout that doesn't have any specific styles or components because:
  * It will contain the dashboard pages that will have their own styles and components.
  * These Pages have their own Nested Layouts
- It will be used to wrap the dashboard pages.
*/


import * as React from "react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
