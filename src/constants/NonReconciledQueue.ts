interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage mockup",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Implement authentication",
    status: "To Do",
    priority: "High",
    assignee: "Jane Smith",
  },
  {
    id: "3",
    title: "Write API documentation",
    status: "In Progress",
    priority: "Medium",
    assignee: "Bob Johnson",
  },
  {
    id: "4",
    title: "Fix mobile responsiveness",
    status: "Done",
    priority: "Low",
    assignee: "Alice Brown",
  },
  {
    id: "5",
    title: "Add dark mode support",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie Wilson",
  },
];
