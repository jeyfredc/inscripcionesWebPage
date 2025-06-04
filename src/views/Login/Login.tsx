import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import TabRole from '../../components/Login/TabRol'
import FormLogin from '../../components/Login/FormLogin'
import LoginHead from '../../components/Login/LoginHead'



const Login = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <LoginHead title="Iniciar Sesión">

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex p-1 space-x-1 bg-blue-100 rounded-lg">
            <TabRole role="Estudiante" />
            <TabRole role="Profesor" />

          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
                <FormLogin />
            </Tab.Panel>

            <Tab.Panel>
                <FormLogin />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
    </LoginHead>
  )
}

export default Login