import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { DataTable, type Column } from "@/components/DataTable/DataTable";
import { mockSplitData, mockClassifications } from "@/constants/CDMData";

interface SplitManagerProps {
  onApply: () => void;
  onClose: () => void;
}

export const SplitManager = ({ onApply, onClose }: SplitManagerProps) => {
  const [splits, setSplits] = useState(mockSplitData);
  const [newPageRange, setNewPageRange] = useState("");
  const [newCategory, setNewCategory] = useState("Acknowledgement");
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (index: number) => {
    setSplits(splits.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (!newPageRange) return;
    setSplits([
      ...splits,
      {
        letterId: Date.now(),
        classificationType: newCategory,
        pageRange: newPageRange,
      },
    ]);
    setNewPageRange("");
    setNewCategory("Acknowledgement");
    setIsAdding(false);
  };

  const columns: Column<any>[] = [
    {
      key: "pageRange",
      label: "Range",
      render: (_value, row) => {
        return (
          <Input
            value={row.pageRange}
            onChange={(e) => {
              const newSplits = splits.map((s) =>
                s.letterId === row.letterId
                  ? { ...s, pageRange: e.target.value }
                  : s
              );
              setSplits(newSplits);
            }}
            className="h-8 w-full"
          />
        );
      },
    },
    {
      key: "classificationType",
      label: "Classification",
      render: (_value, row) => {
        return (
          <select
            className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={row.classificationType}
            onChange={(e) => {
              const newSplits = splits.map((s) =>
                s.letterId === row.letterId
                  ? { ...s, classificationType: e.target.value }
                  : s
              );
              setSplits(newSplits);
            }}
          >
            {mockClassifications.map((c) => (
              <option key={c.id} value={c.classificationType}>
                {c.classificationType}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      key: "actions",
      label: "",
      render: (_value, row) => {
        const idx = splits.findIndex((s) => s.letterId === row.letterId);
        return (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
            onClick={() => handleDelete(idx)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full border-l bg-white w-full max-w-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-lg">Manage Document Splitting</h3>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="border rounded-md">
          <DataTable data={splits} columns={columns} idKey="letterId" />
        </div>

        <div className="space-y-4">
          <div
            className="flex items-center gap-2 font-medium cursor-pointer text-blue-600"
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            Add New Split
          </div>

          {isAdding && (
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md border">
              <Input
                placeholder="Page (e.g. 1-3)"
                value={newPageRange}
                onChange={(e) => setNewPageRange(e.target.value)}
                className="w-24 bg-white"
              />
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 bg-white"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {mockClassifications.map((c) => (
                  <option key={c.id} value={c.classificationType}>
                    {c.classificationType}
                  </option>
                ))}
              </select>
              <Button size="sm" onClick={handleAdd} disabled={!newPageRange}>
                Add
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t bg-slate-50 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onApply}>Apply Splitting</Button>
      </div>
    </div>
  );
};
