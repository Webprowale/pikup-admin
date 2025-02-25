"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TrendingUp } from "lucide-react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { API_URL } from "@/lib/config";

const chartConfig = {
  vendors: {
    label: "Vendors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function VendorComponent() {
  const [totalVendors, setTotalVendors] = useState<number | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) {
          throw new Error("No auth token found");
        }

        const response = await fetch(`${API_URL}/user/get-restaurants`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setTotalVendors(data.length);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setTotalVendors(0);
      }
    };

    fetchVendors();
  }, []);

  const chartData = [
    { category: "vendors", count: totalVendors ?? 0, fill: "var(--color-vendors)" },
  ];

  return (
    <Card className="flex flex-col bg-[#ECECEC]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Vendors</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} startAngle={0} endAngle={250} innerRadius={80} outerRadius={110}>
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted last:fill-background" polarRadius={[86, 74]} />
            <RadialBar dataKey="count" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {totalVendors !== null ? totalVendors.toLocaleString() : "00"}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Vendors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 3.8% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total vendors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
