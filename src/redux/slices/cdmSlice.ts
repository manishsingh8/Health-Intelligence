import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CDMDocument } from "@/pages/CDM/CDMDashboard.hook";

interface CdmState {
  payloadData: any;
  letterListTableData: CDMDocument[];
  selectedUsers: any[];
  selectedCategories: any[];
  selectedStatus: any[];
  selectedTagsFilter: any[];
  totalNoOfDocs: number;
  usersListForAssign: any[];
  availableTags: string[];
  currentTags: string[];
  data: any;
  selectedUserAssigned: any;
  editClick: boolean;
}

const initialState: CdmState = {
  payloadData: {
    pageNumber: 1,
    pageSize: 10,
    fromDate: "",
    toDate: "",
    processedFromDate: "",
    processedToDate: "",
    classificationType: [],
    category: [],
    assigneeId: [],
    statusId: [],
    searchType: "",
    searchValue: "",
  },
  letterListTableData: [],
  selectedUsers: [],
  selectedCategories: [],
  selectedStatus: [],
  selectedTagsFilter: [],
  totalNoOfDocs: 0,
  usersListForAssign: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Robert Wilson" },
    { id: 4, name: "Sarah Johnson" },
    { id: 5, name: "Michael Brown" },
    { id: 6, name: "Emily Davis" },
    { id: 7, name: "Chris Miller" },
    { id: 8, name: "Amanda Lee" },
  ],
  availableTags: ["Urgent", "Review Required", "Follow-up", "Pending Info", "Completed", "Escalated"],
  currentTags: [],
  data: {},
  selectedUserAssigned: null,
  editClick: false,
};

const cdmSlice = createSlice({
  name: "cdm",
  initialState,
  reducers: {
    setPayload: (state, action: PayloadAction<any>) => {
      state.payloadData = action.payload;
    },
    setLetterListTableData: (state, action: PayloadAction<any[]>) => {
      state.letterListTableData = action.payload;
    },
    setTotalNoOfDocs: (state, action: PayloadAction<number>) => {
      state.totalNoOfDocs = action.payload;
    },
    setAvailableTags: (state, action: PayloadAction<string[]>) => {
      state.availableTags = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.currentTags = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setSelectedUserAssigne: (state, action: PayloadAction<any>) => {
      state.selectedUserAssigned = action.payload;
    },
    setUsersListForAssign: (state, action: PayloadAction<any[]>) => {
      state.usersListForAssign = action.payload;
    },
    setEditClick: (state, action: PayloadAction<boolean>) => {
      state.editClick = action.payload;
    },
  },
});

export const {
  setPayload,
  setLetterListTableData,
  setTotalNoOfDocs,
  setAvailableTags,
  setTags,
  setData,
  setSelectedUserAssigne,
  setUsersListForAssign,
  setEditClick,
} = cdmSlice.actions;

export default cdmSlice.reducer;
