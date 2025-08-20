import * as React from "react";
import styles from "./SdsAccessPopup.module.scss";
import type { ISdsAccessPopupProps } from "./ISdsAccessPopupProps";
//import { escape } from "@microsoft/sp-lodash-subset";

export default class SdsAccessPopup extends React.Component<ISdsAccessPopupProps> {
  public render(): React.ReactElement<ISdsAccessPopupProps> {
    const { hasTeamsContext, items, sdsCode } = this.props;
    console.log("Items ....", this.props.items);
    return (
      <section
        className={`${styles.sdsAccessPopup} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
        {items?.length > 0 ? (
          <div className={`${styles.sdsAccessPopup}`}>
            <h1>SDS Access Account Found</h1>
            <p>You are receiving an inbound call from an SDS Access customer. The SDS Access code they entered was <strong>{sdsCode}</strong>. Links to the customer's 
            CRM Account record and SDS Emaiil Send Application are below:</p>
            <p>
              <strong>CCN:</strong> {items[0].AccountName}
            </p>
            <p>
              <strong>Account Name:</strong> {items[0].AccountName}
            </p>
            <p>
              <strong>SDS Access Code:</strong> {items[0].SDSAccessCode}
            </p>
            <p>
              <strong>SDS Admin:</strong>{" "}
              <a
                href="https://sharepoint.chemtrec.com/sdsaccess/admin"
                target="_blank"
              >
                SDS Admin
              </a>
            </p>
            <p>
              <strong>SDS Access Site:</strong>{" "}
              <a
                href={`https://sharepoint.chemtrec.com/sdsaccess/${items[0].Title}`}
                target="_blank"
              >
                {items[0].AccountName} SDS Site
              </a>
            </p>
            <p>
              <strong>CRM Account Record:</strong>{" "}
              <a href={`${items[0].CRMAccountRecord}`} target="_blank">
                {items[0].AccountName} (CRM)
              </a>
            </p>
          </div>
        ) : (
          <div className={`${styles.sdsAccessPopup}`}>
            <h1>SDS Access code not entered or Account not Found</h1>
            <p>You are receiving an inbound call from a potential SDS Access customer. The SDS Access code they entered was <strong>{sdsCode}</strong>, but could not be verified in CRM.
            Please ask the caller to confirm their company name/code and then validate their SDS access status on their account in CRM. A link to the SDS Email Send application is below:</p>

            <p>
              <strong>SDS Access Code:</strong> {sdsCode}
            </p>
            <p>
              <strong>Search and Send SDS via Email:</strong>{" "}
              <a
                href="https://sharepoint.chemtrec.com/sdsaccess/admin/emailsds.aspx"
                target="_blank"
              >
                SDS Admin
              </a>
            </p>
          </div>
        )}
      </section>
    );
  }
}
