import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server'

import { ConvexClientProvider } from '@/components/convex-client-provider'
import { JotaiProvider } from '@/components/jotai-provider'

import { Modals } from '@/components/modals'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}
console.log('sdad')

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ConvexAuthNextjsServerProvider>
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ConvexClientProvider>
						<JotaiProvider>
							<Modals />
							<Toaster />
							{children}
						</JotaiProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ConvexAuthNextjsServerProvider>
	)
}
