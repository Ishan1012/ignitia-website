"use client";
import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CursorProvider } from "@/context/CursorContext";
import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("@/components/cursor"), { ssr: false });

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
			<CursorProvider>
				<Cursor />
				{children}
				<Toaster position="bottom-right" richColors />
			</CursorProvider>
	);
}
