import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/src/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-[20px] bg-white border border-[#DCE3F0] shadow-[0_6px_20px_rgba(27,35,71,0.05)] overflow-hidden transition-colors",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left text-base sm:text-lg font-extrabold text-[#1B2347] transition-all hover:text-[#2453E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2453E0] focus-visible:ring-inset cursor-pointer [&[data-state=open]>span]:rotate-180 [&[data-state=open]>span]:bg-[#2453E0] [&[data-state=open]>span]:text-white",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6EEFB] text-[#2453E0] transition-all duration-200">
        <ChevronDown className="h-4 w-4 shrink-0" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[15px] sm:text-base leading-relaxed text-[#3E4870] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-5 pb-5 pt-0 sm:px-6 sm:pb-6 border-t border-[#F0F4FA]", className)}>
      <div className="pt-3">{children}</div>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
