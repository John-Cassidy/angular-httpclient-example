export interface Policy {
  id: number;
  policyNumber: string;
  creationDate: Date;
  expireDate: Date;
  policyAmount: number;
  clientId: number;
  employeeId: number;
}
