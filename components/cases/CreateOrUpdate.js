import { Button } from "components/Button";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { accountService, caseService } from "services";

export function CreateOrUpdate({ _case }) {
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

    if (_case) {
      const fields = ["name", "accountId", "priority", "status"];
      fields.forEach((field) => setValue(field, _case[field]));
    }
  }, [_case, setValue]);

  const createCase = async (data) => {
    try {
      setIsLoading(true);
      await caseService.create({ ...data, assignedUserId: "52eb6b7c2a118" });
      setIsLoading(false);
      toast.success("Case Created!");
      router.push(".");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const updateCase = async (id, data) => {
    try {
      setIsLoading(true);
      await caseService.update(id, data);
      setIsLoading(false);
      toast.success("Case Updated!");
      router.push("..");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const onsubmit = (data) => {
    _case ? updateCase(_case.id, data) : createCase(data);
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
                {errors.accountId?.type === "required" &&
                  "Account has to be selected"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <select
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("status", { required: true })}
            >
              <option defaultValue hidden>
                Choose here
              </option>
              <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="Pending">Pending</option>
              <option value="Duplicated">Duplicated</option>
              <option value="Rejected">Rejected</option>
              <option value="Closed">Closed</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select a Status
            </label>
            {errors.status && (
              <span className="text-sm text-red-600" id="error">
                {errors.status?.type === "required" &&
                  "Status has to be selected"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <select
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("priority", { required: true })}
            >
              <option defaultValue hidden>
                Choose here
              </option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select a Priority
            </label>
            {errors.priority && (
              <span className="text-sm text-red-600" id="error">
                {errors.priority?.type === "required" &&
                  "Priority has to be selected"}
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
            ) : _case ? (
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
