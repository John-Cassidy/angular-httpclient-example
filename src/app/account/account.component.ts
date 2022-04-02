import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Account as MyAccount } from '../account';
import { DataService } from '../data.service';
import { HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<MyAccount> =
    new MatTableDataSource<MyAccount>();
  tableColumns: string[] = ['accountNumber', 'availableCash'];

  params = {
    sortField: 'accountNumber',
    sortOrder: 'asc', //'asc', 'desc'
    pageNumber: 1,
    pageSize: 3,
  };

  private _showLoadMoreButton: boolean = true;

  get showLoadMoreButton(): boolean {
    return this._showLoadMoreButton;
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.dataService
      .getAccountsSort(
        this.params.sortField,
        this.params.sortOrder,
        this.params.pageNumber,
        this.params.pageSize
      )
      .subscribe((res: HttpResponse<MyAccount[]>) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.body);
      });

    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {}

  getAllAccounts(): void {
    this.params.pageNumber = null;
    this.params.pageSize = null;

    this.loadData();

    // this.dataService
    //   .getAccountsAll()
    //   .subscribe((res: HttpResponse<MyAccount[]>) => {
    //     console.log(res);
    //     this.dataSource = new MatTableDataSource(res.body);
    //   });

    // this.dataSource.sort = this.sort;

    this._showLoadMoreButton = false;
  }

  @HostListener('matSortChange', ['$event'])
  sortChange(e) {
    this.params.sortField = e.active;
    this.params.sortOrder = e.direction ? e.direction : 'asc';
    this.loadData();
    console.log(e);
  }
}
