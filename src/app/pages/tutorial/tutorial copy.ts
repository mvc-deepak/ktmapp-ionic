import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides, NavController, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage1 {
  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  //ion
  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";

  @ViewChild('productSlides') productSlides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,

    //ion
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    private WP: WoocommerceProvider
    
  ) {
    this.page = 2;

    this.WooCommerce = WP.init();

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })
  }

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/schedule', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }


  //woo
  // ionViewDidLoad(){
  //   setInterval(()=> {

  //     if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
  //       this.productSlides.slideTo(0);

  //     this.productSlides.slideNext();
  //   }, 3000)
  // }

  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        // this.toastCtrl.create({
        //   message: "No more products!",
        //   duration: 5000
        // }).present();

      }


    }, (err) => {
      console.log(err)
    })
  }

  openProductPage(product){
    //this.navCtrl.push('ProductDetails', {"product": product} );
  }

  onSearch(event){
    if(this.searchQuery.length > 0){
      //this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
    }
  }
}
