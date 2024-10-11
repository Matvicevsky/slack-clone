'use client'

import { Loader, TriangleAlert } from 'lucide-react'

import { useGetChannelById } from '@/features/channels/api/use-get-channel-by-id'

import { useChannelId } from '@/hooks/use-channel-id'

import { Header } from './header'

const ChannelIdPage = () => {
	const channelId = useChannelId()

	const { data: channel, isLoading: channelLoading } = useGetChannelById({
		id: channelId,
	})

	if (channelLoading) {
		return (
			<div className='h-full flex-1 flex items-center justify-center'>
				<Loader className='size-5 animate-spin shrink-0 text-muted-foreground' />
			</div>
		)
	}

	if (!channel) {
		return (
			<div className='h-full flex-1 flex flex-col gap-y-4 items-center justify-center'>
				<TriangleAlert className='size-5 shrink-0 text-muted-foreground' />
				<span className='text-sm text-muted-foreground'>Channel not found</span>
			</div>
		)
	}

	// TODO: 6min 46sec
	return (
		<div className='h-full flex flex-col'>
			<Header title={channel.name} />
		</div>
	)
}

export default ChannelIdPage
