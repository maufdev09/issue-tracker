"use client";
import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Status } from "./generated/prisma/enums";

interface issueChartProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: issueChartProps) => {
  const data = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    { label: "In Progress", value: inProgress, status: Status.IN_PROGRESS },
    { label: "Closed", value: closed, status: Status.CLOSED },
  ];
  return (
    <div>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar dataKey="value"  barSize={60} fill='#279888'/>
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default IssueChart;
