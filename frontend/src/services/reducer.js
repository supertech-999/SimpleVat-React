import { combineReducers } from 'redux'

import {
  AuthReducer,
  CommonReducer
} from './global'

import {
  Dashboard,
  BankAccount,
  Employee,
  Contact,
  Expense,
  GeneralSettings,
  Imports,
  Invoice,
  Product,
  Project,
  Purchase,
  Taxes,
  TransactionCategory,
  User,
  VatCategory,
  Currency,
  Help,
  Notification,
  OrganizationProfile,
  UsersRoles,
  DataBackup
} from 'screens'


const reducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,

  dashboard: Dashboard.reducer,
  bank: BankAccount.reducer,
  employee: Employee.reducer,
  contact: Contact.reducer,
  expense: Expense.reducer,
  settings: GeneralSettings.reducer,
  imports: Imports.reducer,
  invoice: Invoice.reducer,
  product: Product.reducer,
  project: Project.reducer,
  purchase: Purchase.reducer,
  taxes: Taxes.reducer,
  transaction: TransactionCategory.reducer,
  user: User.reducer,
  vat: VatCategory.reducer,
  currency: Currency.reducer,
  help: Help.reducer,
  notification: Notification.reducer,
  organization_profile: OrganizationProfile.reducer,
  users_roles: UsersRoles.reducer,
  data_backup: DataBackup.reducer
})

export default reducer