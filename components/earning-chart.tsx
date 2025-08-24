"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = [
    { month: "Jan", newPatients: 45000, oldPatients: 50000 },
    { month: "Feb", newPatients: 40000, oldPatients: 48000 },
    { month: "Mar", newPatients: 52000, oldPatients: 45000 },
    { month: "Apr", newPatients: 48000, oldPatients: 52000 },
    { month: "May", newPatients: 50000, oldPatients: 48000 },
    { month: "Jun", newPatients: 55000, oldPatients: 58000 },
    { month: "Jul", newPatients: 52000, oldPatients: 55000 },
    { month: "Aug", newPatients: 58000, oldPatients: 52000 },
    { month: "Sep", newPatients: 60000, oldPatients: 48000 },
]

export function EarningChart() {
    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "New Patients",
                data: data.map((item) => item.newPatients),
                borderColor: "hsl(var(--chart-1))",
                backgroundColor: "hsl(var(--chart-1))",
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
            },
            {
                label: "Old Patients",
                data: data.map((item) => item.oldPatients),
                borderColor: "hsl(var(--chart-2))",
                backgroundColor: "hsl(var(--chart-2))",
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: $${(context.parsed.y / 1000).toFixed(0)}k`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "hsl(var(--border))",
                    drawBorder: false,
                },
                ticks: {
                    color: "hsl(var(--muted-foreground))",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "hsl(var(--border))",
                    drawBorder: false,
                },
                ticks: {
                    color: "hsl(var(--muted-foreground))",
                    font: {
                        size: 12,
                    },
                    callback: (value: any) => `$${value / 1000}k`,
                },
            },
        },
    }

    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">Earning Statistic</CardTitle>
                <Select defaultValue="this-month">
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="this-month">This Month</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-1"></div>
                        <span className="text-sm text-muted-foreground">New Patient: 50</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                        <span className="text-sm text-muted-foreground">Old Patient: 500</span>
                    </div>
                </div>
                <div className="h-80">
                    <Line data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    )
}
