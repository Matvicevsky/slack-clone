import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCreateChannelModal } from '../store/use-create-channel-modal'
import { useRouter } from 'next/navigation'
import { useCreateChannel } from '../api/use-createchannel'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

export const CreateChannelModal = () => {
	const router = useRouter()
	const workspaceId = useWorkspaceId()
	const { mutate, isPending } = useCreateChannel()

	const [open, setOpen] = useCreateChannelModal()
	const [name, setName] = useState('')

	const handleClose = () => {
		setName('')
		setOpen(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\s+/g, '-').toLowerCase()
		setName(value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		mutate(
			{
				name,
				workspaceId,
			},
			{
				onSuccess(id) {
					router.push(`/workspace/${workspaceId}/channel/${id}`)
					handleClose()
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='bg-white'>
				<DialogHeader>
					<DialogTitle>Add a channel</DialogTitle>
				</DialogHeader>
				<form className='space-y-4' onSubmit={handleSubmit}>
					<Input
						value={name}
						onChange={handleChange}
						disabled={isPending}
						required
						autoFocus
						minLength={3}
						maxLength={80}
						placeholder='e.g. plan-budget'
					/>
					<div className='flex justify-end'>
						<Button disabled={isPending}>Create</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}