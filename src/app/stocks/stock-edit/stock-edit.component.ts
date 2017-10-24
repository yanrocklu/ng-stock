import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {StockService} from "../stock.service";

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {
  id: number;
  editMode = false;
  stockForm: FormGroup;

  constructor(
              //for getting route parameters
              private route: ActivatedRoute,
              private stockService: StockService,
              //for routing navigation
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // use + to convert string to number
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          //  call initForm whenever the route params change, because that indicates we reload the page.
          this.initForm();
          console.log(this.id);
          console.log(this.stockForm);
          console.log(this.stockForm.value);
          console.log(this.stockForm.valid);

        }
      )
  }

  private initForm() {
    let stockName = '';
    let stockCode = '';

    if (this.editMode) {
      const stock = this.stockService.getStock(this.id);
      stockName = stock.name;
      stockCode = stock.code;
    }

    this.stockForm = new FormGroup({
      'name': new FormControl(stockName, Validators.required),
      'code': new FormControl(stockCode, Validators.required)
    })
  }

  getStockForms() {
    return this.stockForm;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.editMode) {
      this.stockService.updateStock(this.id, this.stockForm.value);
    }
    else {
      this.stockService.addStock(this.stockForm.value);
    }
    this.onCancel();
  }

}
