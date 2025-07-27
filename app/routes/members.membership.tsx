import { Heading } from '../../components/ui-toolkit/heading'
import { Text } from '../../components/ui-toolkit/text'
import { Button } from '../../components/ui-toolkit/button'
import { Badge } from '../../components/ui-toolkit/badge'
import { Divider } from '../../components/ui-toolkit/divider'

export default function MembersMembership() {
  const membershipInfo = {
    type: 'Premium',
    status: 'Active',
    startDate: '2024-01-01',
    renewalDate: '2024-12-31',
    benefits: [
      'Access to all workshop spaces',
      'Priority booking for events',
      '24/7 facility access',
      'Guest privileges',
      'Storage locker included'
    ]
  }

  const paymentHistory = [
    { date: '2024-01-01', amount: '$120.00', status: 'Paid', method: 'Credit Card' },
    { date: '2023-01-01', amount: '$120.00', status: 'Paid', method: 'Credit Card' },
    { date: '2022-01-01', amount: '$100.00', status: 'Paid', method: 'Bank Transfer' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <Heading level={1}>Manage Membership</Heading>
        <Text className="mt-2 text-zinc-600 dark:text-zinc-400">
          View and manage your membership details, billing, and benefits
        </Text>
      </div>

      {/* Current Membership */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <Heading level={2} className="text-xl font-semibold">
              Current Membership
            </Heading>
            <div className="mt-2 flex items-center gap-3">
              <Badge color="blue">{membershipInfo.type}</Badge>
              <Badge color="green">{membershipInfo.status}</Badge>
            </div>
          </div>
          <Button color="blue">
            Upgrade Plan
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Start Date
            </Text>
            <Text className="mt-1 text-zinc-600 dark:text-zinc-400">
              {membershipInfo.startDate}
            </Text>
          </div>
          <div>
            <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Next Renewal
            </Text>
            <Text className="mt-1 text-zinc-600 dark:text-zinc-400">
              {membershipInfo.renewalDate}
            </Text>
          </div>
        </div>

        <div className="mt-6">
          <Text className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Membership Benefits
          </Text>
          <ul className="mt-2 space-y-1">
            {membershipInfo.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Divider />

      {/* Payment History */}
      <div>
        <div className="flex items-center justify-between">
          <Heading level={2} className="text-xl font-semibold">
            Payment History
          </Heading>
          <Button outline>
            Download Receipts
          </Button>
        </div>

        <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
            <thead className="bg-zinc-50 dark:bg-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-900">
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
                    {payment.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
                    {payment.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Badge color="green">{payment.status}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {payment.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-800/50">
        <Heading level={3} className="text-lg font-medium">
          Quick Actions
        </Heading>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button outline>
            Update Payment Method
          </Button>
          <Button outline>
            Change Billing Address
          </Button>
          <Button outline>
            Pause Membership
          </Button>
          <Button color="red">
            Cancel Membership
          </Button>
        </div>
      </div>
    </div>
  )
}
