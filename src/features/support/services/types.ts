export type RecordSupport = {
  FAQs: Array<{
    title: string;
    answer: string;
  }>;
  //   meta: {};
  email: string;
  phoneNumber: string;
  chat: string;
  id: number;
  updatedAt: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
};

export type DataSupportQuery = {
  support: RecordSupport;
};
