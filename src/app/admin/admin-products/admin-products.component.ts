import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTER_CONFIGURATION } from '@angular/router';
//import { DataTableResource } from 'angular-4-data-table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit,OnDestroy{
  products$:any;
  product:any[];
  filteredProducts:any[];
  subscription:Subscription;
  tableResource:MatTableDataSource<Product>;
  items:Product[];
  itemCount:number;
  displayedColumns:string[]=['title','price','edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productService:ProductService) {
    //this.products$=this.productService.getAll();
    this.subscription=this.productService.getAll().subscribe(x=>{
      this.filteredProducts=this.products$=x;
      this.tableResource=new MatTableDataSource(this.products$);
      //this.initializeTable(this.products$);
      
      this.ngAfterViewInit();
    }
    );
    
   }
  //  private initializeTable(products:Product[]){
  //   this.tableResource=new DataTableResource(this.products$);
  //   this.tableResource.query({offset:0})
  //     .then(items=>this.items=items);
  //   this.tableResource.count()
  //     .then(count=>this.itemCount=count);
  //  }
  ngAfterViewInit(){
    if (this.tableResource) {
      this.tableResource.paginator=this.paginator;
      this.tableResource.sort=this.sort;
    }
    
  }
   filter(query:string){
     this.filteredProducts=(query) ?
      this.products$.filter((p:any)=>p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products$;
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableResource.filter = filterValue.trim().toLowerCase();

    if (this.tableResource.paginator) {
      this.tableResource.paginator.firstPage();
    }
  }
  //  reloadItems(params:any){
  //    if(!this.tableResource) return;
  //    else this.tableResource.query(params)
  //   .then(items=>this.items=items);
  //  }
  

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
