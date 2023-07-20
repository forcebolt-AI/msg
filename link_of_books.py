policy_files = {
    "Call Out, Attendance, and Timekeeping Policy.pdf":
            ["attendance", "timekeeping", "first", "warning", "termination", "clock in", "clock out"],

    "HCP Competency Testing Policy.pdf":
            ["active candidates", "new hire" , "rehire candidates"],

    "INTERNAL DOCUMENT - Responsible Use of Generative AI Policy.pdf":
            ["ai policy", "chat gpt"],

    "MSG Staffing Employee Handbook.pdf":
            ["general employment", "employee handbook", "attendance", "after hours","clock in", "out policy", 
             "shift scheduling", "dress" ,"code", "performance", "care and support", "patient safety", "annual compliance",
             "pay", "cew", "reimbursement", "training", "ethical dilemma"],

    "Referral Bonus Policy.pdf":
            ["bonus", "referral"],

    "Standard External Dress Code Requirements.pdf":
            ["dress"],

    "Stipend _ Reimbursement Policy 11.2021.pdf":
            ["reimbursement"]

}

user_guide = {
    "EmployDrive Employee Self Service User_s Guide.pdf": 
            ["name", "address", "documents", "pay", "w2/aCa/1099", "forms", "training", "employee contacts", "deposits", "tax update", "benefit update"],
    
    "EmployDrive How to Access W2-ACA-1099 Forms.pdf":
            ["w2/aCa/1099" "forms", "form"],

     "EmployDrive How to View Paystubs.pdf":
            ["pay" "stubs","view pay stubs", "view pay stubs", "pay stubs"],

      "EmployDrive Tax Updates Wizard.pdf":
             ["tax updates"],

      "EmployDrive Time Off Balances - Employee View.pdf":
              ["time off balances", "time off"],

       "Facility Portal User Guide.pdf":
             ["first time logging in", "login", "first time","portal" ,"setup"] ,


        "Workforce Portal Setup Guide_1.pdf":
             ["first time logging in", "login", "first time", "password reset", "password", "forgot password", "forgot","portal" ,"setup"]     
    
}



files = [policy_files, user_guide]

def books_links(query):
  links = []
  for word in query.split():
    for file in files:
        for pdf, keywords in file.items():
                if word in keywords:
                        if pdf not in links:
                                links.append(pdf)

  return links