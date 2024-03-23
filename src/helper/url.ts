export function validateUrl(url: string): boolean {
  const regex: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return regex.test(url);
}
