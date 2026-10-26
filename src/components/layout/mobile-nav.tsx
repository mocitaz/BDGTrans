"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navigation } from "@/constants/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";
export function MobileNav({ tone = "navy" }: { tone?: "white" | "navy" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={`mobile-menu-trigger ${tone === "white" ? "is-light" : ""}`}
          aria-label="Buka menu navigasi"
        >
          <Menu size={23} />
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <BrandLogo />
          <DialogTitle className="mt-5 text-xl font-medium">
            Menu BDG TRANS
          </DialogTitle>
          <DialogDescription className="mt-2 text-xs text-[#526176]">
            Temukan armada dan rencanakan perjalanan Anda.
          </DialogDescription>
          <nav aria-label="Navigasi seluler" className="mt-6 flex flex-col">
            {navigation.map(([id, label]) => (
              <Link
                className="border-b border-[#e2e8f0] py-3"
                key={id}
                href={`/#${id}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              className={`${buttonVariants()} mt-5`}
              href="/#reservasi"
              onClick={() => setOpen(false)}
            >
              Minta Penawaran
            </Link>
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
}
