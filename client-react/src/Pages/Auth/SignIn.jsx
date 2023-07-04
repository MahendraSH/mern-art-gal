
import { Tab } from "@headlessui/react";
import Login from "./Login";
import Register from "./Register";


export default function Example() {


  return (
    <div className="">
      <Tab.Group>
        <Tab.List className=" tabs tabs-boxed navbar">
          <Tab
            className={({ selected }) => (
              selected
                ? "tab tab-active navbar-end"
                : "tab navbar-end"
            )}
          >
            <span>login</span>
          </Tab>
          <Tab
            className={({ selected }) => (
                selected
                ? "tab tab-active navbar-end"
                : "tab navbar-end"
                )}
                >
            <span>Register</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>{<Login/>}</Tab.Panel>
          <Tab.Panel>{<Register/>}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
              </div>
  );
}
