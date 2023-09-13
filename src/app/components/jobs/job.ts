export class Job {
    constructor(
      public JobId: Number,
      public JobTitle: String,
      public Description: String,
      public Location: Number,
      public Salary: Number,
      public CompanyId: Number,
      public CategoryId: Number,
      public ContractType: String,
      public Benefits: String,
      public ApplicationProcess: String,
      public ReportsTo: String,
      public Tags: String,
    ) {}
  }
  