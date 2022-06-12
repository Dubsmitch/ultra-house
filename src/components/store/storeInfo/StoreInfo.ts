export const StoreInfo: Array<ProductType> = [
  {
    testMode: true,
    productName: 'Small House Donation',
    description: 'This is a one time donation tp support the Ultra House',
    cost: '$10.00',
    paymentLinkText: 'Support the House',
    paymentLink: 'https://buy.stripe.com/test_aEU8ys1Gh1Vh2eQeUU'
  }
]

export interface ProductType {
  testMode?: boolean;
  productName: string;
  description: string;
  cost: string | number;
  paymentLinkText: string;
  paymentLink: string;
}
