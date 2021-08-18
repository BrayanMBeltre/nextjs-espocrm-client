import { Button } from "components/Button";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { accountService, contactService } from "services";

export function CreateOrUpdate({ contact }) {
  const [accounts, setAccounts] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    try {
      accountService.getAll().then((x) => setAccounts(x.list));
    } catch (error) {
      console.log(error);
    }

    if (contact) {
      const fields = [
        "firstName",
        "lastName",
        "accountId",
        "emailAddress",
        "phoneNumber",
      ];
      fields.forEach((field) => setValue(field, contact[field]));
    }
  }, []);

  const createContact = async (data) => {
    try {
      setIsLoading(true);
      await contactService.create(data);
      setIsLoading(false);
      toast.success("Contact Created!");
      router.push(".");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const updateContact = async (id, data) => {
    try {
      setIsLoading(true);
      await contactService.update(id, data);
      setIsLoading(false);
      toast.success("Contact Updated!");
      router.push("..");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const onsubmit = (data) => {
    contact ? updateContact(contact.id, data) : createContact(data);
  };

  return (
    <div className="px-6 py-8 rounded-md bg-white">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-8">
            <input
              type="text"
              name="firstName"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("firstName", { required: true, maxLength: 80 })}
            />
            <label
              htmlFor="firstName"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter First Name
            </label>
            {errors.firstName && (
              <span className="text-sm text-red-600" id="error">
                {errors.firstName?.type === "required" &&
                  "First Name is required"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <input
              type="text"
              name="lastName"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("lastName", { required: true, maxLength: 80 })}
            />
            <label
              htmlFor="lastName"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter Last Name
            </label>
            {errors.lastName && (
              <span className="text-sm text-red-600" id="error">
                {errors.lastName?.lastName === "required" &&
                  "Last Name is required"}
              </span>
            )}
          </div>
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
            type="email"
            name="emailAddress"
            placeholder=" "
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            {...register("emailAddress", { required: true, maxLength: 80 })}
          />
          <label
            htmlFor="emailAddress"
            className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
          >
            Enter Email
          </label>
          {errors.emailAddress && (
            <span className="text-sm text-red-600" id="error">
              {errors.emailAddress?.type === "required" && "Email is required"}
            </span>
          )}
        </div>

        <div className="relative z-0 w-full mb-8">
          <input
            type="text"
            name="phoneNumber"
            placeholder=" "
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            {...register("phoneNumber", {
              required: true,
              maxLength: 80,
            })}
          />
          <label
            htmlFor="phoneNumber"
            className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
          >
            Enter Phone
          </label>
          {errors.phoneNumber && (
            <span className="text-sm text-red-600" id="error">
              {errors.phoneNumber?.type === "required" && "Phone is required"}
            </span>
          )}
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
            ) : contact ? (
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
