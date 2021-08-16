import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Button from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AccountForm2({
  title,
  createAccount,
  setModalIsOpen,
  modalIsOpen,
  isLoading,
  setAccountToEdit,
  accountToEdit,
  editAccount,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!modalIsOpen) {
      setAccountToEdit(undefined);
    }

    if (accountToEdit) {
      const fields = ["name", "website", "type", "billingAddressCountry"];
      fields.forEach((field) => setValue(field, accountToEdit[field]));
    }
  }, [accountToEdit, modalIsOpen, setAccountToEdit, setValue]);

  return (
    <div className="px-6 py-8 rounded-md bg-white">
      <div className="text-2xl border-b-2 pb-2 mb-8">{title}</div>
      <form
        onSubmit={handleSubmit((data) => {
          if (editAccount) {
            editAccount(accountToEdit.id, data);
          } else {
            createAccount(data);
          }
        })}
      >
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
            onClick={() => {
              setModalIsOpen(false);
            }}
            className="w-40 h-12"
            color="red"
          >
            Close
          </Button>

          <button
            type="submit"
            disabled={isLoading && true}
            className="flex items-center justify-center w-40 h-12 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
          >
            {isLoading ? (
              <Loading size="6" color="white" />
            ) : accountToEdit ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
