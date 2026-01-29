// src/components/ProductivityTable.tsx
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Link } from "lucide-react";
import { DataTable } from "@/components/DataTable/DataTable";
import type { Column } from "@/components/DataTable/DataTable";
import {
  userProductivityData,
  type UserProductivity,
} from "@/constants/RCMDashboardData";

export default function ProductivityTable() {
  const [, setAssignmentOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const rowsPerPageOptions = [5, 10, 15];

  // derived
  const totalPages = Math.max(
    1,
    Math.ceil(userProductivityData.length / rowsPerPage)
  );
  // handlers used by action buttons
  const handleUserClick = (userId: string) => {
    // implement navigation or modal show
    console.log("View assignments for", userId);
  };

  const handleViewAIPerformance = (userId: string) => {
    // implement navigation to AI performance
    console.log("View AI performance for", userId);
  };

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = userProductivityData.slice(start, end);

  const columns: Column<UserProductivity>[] = useMemo(
    () => [
      {
        key: "userName",
        label: "User",
        render: (_value, row) => {
          // avatar + name (no external avatar present, using fallback initials)
          const initials = row.userName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                {/* If you have avatars in data, use AvatarImage */}
                <AvatarImage src={undefined} alt={row.userName} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{row.userName}</div>
                <div className="text-xs text-muted-foreground">
                  {row.role} • {row.team}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: "tasksCompleted",
        label: "Tasks Completed",
        render: (value) => (
          <div className="text-sm font-medium">{String(value)}</div>
        ),
      },
      {
        key: "avgTimeToResolution",
        label: "Avg. Time to Resolve (hrs)",
        render: (value) => Number(value).toFixed(1),
      },
      {
        key: "userId",
        label: "Actions",
        className: "text-center",
        render: (_value, row) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUserClick(row.userId)}
              aria-label={`View assignments for ${row.userName}`}
            >
              View Assignments
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewAIPerformance(row.userId)}
              aria-label={`View AI Performance for ${row.userName}`}
            >
              <Link className="h-4 w-4 mr-1" aria-hidden="true" />
              AI Performance
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <DataTable<UserProductivity>
        data={paginatedData}
        columns={columns}
        searchEnabled
        searchTerm={""}
        onSearchChange={() => {}}
        // exportEnabled={true}
        // onExport={() => {
        //   // simple CSV export (demo)
        //   const csv = [
        //     ["userId", "userName", "tasksCompleted", "avgTimeToResolution", "team", "role"],
        //     ...userProductivityData.map((r) => [
        //       r.userId,
        //       r.userName,
        //       String(r.tasksCompleted),
        //       String(r.avgTimeToResolution),
        //       r.team,
        //       r.role,
        //     ]),
        //   ]
        //     .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
        //     .join("\n");
        //   const blob = new Blob([csv], { type: "text/csv" });
        //   const url = URL.createObjectURL(blob);
        //   const a = document.createElement("a");
        //   a.href = url;
        //   a.download = "user_productivity.csv";
        //   a.click();
        //   URL.revokeObjectURL(url);
        // }}
        idKey="userId"
        pageInfo={{
          currentPage,
          totalPages,
          onPageChange: (page: number) => {
            const next = Math.max(1, Math.min(totalPages, page));
            setCurrentPage(next);
          },
          rowsPerPage,
          onRowsPerPageChange: (value: number) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          },
          rowsPerPageOptions,
        }}
        assignmentFeature={{
          enabled: true,
          onAssign: (userId, selectedRowIds) => {
            console.log("Assign", userId, selectedRowIds);
            setAssignmentOpen(false);
          },
          users: [
            { id: "user-5", name: "Pamela Cruz" },
            { id: "user-6", name: "Pamela Turner" },
            // add more assignment users if needed
          ],
          quickActions: true,
          currentUserId: "user-11",
          onChangeStatus: (selectedRowIds) => {
            console.log("Change status for", selectedRowIds);
          },
          onWatchOptions: (selectedRowIds) => {
            console.log("Watch options for", selectedRowIds);
          },
          onDelete: (selectedRowIds) => {
            console.log("Delete", selectedRowIds);
          },
        }}
      />
    </div>
  );
}
