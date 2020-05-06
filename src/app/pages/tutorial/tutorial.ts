import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { WoocommerceProvider } from '../../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {

  showSkip = true;
  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";

  @ViewChild('productSlides') productSlides: IonSlides;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    private WP: WoocommerceProvider,
    private toastCtrl: ToastController) {

    this.page = 10;

    this.loadMoreProducts(null);
    this.getWooData();
    this.presentToast();

  }

  getWooData() {

    this.WP.WoocommerceV3.get("products", {
      // per_page: 20, // 20 products per page
    })
      .then((response) => {
        this.products = response.data;
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        console.log("Response Data:", response.data);
        console.log("Total of pages:", response.headers['x-wp-totalpages']);
        console.log("Total of items:", response.headers['x-wp-total']);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // Always executed.
      });
  }

  loadMoreProducts(event) {

    console.log(event);
    if (event == null) {
      this.page = 10;
      this.moreProducts = [];
    }
    else
      this.page++;

    setTimeout(() => {

      this.WP.WoocommerceV3.get("products", {
        per_page: this.page, // 20 products per page
      })
        .then((response) => {
          this.products = response.data;
          this.moreProducts = this.moreProducts.concat(response.data);
          if (event != null) {
            event.target.complete(); // this is how you need to call in v4
          }

          if ((response.data).length < 10) {
            event.enable(false);
            this.presentToast();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // Always executed.
        });
    }, 500);
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      header: "toast header",
      message: 'No more products!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

