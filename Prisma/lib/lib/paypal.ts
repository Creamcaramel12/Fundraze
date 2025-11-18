import * as paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
); // Switch to LiveEnvironment for production

export const paypalClient = new paypal.core.PayPalHttpClient(environment);
