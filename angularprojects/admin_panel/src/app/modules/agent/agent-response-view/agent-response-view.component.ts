import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { CURRENCY_FORMAT, DATE_FORMAT } from 'src/app/shared/constants/constants';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { ApiService } from '../../auth/services/api/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../service/api/api.service';
import { AgentDialogboxComponent } from './agent-dialogbox/agent-dialogbox.component';
import * as _ from 'lodash';


 interface History{
  Agent_Name?: string,
  Shop_Name?: string
  Date_of_Visit?: Date,
  email_ID?:string,
  gst_in?: string,
  mob_no?:number,
  Brand?:string,
  Category?:string,
  Next_Visit?:Date,
  Photos?:string,
  level?: string
}


// const agentDetails: History[]=[
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   }, {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   }, {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   }, {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   },
// // //   {
// // //     Agent_Name: "Edwin",
// // //     Shop_Name: "abc co.",
// // //     Date_of_Visit: new Date('01-nov-2022'),
// // //     email_ID:"abc@gmail.com",
// // //     gst_in: "24AAACC4175D",
// // //     mob_no: 9606862430,
// // //     Brand:"Benz",
// // //     Category:"Car Dealer",
// // //     Next_Visit:new Date('17-nov-2022'),
// // //     Photos:"https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0"
// // //   }
// ]



@Component({
  selector: 'app-agent-response-view',
  templateUrl: './agent-response-view.component.html',
  styleUrls: ['./agent-response-view.component.scss']
})
export class AgentResponseViewComponent implements OnInit {


  

  public aid:any;

  Date_Format = DATE_FORMAT;

  currency_format = CURRENCY_FORMAT;

  limit = 10;

  length = 0;

  page = 1;

  sortBy!: string;

  search!: string;

  maxDate!: Date;

  transactionDate!: Date;

 

  displayedColumns: string[] = [

    "Agent_Name",
    "Merchant_Name",
    "email_ID",
    "mob_no",
    "visit_date",
    "preview"
  ];
  dataSource!: MatTableDataSource<any>;
  invoice_number!: string;
  filterInvoiceByDate: any;
  apiResponse: any=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getAgentHistory()
    this.maxDate = new Date();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }



  getNewduedate(entity: any) {
    const new_due_date =
      entity && entity.new_due_date && entity.new_due_date != " 23:59:59"
        ? entity.new_due_date
        : "";
    return new_due_date;
  }

  getDueDate(entity: any) {
    const due_date =
      entity && entity.due_date && entity.due_date != " 23:59:59"
        ? entity.due_date
        : "";
    return due_date;
  }

  
 
   

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private apiservice: ApiService,
    private dialogRef: MatDialog
  ) {}




  getAgentHistory() {
    this.apiservice.getagentHistory().subscribe((response: any) => {
      this.apiResponse= response;
      if (response.status== true && response.code=="200") {
        const agenthistory = response.message
          ? response.message
          : [];
        this.dataSource = new MatTableDataSource(agenthistory);
        this.dataSource.paginator = this.paginator;

        // this.sort.sort(({ id: 'updatedAt', start: 'desc'}) as MatSortable);
        // this.dataSource.sort = this.sort;

        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: "payment_date", direction: "desc" };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
    });
  }

  openDialog(element:any){
    this.aid=element
    console.log(element.id)
    this.dialogRef.open(AgentDialogboxComponent,{data:element});
  }
  opernDio(element:any){
    this.dialogRef.open(AgentDialogboxComponent,{data:'message'});
  }


  onChange($event: any){
    let filteredData = _.filter(this.apiResponse,(item)=>{
      return item.agentName.tolowerCase()==$event.value.toLowerClass();
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }
 
}

