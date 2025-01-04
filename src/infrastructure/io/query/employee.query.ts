import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class EmployeesQuery {
  constructor(private readonly manager: EntityManager) {}

  async getStaffPositionGroup(employee: string): Promise<any> {
    return this.manager
      .query(
        `
      select
        distinct u.uuid,
        u.username,
        u.id as "employeeId",
        e.code as "employeeCode",
        e.full_name as "fullName",
        p.name as title,
        b.code as "branchCode",
        b.station as branch,
        pg.code as "positionGroup",
        pgt.name as "positionGroupType"
      from users u
      inner join employees e on e.user_id = u.id
      inner join v_org_chart_employees ocn on ocn.employee_id = u.id and ocn.active
      left join v_positions p on p.id = ocn.position_id
      left join (
        select
          oc.id,
          b.id as bid,
          b.code,
          bl.name as station,
          b.is_branch
        from branches b
        left join org_charts oc on b.id = oc.branch_id
        left join branch_locales bl on bl.branch_id = b.id and bl.locale = 'en'
      ) b on b.id = ocn.org_chart_id
      inner join position_has_groups phg on phg.position_id = ocn.position_id
      inner join position_groups pg on pg.id = phg.position_group_id
        and pg.status = 'APPROVED' and pg.active
      inner join position_group_has_types pght on pght.position_group_id = pg.id
      inner join position_group_types pgt on pgt.id = pght.type_id
        and pgt.status = 'APPROVED' and pgt.active
      where e.status = 'APPROVED'
        and u.uuid = '${employee}'
      `,
      )
      .then((results) => results[0]);
  }
}
