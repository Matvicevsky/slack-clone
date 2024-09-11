import { toast } from 'sonner'
import { CopyIcon, RefreshCcw } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'

import { useNewJoinCode } from '@/features/workspaces/api/use-new-join-code'

import { useWorkspaceId } from '@/hooks/use-workspace-id'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface InviteModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	name: string
	joinCode: string
}

export const InviteModal = ({
	open,
	setOpen,
	joinCode,
	name,
}: InviteModalProps) => {
	const workspaceId = useWorkspaceId()
	const [ConfirmDialog, confirm] = useConfirm(
		'Are you sure?',
		'This will deactivate the current invite code and generate an ew one.'
	)

	const { mutate, isPending } = useNewJoinCode()

	const handleNewCode = async () => {
		const ok = await confirm()

		if (!ok) return

		mutate(
			{ workspaceId },
			{
				onSuccess: () => {
					toast.success('Invite code regenerated', {
						style: { backgroundColor: 'white' },
					})
				},
				onError: () => {
					toast.error('Failed to regenerate invite code', {
						style: { backgroundColor: 'white' },
					})
				},
			}
		)
	}

	const handleCopy = () => {
		const inviteLink = `${window.location.origin}/join/${workspaceId}`

		navigator.clipboard.writeText(inviteLink).then(() =>
			toast.success('invite link copied to clipboard', {
				style: { backgroundColor: 'white' },
			})
		)
	}

	return (
		<>
			<ConfirmDialog />
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='bg-white'>
					<DialogHeader>
						<DialogTitle>Invite people to your {name}</DialogTitle>
						<DialogDescription>
							Use the code below to invite people to your workspace
						</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col gap-y-4 items-center justify-center py-10'>
						<p className='text-4xl font-bold tracking-widest uppercase'>
							{joinCode}
						</p>
						<Button onClick={handleCopy} variant='ghost' size='sm'>
							Cope link
							<CopyIcon className='size-4 ml-2' />
						</Button>
					</div>
					<div className='flex items-center justify-between w-full'>
						<Button
							disabled={isPending}
							onClick={handleNewCode}
							variant='outline'
						>
							New code
							<RefreshCcw
								className={cn('size-4 ml-2', {
									'animate-spin shrink-0': isPending,
								})}
							/>
						</Button>
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
