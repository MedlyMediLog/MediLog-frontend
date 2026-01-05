import sidebar from "@/assets/sidebar.png"
import Image from "next/image"
import home from "@/assets/home.png"

export default function SideBar() {
    return(
        <div className="w-20 h-270 bg-[#edf2f6] sticky top-0 border-r border-[#c1cad6]  flex flex-col">
            <div className="py-4 px-5 h-20 w-full">
                <button className="p-2 gap-2">
                    <div className="w-6 h-6 relative shrink-0">
                        <Image src={sidebar} fill alt="sidebar" className="object-contain"/>
                    </div>
                </button>
            </div>

            <div className="flex flex-col px-5 gap-10 items-center">
                <button className="gap-2.5 cursor-pointer">
                    <div className="w-6 h-6 relative shrink-0">
                        <Image src={home} fill alt="home" className="object-contain"/>
                    </div>
                </button>
            </div>
        </div>
    )

}