import { Button } from "components/Button";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { accountService } from "services";

export function CreateOrUpdate({ account }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (account) {
      const fields = ["name", "website", "type", "billingAddressCountry"];
      fields.forEach((field) => setValue(field, account[field]));
    }
  }, [account, setValue]);

  const createAccount = async (data) => {
    try {
      setIsLoading(true);
      await accountService.create(data);
      setIsLoading(false);
      toast.success("Account Created!");
      router.push(".");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const updateAccount = async (id, data) => {
    try {
      setIsLoading(true);
      await accountService.update(id, data);
      setIsLoading(false);
      toast.success("Account Updated!");
      router.push("..");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const onsubmit = (data) => {
    account ? updateAccount(account.id, data) : createAccount(data);
  };

  return (
    <div className="px-6 py-8 rounded-md bg-white">
      <form onSubmit={handleSubmit(onsubmit)}>
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
          <input
            type="url"
            name="website"
            placeholder=" "
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            {...register("website", { required: true, maxLength: 80 })}
          />
          <label
            htmlFor="website"
            className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
          >
            Enter website
          </label>
          {errors.website && (
            <span className="text-sm text-red-600" id="error">
              {errors.website?.type === "required" && "website is required"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-8">
            <select
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("type", { required: true })}
            >
              <option defaultValue hidden>
                Choose here
              </option>
              <option value="Customer">Customer</option>
              <option value="Investor">Investor</option>
              <option value="Partner">Partner</option>
              <option value="Reseller">Reseller</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select a type
            </label>
            {errors.type && (
              <span className="text-sm text-red-600" id="error">
                {errors.type?.type === "required" && "type has to be selected"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <input
              type="text"
              name="billingAddressCountry"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("billingAddressCountry", {
                required: true,
                maxLength: 80,
              })}
            />
            <label
              htmlFor="billingAddressCountry"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter country
            </label>
            {errors.billingAddressCountry && (
              <span className="text-sm text-red-600" id="error">
                {errors.billingAddressCountry?.type === "required" &&
                  "country is required"}
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
            ) : account ? (
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
