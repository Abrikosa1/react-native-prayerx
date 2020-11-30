export type ListParams = {
  List: {
    name: {
      id?: string,
      title: string;
    }
  };
  EditProduct: {
    name: {
      id?: string,
      title: string;
    }
    submit?: React.MutableRefObject<() => void>;
  };
};
