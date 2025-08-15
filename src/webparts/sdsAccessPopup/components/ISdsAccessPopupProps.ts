import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISdsAccessPopupProps {
  description: string; 
  hasTeamsContext: boolean;
  sdsCode: string | null;
  context: WebPartContext;
  items: any[];
}
