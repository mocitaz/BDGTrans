export interface PartnerItem {
  id: string;
  name: string;
  logo?: string;
  verified: boolean;
  permissionGranted: boolean;
}

export const partners: PartnerItem[] = [];
