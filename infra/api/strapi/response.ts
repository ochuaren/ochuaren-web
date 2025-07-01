export interface IStrapiCollectionTypeResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IStrapiSingleTypeResponse<T> {
  data: T;
}
