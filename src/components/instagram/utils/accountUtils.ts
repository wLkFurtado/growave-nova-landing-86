
// Utility functions for Instagram account types

export const getAccountTypeLabel = (
  isBusinessAccount: boolean = false,
  businessCategoryName: string = '',
  isPrivate: boolean = false
): string => {
  if (isBusinessAccount) {
    return businessCategoryName 
      ? `Conta Profissional (${businessCategoryName.replace('None,', '')})`
      : "Conta Profissional";
  }
  return isPrivate ? "Conta Privada" : "Conta Pessoal";
};
