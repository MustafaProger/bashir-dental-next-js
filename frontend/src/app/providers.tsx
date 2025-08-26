"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useRef } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const clientRef = useRef<QueryClient | null>(null);
	if (!clientRef.current) {
		clientRef.current = new QueryClient();
	}

	return (
		<QueryClientProvider client={clientRef.current}>
			<div className='providers'>{children}</div>
		</QueryClientProvider>
	);
};

export default Providers;
