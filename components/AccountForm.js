import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountForm({ editingData, title }) {
  const [isSending, setisSending] = useState(false);

  const nameRef = useRef(null);
  const webSiteRef = useRef(null);
  const typeRef = useRef(null);
  const countryRef = useRef(null);

  const notiStyles = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "text-center",
  };

  useEffect(() => {
    if (editingData) {
      nameRef.current.value = editingData.name;
      webSiteRef.current.value = editingData.website;
      typeRef.current.value = editingData.type;
      countryRef.current.value = editingData.billingAddressCountry;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nameRef.current.value &&
      webSiteRef.current.value &&
      typeRef.current.value &&
      countryRef.current.value
    ) {
      try {
        setisSending(true);

        if (editingData === undefined) {
          const payload = {
            name: nameRef.current.value,
            website: webSiteRef.current.value,
            type: typeRef.current.value,
            billingAddressCountry: countryRef.current.value,
          };

          const { data } = await axios.post("/api/espocrm/Account", payload);
          console.log(data);
          toast.dark("Account Created!", notiStyles);
        }

        if (editingData) {
          const payload = {
            id: editingData.id,
            name: nameRef.current.value,
            website: webSiteRef.current.value,
            type: typeRef.current.value,
            billingAddressCountry: countryRef.current.value,
          };

          const { data } = await axios.put(
            `/api/espocrm/Account/${payload.id}`,
            payload
          );
          console.log(data);
          toast.dark("Account Updated!", notiStyles);
        }

        // nameRef.current.value = null;
        // webSiteRef.current.value = null;
        // typeRef.current.value = null;
        // countryRef.current.value = null;
        setisSending(false);
      } catch (error) {
        console.error(error);
        setisSending(false);
      }
    }

    // nameRef.current.value = null;
    // emailRef.current.value = null;
    // messageRef.current.value = null;
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-md bg-white">
      <div className="text-2xl font-bold border-b-2 pb-2 mb-2">{title}</div>

      <div className="floating-input mb-5 relative ">
        <input
          type="text"
          id="name"
          ref={nameRef}
          required={true}
          className="dark:text-gray-50 dark:bg-gray-900 border-b-2 border-gray-600 dark:border-gray-50 focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-sm w-full p-3 h-16"
          placeholder="name@example.com"
        />
        <label
          htmlFor="name"
          className="dark:text-gray-50 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
        >
          Name
        </label>
      </div>

      <div className="floating-input mb-5 relative">
        <input
          type="text"
          id="webSite"
          ref={webSiteRef}
          required={true}
          className="dark:text-gray-50  dark:bg-gray-900 border-b-2 border-gray-600 dark:border-gray-50 focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-sm w-full p-3 h-16"
          placeholder="name@example.com"
        />
        <label
          htmlFor="webSite"
          className="dark:text-gray-50 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
        >
          Web Site URL
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="floating-input mb-5 relative">
          <input
            type="text"
            id="type"
            ref={typeRef}
            required={true}
            className="dark:text-gray-50  dark:bg-gray-900 border-b-2 border-gray-600 dark:border-gray-50 focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-sm w-full p-3 h-16"
            placeholder="name@example.com"
          />
          <label
            htmlFor="type"
            className="dark:text-gray-50 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
          >
            Type
          </label>
        </div>

        <div className="floating-input mb-5 relative">
          <input
            type="text"
            id="country"
            name="reply_to"
            ref={countryRef}
            required={true}
            className="dark:text-gray-50  dark:bg-gray-900 border-b-2 border-gray-600 dark:border-gray-50 focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-sm w-full p-3 h-16"
            placeholder="name@example.com"
          />
          <label
            htmlFor="country"
            className="dark:text-gray-50 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
          >
            Country
          </label>
        </div>
      </div>

      {!isSending ? (
        <button className="w-full border-2 border-gray-900 dark:border-gray-50 text-gray-900 dark:text-gray-50 hover:bg-gray-900 dark:hover:bg-gray-50  hover:text-gray-50 dark:hover:text-gray-900 p-3 rounded-md transition-all duration-100">
          Send
        </button>
      ) : (
        " <LoadingButton />"
      )}
    </form>
  );
}
