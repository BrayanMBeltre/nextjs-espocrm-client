import { Button } from "components/Button";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { accountService, opportunityService } from "services";

export function CreateOrUpdate({ opportunity }) {
  const [accounts, setAccounts] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    try {
      accountService.getAll().then((x) => setAccounts(x.list));
    } catch (error) {
      console.log(error);
    }

    if (opportunity) {
      const fields = [
        "name",
        "accountId",
        "stage",
        "probability",
        "amount",
        "closeDate",
      ];
      fields.forEach((field) => setValue(field, opportunity[field]));
    }
  }, [opportunity, setValue]);

  const createOpportunity = async (data) => {
    try {
      setIsLoading(true);
      await opportunityService.create({
        ...data,
        assignedUserId: "52eb6b7c2a118",
      });
      setIsLoading(false);
      toast.success("Opportunity Created!");
      router.push(".");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const updateOpportunity = async (id, data) => {
    try {
      setIsLoading(true);
      await opportunityService.update(id, data);
      setIsLoading(false);
      toast.success("Opportunity Updated!");
      router.push("..");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const onsubmit = (data) => {
    opportunity
      ? updateOpportunity(opportunity.id, data)
      : createOpportunity(data);
  };

  return (
    <div className="px-6 py-8 rounded-md bg-white">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-8">
            <input
              type="text"
              name="name"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("name", { required: true, maxLength: 80 })}
            />
            <label
              htmlFor="name"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter name
            </label>
            {errors.name && (
              <span className="text-sm text-red-600" id="error">
                {errors.name?.type === "required" && "Name is required"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <select
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("accountId", { required: true })}
            >
              <option defaultValue hidden>
                Choose here
              </option>

              {accounts ? (
                accounts.map((account) => (
                  <option key={account.id} value={`${account.id}`}>
                    {account.name}
                  </option>
                ))
              ) : (
                <option disabled={true}>Loading accounts...</option>
              )}
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select a Account
            </label>
            {errors.accountId && (
              <span className="text-sm text-red-600" id="error">
                {errors.accountId?.accountId === "required" &&
                  "Account has to be selected"}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-8">
            <input
              type="number"
              name="probability"
              placeholder=" "
              className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("probability", { required: true, maxLength: 80 })}
            />
            <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">
              %
            </div>
            <label
              htmlFor="probability"
              className="absolute duration-300 top-3 left-5 -z-1 origin-0 text-gray-500"
            >
              Enter Probability
            </label>
            {errors.probability && (
              <span className="text-sm text-red-600" id="error">
                {errors.probability?.type === "required" &&
                  "Probability is required"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <input
              type="number"
              name="amount"
              placeholder=" "
              className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("amount", { required: true, maxLength: 80 })}
            />
            <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">
              $
            </div>
            <label
              htmlFor="amount"
              className="absolute duration-300 top-3 left-5 -z-1 origin-0 text-gray-500"
            >
              Enter Amount
            </label>
            {errors.amount && (
              <span className="text-sm text-red-600" id="error">
                {errors.amount?.type === "required" && "Amount is required"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <select
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("stage", { required: true })}
            >
              <option value="Prospecting">Prospecting</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select a Stage
            </label>
            {errors.stage && (
              <span className="text-sm text-red-600" id="error">
                {errors.stage?.stage === "required" &&
                  "Stage has to be selected"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <input
              type="date"
              name="closeDate"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("closeDate", { required: true, maxLength: 80 })}
            />
            <label
              htmlFor="closeDate"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter Close Date
            </label>
            {errors.closeDate && (
              <span className="text-sm text-red-600" id="error">
                {errors.closeDate?.type === "required" &&
                  "Close Date is required"}
              </span>
            )}
          </div>
        </div>

        <div className=" flex gap-4 items-center justify-center">
          <Button
            type="button"
            onClick={() => {
              router.back();
            }}
            disabled={isLoading && true}
            color={isLoading ? "gray" : "red"}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading && true}>
            {isLoading ? (
              <Spinner size="6" color="indigo" />
            ) : opportunity ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
