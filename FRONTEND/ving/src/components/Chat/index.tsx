'use clinet'

import React from "react";
import SideBar from "../SideBar/SideBar";

export default function Chat() {
  return (
    <div>
      <SideBar 
        title="채팅" 
        side="right"
        initOpen={true}
        width={300}
      >

      </SideBar>
    </div>
  )
}