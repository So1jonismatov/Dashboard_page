import { Box } from '@chakra-ui/react'
import React from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "./TopBar.css"

const TopBar = ({newAdress, newData}) => {
    const navigate = useNavigate();
  return (
    <Box className='phone-topbar'>
        <Box className='phone-topbar-el'
          onClick={() => navigate("/")}
          icon={<FaHome color="red" />}
        >
          Login page
        </Box>
        <Box className='phone-topbar-el'
          onClick={() => navigate(newAdress)}
          icon={<FaPlus color="red" />}
        >
          {newData}
        </Box>
    </Box>
  )
}

export default TopBar