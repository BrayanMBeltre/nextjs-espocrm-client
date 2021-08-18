import { Button } from "components/Button";
import { Spinner } from "components/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { leadService } from "services";

export function CreateOrUpdate({ lead }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (lead) {
      const fields = [
        "firstName",
        "lastName",
        "emailAddress",
        "status",
        "assignedUserId",
      ];
      fields.forEach((field) => setValue(field, lead[field]));
    }
  }, [lead, setValue]);

  const createLead = async (data) => {
    try {
      setIsLoading(true);
      await leadService.create({ ...data, assignedUserId: "53203b94287b3" });
      setIsLoading(false);
      toast.success("Lead Created!");
      router.push(".");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const updateLead = async (id, data) => {
    try {
      setIsLoading(true);
      await leadService.update(id, data);
      setIsLoading(false);
      toast.success("Lead Updated!");
      router.push("..");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  const onsubmit = (data) => {
    lead ? updateLead(lead.id, data) : createLead(data);
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
                {errors.lastName?.type === "required" &&
                  "Last Name is required"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <input
              type="email"
              name="emailAddress"
              placeholder=" "
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("emailAddress", {
                required: true,
                maxLength: 80,
              })}
            />
            <label
              htmlFor="emailAddress"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Enter Email
            </label>
            {errors.emailAddress && (
              <span className="text-sm text-red-600" id="error">
                {errors.emailAddress?.type === "required" &&
                  "Email is required"}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-8">
            <select
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              {...register("status", { required: true })}
            >
              <option defaultValue disabled hidden>
                Choose here
              </option>
              <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="In Process">In Process</option>
              <option value="Converted">Converted</option>
              <option value="Recycled">Recycled</option>
              <option value="Dead">Dead</option>
            </select>
            <label
              htmlFor="select"
              className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
            >
              Select a Status
            </label>
            {errors.status && (
              <span className="text-sm text-red-600" id="error">
                {errors.status?.status === "required" &&
                  "Status has to be selected"}
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
            ) : lead ? (
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
