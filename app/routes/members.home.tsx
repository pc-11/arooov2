import { Heading } from '../../components/ui-toolkit/heading'
import { Text } from '../../components/ui-toolkit/text'

export default function MembersHome() {
  return (
    <div className="space-y-6">
      <div>
        <Heading level={1}>Home</Heading>
        <Text className="mt-2 text-zinc-600 dark:text-zinc-400">
          Welcome to the members area. This is your dashboard where you can access all member features.
        </Text>
      </div>
      
      <div className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-800/50">
        <Heading level={2} className="mb-4">Quick Actions</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800">
            <Heading level={3} className="text-sm font-medium">Applications</Heading>
            <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              View and manage your applications
            </Text>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800">
            <Heading level={3} className="text-sm font-medium">Profile</Heading>
            <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Update your profile information
            </Text>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800">
            <Heading level={3} className="text-sm font-medium">Membership</Heading>
            <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Manage your membership settings
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
