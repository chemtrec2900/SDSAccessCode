import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SdsAccessPopupWebPartStrings';
import SdsAccessPopup from './components/SdsAccessPopup';
import { ISdsAccessPopupProps } from './components/ISdsAccessPopupProps';
import { SPServices } from '../../Services/SPServices';

export interface ISdsAccessPopupWebPartProps {
  description: string;
}

export default class SdsAccessPopupWebPart extends BaseClientSideWebPart<ISdsAccessPopupWebPartProps> {

  //private _isDarkTheme: boolean = false;
  items: any[];
  spService: SPServices;

  public render(): void {
    const searchParams = new URLSearchParams(window.location.search);
    const sdsCode = searchParams.get('sdscode');
    if (!sdsCode || sdsCode.trim() === "") {
      console.warn("SDS Access: sdsCode is null or empty.");
    } else {
      console.log("SDS Access log ...", sdsCode);
    }

    const element: React.ReactElement<ISdsAccessPopupProps> = React.createElement(
      SdsAccessPopup,
      {
        description: this.properties.description,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        sdsCode: sdsCode,
        context: this.context,
        items: this.items
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this.spService = new SPServices(this.context)
    const searchParams = new URLSearchParams(window.location.search);
    const sdsCode = searchParams.get('sdscode');
    if (!sdsCode || sdsCode.trim() === "") {
      console.warn("SDS Access: sdsCode is null or empty.");
    } else {
      console.log("SDS Access log ...", sdsCode);
    }
    return this.spService.readSharePointItems('SDS Phone Popup', `$filter=SDSAccessCode eq '${sdsCode}'`).then(data => {
      console.log("SDS Access data ...", data);
      return this.items = data;
    });
  }



  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
