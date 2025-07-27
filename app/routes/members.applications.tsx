import { Heading } from '../../components/ui-toolkit/heading'
import { Text } from '../../components/ui-toolkit/text'
import { Button } from '../../components/ui-toolkit/button'
import { Badge } from '../../components/ui-toolkit/badge'

export default function MembersApplications() {
  const applications = [
    {
      id: 1,
      title: 'Workshop Access Request',
      status: 'pending',
      submittedDate: '2024-01-15',
      description: 'Request for access to the woodworking workshop'
    },
    {
      id: 2,
      title: 'Event Hosting Application',
      status: 'approved',
      submittedDate: '2024-01-10',
      description: 'Application to host a community tech talk'
    },
    {
      id: 3,
      title: 'Volunteer Coordinator Role',
      status: 'under_review',
      submittedDate: '2024-01-08',
      description: 'Application for volunteer coordinator position'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'green'
      case 'pending':
        return 'yellow'
      case 'under_review':
        return 'blue'
      default:
        return 'zinc'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'pending':
        return 'Pending'
      case 'under_review':
        return 'Under Review'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1}>Applications</Heading>
          <Text className="mt-2 text-zinc-600 dark:text-zinc-400">
            View and manage your submitted applications
          </Text>
        </div>
        <Button color="blue">
          New Application
        </Button>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Heading level={3} className="text-lg font-medium">
                    {application.title}
                  </Heading>
                  <Badge color={getStatusColor(application.status)}>
                    {getStatusText(application.status)}
                  </Badge>
                </div>
                <Text className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {application.description}
                </Text>
                <Text className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
                  Submitted on {application.submittedDate}
                </Text>
              </div>
              <div className="flex gap-2">
                <Button outline>
                  View Details
                </Button>
                {application.status === 'pending' && (
                  <Button color="red">
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
