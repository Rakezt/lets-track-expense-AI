export enum ExpenseCategory {
  FOOD_DINING = 'Food & Dining',
  GROCERIES = 'Groceries',
  TRANSPORTATION = 'Transportation',
  RENT = 'Rent',
  HEALTH_MEDICAL = 'Health & Medical',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  TRAVEL = 'Travel',
  EDUCATION = 'Education',
  PERSONAL_CARE = 'Personal Care',
  OTHER = 'Other',
}

export enum PaymentMode {
  CASH = 'Cash',
  UPI = 'UPI',
  INTERNET_BANKING = 'Internet Banking',
  CREDIT_CARD = 'Credit Card',
}
export interface Expense {
  _id: string;
  user: string;
  amount: number;
  category: ExpenseCategory;
  description?: string;
  paymentMode: PaymentMode;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}
