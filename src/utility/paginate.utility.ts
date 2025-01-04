/**
 * From query sort formatted string to object of sort
 * @param sort query sort string formatted key:order
 * @param defaultSort default sort key
 * @returns object of sortBy and orderBy
 */
export function fromSort(
  sort: string,
  defaultSort: string,
  selected?: string[],
  defaultOrder = 'desc',
): { sortBy: string; orderBy: string } {
  const [sortBy = defaultSort, orderBy = defaultOrder] = sort?.split(':') || [];
  if (!!selected && !selected.includes(sortBy)) {
    return { sortBy: defaultSort, orderBy };
  }
  return { sortBy, orderBy };
}

export const fromPaginate = (
  page: number | string | any,
  size: number | string | any,
): { skip: number; take: number; page: number; size: number } => {
  return {
    skip: (+size || 25) * ((+page || 1) - 1),
    take: +size || 25,
    page: +page || 1,
    size: +size || 25,
  };
};
