import CustomerSide from '../../../components/CustomerSide/CustomerSide'
import { useSession } from '../../../contexts/SessionContext'
import { useEffect, useMemo, useState, useCallback } from "react";

const Customer = () => {
    const { user } = useSession();

    useEffect (() => {
        console.log(user)
    }, [user])

    return (
        <div className="">
            <div className="grid grid-cols-12 gap-x-4 lg:gap-x-16">
                <CustomerSide />
                <div className="col-span-9">
                    <h1 className="text-xl lg:text-3xl text-center py-8">ข้อมูลของฉัน</h1>
                    <div className="grid grid-cols-12 gap-x-8">
                        <div className="col-span-12 lg:col-span-6 border border-gray-300 p-4">
                            <div className="flex justify-between">
                                <span className="font-bold text-xs lg:text-base">ข้อมูลส่วนตัว</span>
                                <span className="underline text-gray-400 font-light text-xs lg:text-base">แก้ไข</span>
                            </div>
                            <div className="grid grid-cols-12 pt-4">
                                <div className="col-span-4">
                                    <span className="text-xs lg:text-base">ชื่อ : </span>
                                </div>
                                <div className="col-span-8">
                                    <span className="text-xs lg:text-base">{user.firstname} {" "} {user.lastname}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 pt-4">
                                <div className="col-span-4">
                                    <span className="text-xs lg:text-base">อีเมล์ : </span>
                                </div>
                                <div className="col-span-8">
                                    <span className="text-xs lg:text-base">ongsuwannoo@gmail.com</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 pt-4">
                                <div className="col-span-4">
                                    <span className="text-xs lg:text-base">เบอร์โทรศัพท์ : </span>
                                </div>
                                <div className="col-span-8">
                                    <span className="text-xs lg:text-base">0824200568</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6 border border-gray-300 p-4">
                            <div className="flex justify-between">
                                <span className="font-bold text-xs lg:text-base">ที่อยู่จัดส่งปัจจุบัน</span>
                                <span className="underline text-gray-400 font-light text-xs lg:text-base">แก้ไข</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Customer;