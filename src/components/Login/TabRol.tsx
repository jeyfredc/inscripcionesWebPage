import { Tab } from '@headlessui/react'

interface TabRole {
    role: string;
}

const TabRole = ({role}: TabRole) => {

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


  return (
    <Tab
      className={({ selected }) =>
        classNames(
          'w-full py-2.5 text-sm leading-5 font-medium rounded-md',
          'focus:outline-none',
          selected
            ? 'bg-white shadow text-blue-700'
            : 'text-blue-600 hover:bg-white/[0.12] hover:text-blue-800'
        )
      }
    >
      {role}
    </Tab>
  )
}

export default TabRole