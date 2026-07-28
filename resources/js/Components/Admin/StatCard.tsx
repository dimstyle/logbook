import React from "react";

interface StatCardProps{
    title: string;
    value: number | string;
    bgColor?: string;
    textColor?: string;
}

export default function StatCard({title,value, bgColor = "bg-white", textColor = "text-black"}: StatCardProps) {
    return(
            <div className={`p-5 rounded-xl shadow-sm border boder-gray-100 flex flex-col gap-2 ${bgColor}`}>
            <span className="text-sm font-medium text-black">{title}</span>
            <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
        </div>
    )
}