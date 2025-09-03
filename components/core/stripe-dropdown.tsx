import { Button } from "../../components/ui-toolkit/button";

interface StripeOptions {
  id: string;
  amount: number;
}

interface StripeDropdownProps {
  currentDues?: string;
  stripeOptions?: StripeOptions[];
}

function hardcodedStripeData(): StripeOptions[] {
  return [
    { id: "15_monthly", amount: 15.0 },
    { id: "20_monthly", amount: 20.0 },
    { id: "medium_monthly", amount: 25.0 },
    { id: "30_monthly", amount: 30.0 },
    { id: "35_monthly", amount: 35.0 },
    { id: "40_monthly", amount: 40.0 },
    { id: "45_monthly", amount: 45.0 },
    { id: "large_monthly", amount: 50.0 },
    { id: "75_monthly", amount: 75.0 },
    { id: "extra_large_monthly", amount: 100.0 },
  ];
}

export function StripeDropdown({
  currentDues,
  stripeOptions,
  ...props
}: StripeDropdownProps) {
  stripeOptions = stripeOptions ?? hardcodedStripeData();
  const dollarAsText = (amount: number) => {
    return `${Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)} USD Monthly`;
  };
  return (
    <div className="pt-3 pb-3">
      {/* TODO: Post to /members/users/{user_id}/dues or whichever new route */}
      <form id="dues-form" className="flex flexcol">
        {/* TODO: Migrate select+option to whatever the selectMenu equivalent is in TailwindPlus? Not currently copied over */}
        <select className="bg-white rounded-sm p-2">
          {stripeOptions.map((item: StripeOptions) => (
            <option key={item.id} value={item.amount}>
              {dollarAsText(item.amount)}
            </option>
          ))}
          {/* <ListboxOption key=""></ListboxOption> */}
        </select>
        <div className="min-w-5"> </div>
        <Button color="dark/primary">Update Dues</Button>
      </form>
    </div>
  );
}
