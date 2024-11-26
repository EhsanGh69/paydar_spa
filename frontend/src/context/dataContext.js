import { createContext } from "react";

export const DataContext = createContext({
  loading: false,
  setLoading: () => {},
  data: {},
  allData: [],
  paginatedData: [],
  setPaginatedData: () => {},
  allDataCount: 0,
  getData: () => {},
  getFilteredData: () => {},
  app: "",
  model: "",
  pageSize: 0,
  currentPage: 1,
  setCurrentPage: () => {},
  orderingFields: [],
  getOrderedData: () => {},
  orderingField: "",
  setOrderingField: () => {},
  activeFields: [],
  selectiveFields: [],
  contentRef: null,
  showActionBtns: true,
  setShowActionBtns: () => {},
  downloadExcel: () => {}
});