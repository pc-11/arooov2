import { Heading } from '../../components/ui-toolkit/heading'
import { Text } from '../../components/ui-toolkit/text'
import { Button } from '../../components/ui-toolkit/button'
import { Input } from '../../components/ui-toolkit/input'
import { Textarea } from '../../components/ui-toolkit/textarea'
import { Fieldset } from '../../components/ui-toolkit/fieldset'

export default function MembersProfile() {
  return (
    <div className="space-y-8">
      <div>
        <Heading level={1}>Edit Profile</Heading>
        <Text className="mt-2 text-zinc-600 dark:text-zinc-400">
          Update your personal information and preferences
        </Text>
      </div>

      <form className="space-y-8">
        <Fieldset>
          <legend className="text-base/7 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
            Personal Information
          </legend>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                First name
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                Last name
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                Phone number
              </label>
              <div className="mt-2">
                <Input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </Fieldset>

        <Fieldset>
          <legend className="text-base/7 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
            About
          </legend>
          <div className="mt-6">
            <label htmlFor="bio" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
              Bio
            </label>
            <div className="mt-2">
              <Textarea
                name="bio"
                id="bio"
                rows={4}
                placeholder="Tell us a little about yourself..."
              />
            </div>
            <Text className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Write a few sentences about yourself.
            </Text>
          </div>
        </Fieldset>

        <Fieldset>
          <legend className="text-base/7 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
            Preferences
          </legend>
          <div className="mt-6 space-y-6">
            <div className="flex items-center">
              <input
                id="notifications"
                name="notifications"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
              />
              <div className="ml-3">
                <label htmlFor="notifications" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Email notifications
                </label>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                  Receive email notifications about important updates
                </Text>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
              />
              <div className="ml-3">
                <label htmlFor="newsletter" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Newsletter subscription
                </label>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                  Subscribe to our monthly newsletter
                </Text>
              </div>
            </div>
          </div>
        </Fieldset>

        <div className="flex justify-end gap-3">
          <Button outline>
            Cancel
          </Button>
          <Button color="blue">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
