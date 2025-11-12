export default function getValidTokenFromStorage(): string {
  const token = sessionStorage.getItem("jwt");

  return token ?? "";
}
