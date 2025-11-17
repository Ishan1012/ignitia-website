"use client";
import { useCursor } from "@/context/CursorContext";
import { useEffect, useState } from "react";

export default function Cursor() {
	const { hovered, disabled } = useCursor();
	const [pos, setPos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
		window.addEventListener("mousemove", move);
		return () => window.removeEventListener("mousemove", move);
	}, []);

	return (
		<div
			className={`
				fixed w-[75px] h-[75px] rounded-full bg-amber-400
				mix-blend-exclusion pointer-events-none z-[6]
				transition-transform duration-[350ms]
				transform -translate-x-1/2 -translate-y-1/2
				${hovered ? "scale-[1.2] bg-amber-400/70" : ""}
				${disabled ? "scale-0" : "scale-[0.35]"}
				transition-bg duration-[350ms]
			`}
			style={{ top: pos.y, left: pos.x }}
		/>
	);
}
