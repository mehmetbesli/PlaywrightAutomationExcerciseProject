export const testData = {
  // We generate a unique email and name suffix for each test run to ensure repeatable success
  signUp: {
    name: 'TestUser',
    emailPrefix: process.env.TEST_EMAIL_PREFIX || 'testuser',
    emailDomain: 'example.com',
    getPassword: () => process.env.TEST_PASSWORD || 'TestPass123!',
    title: 'Mr',
    dayOfBirth: '15',
    monthOfBirth: 'May',
    yearOfBirth: '1995',
    newsletter: true,
    optin: true,
  },
  address: {
    firstName: 'John',
    lastName: 'Doe',
    company: 'ACME Corp',
    address1: '123 Test Street',
    address2: 'Suite 400',
    country: 'United States', // Select dropdown option
    state: 'California',
    city: 'San Francisco',
    zipcode: '94107',
    mobileNumber: '+15551234567',
  },
  product: {
    searchQuery: 'Dress',
  },
  payment: {
    nameOnCard: 'John Doe',
    cardNumber: '4111222233334444',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2028',
  },
  orderComment: 'This is a test checkout comment for the automation suite.',
  invalidLogin: {
    email: 'nonexistent_user_9988@example.com',
    password: 'WrongPassword123!',
  },
};
