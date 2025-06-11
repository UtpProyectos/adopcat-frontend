// components/OrganizationDashboard.tsx
"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

import { useOrganization } from "@/context/OrganizationContext"
import { useEffect, useState } from "react"
import { catService } from "@/services/cats"
import { adoptionService } from "@/services/adoption" 
import { AdoptionResponse } from "@/models/adoption"
import { CatResponse } from "@/models/cat" 
import { organizationMemberService } from "@/services/organizationMember"
import { MemberResponse } from "@/models/organizationMember"
import { IconUsers, IconCat, IconInbox, IconBellRinging } from "@tabler/icons-react"

export default function OrganizationDashboard() {
  const { organization, loading } = useOrganization()
  const [cats, setCats] = useState<CatResponse[]>([])
  const [requests, setRequests] = useState<AdoptionResponse[]>([])
  const [members, setMembers] = useState<MemberResponse[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [timeRange, setTimeRange] = useState("90d")

  useEffect(() => {
    if (!organization?.organizationId) return

    const fetchData = async () => {
      try {
        const [catsRes, reqsRes, membersRes] = await Promise.all([
          catService.getAllCatsOrganization(organization.organizationId),
          adoptionService.getOrgRequests(organization.organizationId),
          organizationMemberService.getActiveMembers(organization.organizationId),
        ])
        setCats(catsRes.data)
        setRequests(reqsRes.data)
        setMembers(membersRes.data)
      } catch (err) {
        console.error("Error cargando dashboard", err)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [organization?.organizationId])

  if (loading || loadingData) return <div className="text-center py-10">Cargando...</div>

  const adoptedCats = cats.filter((c) => c.status === "ADOPTED")
  const pendingRequests = requests.filter((r) => r.status === "PENDING")

  const requestsByDay = requests.reduce<Record<string, number>>((acc, r) => {
    const day = new Date(r.submittedAt).toISOString().split("T")[0] // yyyy-mm-dd
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})

  const areaData = Object.entries(requestsByDay)
    .map(([date, count]) => ({ date, count }))
    .filter(({ date }) => {
      const current = new Date()
      const target = new Date(date)
      const diffTime = current.getTime() - target.getTime()
      const diffDays = diffTime / (1000 * 3600 * 24)
      if (timeRange === "7d") return diffDays <= 7
      if (timeRange === "30d") return diffDays <= 30
      return true // 90d default
    })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard de {organization?.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <CardStat title="Solicitudes nuevas" icon={<IconBellRinging size={32} />} value={pendingRequests.length.toString()} highlight />
        <CardStat title="Solicitudes" icon={<IconInbox size={32} />} value={requests.length.toString()} />
        <CardStat title="Miembros" icon={<IconUsers size={32} />} value={members.length.toString()} />
        <CardStat title="Gatos registrados" icon={<IconCat size={32} />} value={cats.length.toString()} />
        <CardStat title="Gatos adoptados" icon={<IconCat size={32} />} value={adoptedCats.length.toString()} />
      </div>

      <Card className="pt-0 bg-body rounded-xl shadow-primary border-0 dark:bg-neutral-800">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Solicitudes por día</CardTitle>
            <CardDescription>
              Cantidad de solicitudes recibidas en los últimos días
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange} >
            <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex bg-body dark:bg-neutral-800 border-1 border-gray-100 dark:border-neutral-700 shadow-xs">
              <SelectValue placeholder="Últimos 90 días" />
            </SelectTrigger>
            <SelectContent className="rounded-xl  bg-body dark:bg-neutral-800 border-1 border-gray-100  dark:border-neutral-700 shadow-md">
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={{ count: { label: "Solicitudes", color: "var(--chart-1)" } }}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("es-PE", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="count"
                type="monotone"
                fill="url(#fillColor)"
                stroke="var(--chart-1)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

const CardStat = ({ title, icon, value, highlight = false }: { title: string; icon: React.ReactNode; value: string; highlight?: boolean }) => (
  <div className={`rounded-xl shadow-primary p-4 flex items-center gap-4 ${highlight ? "bg-warning text-warning-foreground" : "bg-body text-card-foreground dark:bg-neutral-800"}`}>
    <div className={`p-2 rounded-full ${highlight ? "bg-warning/10" : "bg-primary/10 text-primary"}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
)
