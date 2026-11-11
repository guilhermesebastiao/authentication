export enum DeviceType {
  TABLET = "TABLET",
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
  OTHER = "OTHER",
}

export type SessionResponse = {
  id: string;
  name: string;
  type: DeviceType;
  lastSeenAt: string;
  location: string;
  ipAddress: string;
  isCurrent: boolean;
  createdAt: string;
};
