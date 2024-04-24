import React from "react";

import { FaRegBell } from "react-icons/fa";
import * as styles from './index.css'
import IconButton from "../Button/IconButton";


export default function Notifer() {
  return (
    <div>
      <IconButton icon={FaRegBell} />
    </div>
  )
}