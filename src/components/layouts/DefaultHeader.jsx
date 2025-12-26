import React from 'react'

export default function DefaultHeader({plant}) {
  let header = '';
  let sub_header = '';
  if (plant === "nat"){
    header = "NAT"
    sub_header = "NMB Advanced Technology Bearing"
  }
  else if (plant === "nht"){
    header = "NHT"
    sub_header = "NMB Hi-Tech  Manufacturing Thailand"
  }
  else if (plant === "nmb"){
    header = "NMB-T"
    sub_header = "Ayuthaya Plant"
  }
  else if (plant === "pelmec"){
    header = "PELMEC-T"
    sub_header = "Precise Electric Machinery Element & Component"
  }
  else if (plant === "nhb"){
    header = "NHB"
    sub_header = "Hi-Tech Ball Bearing"
  }
  else if (plant === "mcb"){
    header = "MCB"
    sub_header = "Minebea Cambodia"
  }
  else if (plant === "dx"){
    header = "DX Bearing"
    sub_header = "Digital Transformation"
  }

  return (
    <div className="w-full h-14 bg-[#CCE1F9] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">{header}</h1>
        <p className="text-gray-500 text-[12px]">{sub_header}</p>
    </div>
  )
}
