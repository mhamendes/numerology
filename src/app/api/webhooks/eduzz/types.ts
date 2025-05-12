export type EduzzEvent = {
  id: string;
  event: string;
  data: {
    id: string;
    status: string;
    buyer: {
      id: string;
      name: string;
      document: string;
      email: string;
      phone?: string;
      phone2?: string;
      cellPhone?: string;
      address: {
        street?: string;
        number?: string;
        neighborhood?: string;
        complement?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
      };
    };
    producer: {
      id: string;
      name: string;
      email: string;
      originSecret: string;
    };
    utm?: {
      source?: string;
      campaign?: string;
      medium?: string;
      content?: string;
    };
    tracker?: {
      code1?: string;
      code2?: string;
      code3?: string;
    };
    createdAt: string;
    dueDate: string;
    barcode?: string;
    price: {
      currency: string;
      value: number;
      paid: {
        currency: string;
        value: number;
      };
    };
    installments: number;
    items: {
      productId: string;
      name: string;
      parentId?: string;
      refundPeriod: {
        durationType: string;
        value: number;
      };
      price: {
        currency: string;
        value: number;
        coupon?: {
          id?: string;
          key?: string;
          discount?: {
            currency?: string;
            value?: number;
          };
        };
      };
      partnerId?: string;
      billingType: string;
      skuReference: string;
    }[];
    totalItems: number;
    billetUrl?: string;
    checkoutUrl: string;
    bankslipUrl?: string;
    affiliate: {
      id: string;
      name: string;
      email: string;
    };
    paidAt?: string;
    paymentMethod: string;
    transaction?: {
      id: string;
      key: string;
    };
    student?: {
      id: string;
      name: string;
      document?: string;
      email: string;
      phone?: string;
      phone2?: string;
      cellPhone?: string;
    };
    chargeback?: {
      status: string;
      createdAt: string;
      limitDate?: string;
      finishedAt?: string;
    };
  };
  sentDate: string;
};
