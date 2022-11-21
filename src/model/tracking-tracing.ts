export interface ITrackingAndTracing {
  riceTransaction: {
    name: string;
    buyer: string;
    saler: string;
    quantity: number;
    time: string;
  };
  productTransaction: {
    name: string;
    buyer: string;
    saler: string;
    quantity: number;
    time: string;
  };
}
