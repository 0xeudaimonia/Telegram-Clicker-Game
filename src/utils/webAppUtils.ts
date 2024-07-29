import WebApp from "@twa-dev/sdk";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  Username: string;
  languageCode: string;
}

export function getUserData(): UserData | undefined {
  if (typeof window !== 'undefined') {
    return WebApp.initDataUnsafe.user as UserData | undefined;
  }
  return undefined;
}
