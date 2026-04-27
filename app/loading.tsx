'use client'

import React from "react";
import "@/app/global-styles.css";

export default function Loading() {
    return(
        <div className='p-25 md:p-70 grid-cols-1 place-content-center'>
            <h3 className='text-slate-500 text-[100%] md:text-[180%]'>Загрузка контента</h3>
            <div className='text-center'>
                <span className='loaderA'></span>
            </div>
        </div>
    )
}