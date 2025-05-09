"use client";
import { LayoutDashboard, UsersRound, ChartNoAxesColumn, BaggageClaim, Bike, Wallet } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: UsersRound,
  },
  {
    title: "Vendors",
    url: "/dashboard/vendors",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: BaggageClaim,
  },
  {
    title: "Riders",
    url: "/dashboard/riders",
    icon: Bike,
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: Wallet,
  },
];

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push("/");
  };

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-6 mb-14 px-5">
            <Image src="/Frame 2.svg" height={100} width={100} alt="pikup logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-[#1E1E1E] font-medium text-[17px] ps-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="p-3 hover:bg-[#FE76221A]"
                    onClick={() => handleNavigation(item.url)}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="profile mt-[80%] ps-2">
              <div className="flex gap-2 items-center">
                <Image src="/profile.svg" width={40} height={40} alt="pikup admin" className="rounded-full" />
                <div className="info">
                  <h4 className="font-semibold">Isaac Olawunmi</h4>
                  <span>Founder</span>
                </div>
              </div>
              <div className="logout ps-12 mt-4">
                <button onClick={handleLogout} className="text-[#E22727] font-medium">
                  Log out
                </button>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
