"use client";
import * as Primitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/content";
export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <Primitive.Root type="single" collapsible className="faq-list">
      {items.map((item) => (
        <Primitive.Item value={item.id} key={item.id} className="faq-item">
          <Primitive.Header>
            <Primitive.Trigger className="faq-trigger">
              <span>{item.question}</span>
              <span className="faq-toggle" aria-hidden="true">
                <Plus size={19} strokeWidth={2} />
              </span>
            </Primitive.Trigger>
          </Primitive.Header>
          <Primitive.Content className="faq-answer">
            {item.answer}
          </Primitive.Content>
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
