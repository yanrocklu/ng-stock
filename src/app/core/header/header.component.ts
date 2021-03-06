import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {DataStorageService} from "../../services/data-storage.service";
import {AuthService} from "../../auth/auth.service";
// import {Ng2PopupComponent, Ng2MessagePopupComponent} from "ng2-popup";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ViewChild(Ng2PopupComponent) popup:Ng2PopupComponent;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSaveData() {
    // dataStorageService.saveStocks() returns an observable, so need to subscribe to use the response
    this.dataStorageService.saveStocks()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    // openPopup();
  }

  // using a ng2-popup lib to create the popup when saving the data,  https://www.npmjs.com/package/ng2-popup

  // there's no systemjs.config.js file, error "Cannot find module 'ng2-overlay'"
  // openPopup(){
  //   this.popup.open(Ng2MessagePopupComponent, {
  //     title: 'Save Data',
  //     message: 'Data saved successfully!',
  //     buttons: {
  //       OK: () => {
  //         this.popup.close();
  //       }
  //     }
  //   })
  // }

  onFetchData() {
    this.dataStorageService.fetchStocks();
  }

  onLogout() {
    this.authService.logOut();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
