import React from 'react'
import {Sidebar,SidebarItem} from '../Components/Sidebar'
import { FaHome } from 'react-icons/fa'
import { MdGroupAdd } from 'react-icons/md'
import { RiContractLine } from 'react-icons/ri'
import { BiSolidReport } from 'react-icons/bi'
import { SiGoogleads } from 'react-icons/si'
import { PiProjectorScreenChartDuotone } from 'react-icons/pi'
function Dashboard() {
  return (
    <div className='flex'>
      <Sidebar>
        <SidebarItem text='Home' icon={<FaHome />} />
        <SidebarItem alert={true} text='Meeting' icon={<MdGroupAdd />} />
        <SidebarItem text='Project' icon={<PiProjectorScreenChartDuotone />} />
        <SidebarItem text='Contract' icon={<RiContractLine />} />
        <SidebarItem text='Reports' icon={<BiSolidReport />} />
        <SidebarItem active={true} text='Leads' icon={<SiGoogleads />} />
      </Sidebar>
    </div>
  )
}

export default Dashboard
