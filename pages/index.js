import axios from "axios";
import { Dashboard } from "components";
import { useEffect } from "react";
import { accountService } from "services";

export default function Home() {
  // useEffect(() => {
  //   accountService.getAll().then((x) => {
  //     console.log(x);
  //   });
  // }, []);

  return (
    <div className="container mx-auto p-8 w-full mb-8 overflow-hidden rounded-lg">
      <div>
        <h4 className="text-sm font-bold text-indigo-600">
          Hi Sierra Ferguson,
        </h4>
        <h1 className="text-4xl font-bold text-indigo-900 mt-">
          Welcome to EspoCRM!
        </h1>
      </div>

      <div>
        <Dashboard />
      </div>
    </div>
  );
}
