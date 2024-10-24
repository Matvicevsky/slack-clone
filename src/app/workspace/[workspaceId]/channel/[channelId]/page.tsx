'use client'

import { Loader, TriangleAlert } from 'lucide-react'

import { useGetChannelById } from '@/features/channels/api/use-get-channel-by-id'
import { useGetMessages } from '@/features/messages/api/use-get-messages'

import { useChannelId } from '@/hooks/use-channel-id'
import { MessageList } from '@/components/message-list'

import { Header } from './header'
import { ChatInput } from './chat-input'

const ChannelIdPage = () => {
	const channelId = useChannelId()

	const { results, loadMore, status } = useGetMessages({ channelId })
	const { data: channel, isLoading: channelLoading } = useGetChannelById({
		id: channelId,
	})

	if (channelLoading || status === 'LoadingFirstPage') {
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

	return (
		<div className='h-full flex flex-col'>
			<Header title={channel.name} />
			<MessageList
				channelName={channel.name}
				channelCreationTime={channel._creationTime}
				data={results}
				loadMore={loadMore}
				isLoadingMore={status === 'LoadingMore'}
				canLoadMore={status === 'CanLoadMore'}
				variant='channel'
			/>
			<ChatInput placeholder={`Message # ${channel.name}`} />
		</div>
	)
}

export default ChannelIdPage
