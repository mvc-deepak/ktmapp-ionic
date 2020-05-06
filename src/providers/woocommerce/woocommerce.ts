import { Injectable } from '@angular/core';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;
  WoocommerceV3: WooCommerceRestApi;

  constructor() {
    // this.Woocommerce = WooCommerceRestApi({
    //   url: "http://localhost:8001/ktmapp-dev",
    //   consumerKey: "ck_a3a0cd68d9d7a3808b4ff5ead04a529dbaf7580b",
    //   consumerSecret: "cs_5cec76df851c84a612798b5faaf4052fd6bf8c41"
    // });

    // this.WoocommerceV2 = WooCommerceRestApi({
    //   url: "http://localhost:8001/ktmapp-dev",
    //   consumerKey: "ck_a3a0cd68d9d7a3808b4ff5ead04a529dbaf7580b",
    //   consumerSecret: "cs_5cec76df851c84a612798b5faaf4052fd6bf8c41",
    //   wpAPI: true,
    //   version: "wc/v2"
    // });

    this.WoocommerceV3 = new WooCommerceRestApi({
      url: 'https://ktmapp.localhost.com',
      consumerKey: 'ck_1144cb67b05c0a452a5571ef0eadd3bb92f9f7db',
      consumerSecret: 'cs_5dd00cea5573794f47b72c8393cdf77585704b4b',
      version: 'wc/v3',
      queryStringAuth: true 
    });

  }

  // init(version?: string){
  //   alert (version);
  //   if(version == "v3"){
  //     return this.WoocommerceV3;
  //   } 
  //   else if(version == "v2"){
  //     return this.WoocommerceV2;
  //   } 
  //   else {
  //     return this.Woocommerce;
  //   }
  // }

}
