export const queryKeys = {
  employee: { all: ['all'] },
  options: {
    contract: ['contract'],
    departments: ['departments'],
    positions: ['positions'],
    degree: ['degree'],
  },
  searchEmployee: (searchKeyword: string) => ['searchEmployee', searchKeyword],
}
