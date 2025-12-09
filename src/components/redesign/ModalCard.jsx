import React from 'react'
import { useState } from 'react';
import { Modal } from 'antd';
import CardButton from './CardButton';

export default function ModalCard({title, sub_title, color, component, disabled = false}) {
    const defaultTitleStyle = "font-medium text-2xl text-center px-3";
    const defaultSubTitleStyle = "text-sm text-gray-600 text-center px-3";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    const setWidth = () => {
        if (title === "GSSM") {
          return 500; // Small width
        }
        return 700; // Default width if no type is set
    };

    const componentItem = component.map((data) => {
        const titleLowerCase = data.title.toLowerCase();
        return(
            <CardButton title={data.title} sub_title={data.sub_title} color="bg-bluegray" path={`/nmb_new/assy-${titleLowerCase}-realtime_new`}/>
        )    
    })

  return (
    <div 
        onClick={showModal}
        className={`w-full h-30 ${color} border border-gray-300 rounded-xl 
        flex flex-col items-center justify-center mb-5
        shadow-md transition-transform duration-500 ease-in-out transform 
        hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-300 
        ${disabled ? "cursor-not-allowed opacity-50 pointer-events-none bg-gray-300" : "cursor-pointer"}`}
        aria-disabled={disabled} >
        <div className={defaultTitleStyle}>{title}</div>
        <div className={defaultSubTitleStyle}>{sub_title}</div>
        <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        width={setWidth()}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        >
            <div>
                <div className="text-center">
                    <div className={defaultTitleStyle}>{title}</div>
                    <div className={defaultSubTitleStyle}>{sub_title}</div>
                </div>
                <div className="flex gap-5 mt-5 justify-center">
                    {componentItem}
                </div>
            </div>
        </Modal>
    </div>
  )
}
