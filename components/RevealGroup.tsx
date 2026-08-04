"use client";

import { ReactNode } from "react";
import useReveal from "@/hooks/useReveal";

interface RevealGroupProps {
  children: ReactNode;
  as?: "div" | "section";
  className?: string;
  id?: string;
}

/** Wraps a section so any descendant with className "reveal" fades/rises in on scroll. */
export default function RevealGroup({ children, as = "div", className, id }: RevealGroupProps) {
  const ref = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref as never} className={className} id={id}>
      {children}
    </Tag>
  );
}
