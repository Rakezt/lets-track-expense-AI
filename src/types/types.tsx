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
}
export interface Expense {
  _id: string;
  user: string; // or a populated user object if you're using population
  amount: number;
  category: ExpenseCategory;
  description?: string;
  paymentMode: PaymentMode;
  date: string; // or Date depending on where it's used
  createdAt?: string;
  updatedAt?: string;
}
