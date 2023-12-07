export default class AppRoutes {
  // General Routes
  static Home = "/";

  // Auth Routes
  static SignUp = "/signup";
  static SignUpComplete = "signup/signup-complete";
  static SignUpCredentials = "/signup/user/credentials";
  static SignUpPersonal = "/signup/user/personal";
  static SignUpProfessional = "/signup/user/professional";
  static Login = "/login";

  // Dashboard Individual Routes
  static Expenses = "/dashboard/individual/expenses";
  static Reports = "/dashboard/individual/reports";
  static Inbox = "/dashboard/individual/inbox";
  static Settings = "/dashboard/individual/settings";
  static Support = "/dashboard/individual/support";

  // Dashboard Admin Routes
  static Users = "/dashboard/admin/users";
  static Claims = "/dashboard/admin/claims";
  static Outliers = "/dashboard/admin/outliers";

  // Other Routes
  static ContactForm = "/dashboard/individual/support/contact-form";
}
