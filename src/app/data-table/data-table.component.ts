import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Policy } from '../policy';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  dataSource: Policy[] = [];

  tableColumns: string[] = [
    'policyNumber',
    'creationDate',
    'expireDate',
    'policyAmount',
    'clientId',
    'employeeId',
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPolicies().subscribe((res: HttpResponse<Policy[]>) => {
      console.log(res);
      this.dataSource = res.body;
    });
  }
}
