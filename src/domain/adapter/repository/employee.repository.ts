import { EmployeeView } from '@infrastructure/io/entity/employee.entity';

export const EMPLOYEE_REPOSITORY = 'EMPLOYEE_REPOSITORY';

export interface IEmployeeRepository {
  /**
   * Get an employee
   * @param id
   */
  findById(id: number): Promise<EmployeeView>;
  /**
   * Get an employee
   * @param employee uuid
   */
  findEmployee(uuid: string): Promise<EmployeeView>;
}
