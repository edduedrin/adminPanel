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
import { FormControl } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import * as _ from 'lodash';


// interface History {
//   // Agent_Name?: string,
//   Shop_Name?: string
//   Date_of_Visit?: Date,
//   email_ID?: string,
//   gst_in?: string,
//   mob_no?: number,
//   Brand?: string,
//   Category?: string,
//   Next_Visit?: Date,
//   Photos?: string,
//   level?: string
// }


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




  // public aid = [
  //   {
  //     "id": "63b6a66487fbb4d8077ddb87",
  //     "business_owner_name": "Avishek Singh",
  //     "shop_name": "Katana shop",
  //     "mobile_number": "+919643034369",
  //     "email": "avishek7403@gmail.com",
  //     "category_of_business": "Sword",
  //     "next_visit_date": "10/01/2023",
  //     "geolocation": "12.8962006 77.5828018",
  //     "level_of_interest_shown": "0",
  //     "photos": [
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63aa9da25491c52cfece5d10/%2B919643034369/%2B919643034369_IMG-20230105-WA0015.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=3ad2a207337356f6976f1ae7c8c96d7ca56357b5e195c3be39d0208433514653&X-Amz-SignedHeaders=host",
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63aa9da25491c52cfece5d10/%2B919643034369/%2B919643034369_IMG-20230105-WA0014.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=0952494d7e2efed3a6e0481a04117a4a8c7d7e3a30814430e7f9e53dbbbf037c&X-Amz-SignedHeaders=host",
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63aa9da25491c52cfece5d10/%2B919643034369/%2B919643034369_Screenshot_20230105-124632.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=a170b678bb10b9f9103f80cfced79c29c56c809e0bdcb976efff35ed74ad41ae&X-Amz-SignedHeaders=host"
  //     ],
  //     "gstin": "Test gst",
  //     "dealers_brand": "Nike",
  //     "createdBy": "Test Staff",
  //     "createdAt": "2023-01-05T10:28:52.731Z"
  //   },
  //   {
  //     "id": "63b8642b20c96a5e2de4e864",
  //     "business_owner_name": "Demo Lead",
  //     "shop_name": "Tea Shop",
  //     "mobile_number": "8597678985",
  //     "email": "Test@demo",
  //     "category_of_business": "Test Business",
  //     "next_visit_date": "09/01/2023",
  //     "geolocation": "12.8962381 77.5827768",
  //     "level_of_interest_shown": "0",
  //     "photos": [
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63aa9da25491c52cfece5d10/8597678985/8597678985_images%20%288%29.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=5f89e536b987b518f458073e6b610281a3c50c48dea4907a56212b73056af14a&X-Amz-SignedHeaders=host",
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63aa9da25491c52cfece5d10/8597678985/8597678985_images%20%287%29.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=bc3017f4f00da09683ecb47bb9d5ae600995e4d20f39bfe2cb338618d109c37b&X-Amz-SignedHeaders=host",
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63aa9da25491c52cfece5d10/8597678985/8597678985_images%20%286%29.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=88361f317ed6994848e8779f50d6317021c05122014777a7371ccb4b706269e5&X-Amz-SignedHeaders=host"
  //     ],
  //     "gstin": "Test Gst",
  //     "dealers_brand": "Test Brand",
  //     "createdBy": "Test Staff",
  //     "createdAt": "2023-01-06T18:10:51.267Z"
  //   },
  //   {
  //     "id": "63bbc9f6b08168b537f33ff3",
  //     "business_owner_name": "test1",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:01:58.311Z"
  //   },
  //   {
  //     "id": "63bbc9f9b08168b537f33ff5",
  //     "business_owner_name": "test2",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:01.406Z"
  //   },
  //   {
  //     "id": "63bbc9fcb08168b537f33ff9",
  //     "business_owner_name": "test3",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:04.617Z"
  //   },
  //   {
  //     "id": "63bbc9ffb08168b537f33ffb",
  //     "business_owner_name": "test4",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:07.957Z"
  //   },
  //   {
  //     "id": "63bbca03b08168b537f33ffd",
  //     "business_owner_name": "test5",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:11.886Z"
  //   },
  //   {
  //     "id": "63bbca06b08168b537f33fff",
  //     "business_owner_name": "test6",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:14.941Z"
  //   },
  //   {
  //     "id": "63bbca0ab08168b537f34001",
  //     "business_owner_name": "test7",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:18.690Z"
  //   },
  //   {
  //     "id": "63bbca0eb08168b537f34003",
  //     "business_owner_name": "test8",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:22.647Z"
  //   },
  //   {
  //     "id": "63bbca12b08168b537f34005",
  //     "business_owner_name": "test9",
  //     "shop_name": "1",
  //     "mobile_number": "87470121523",
  //     "email": "karthik.anand@xuriti.com",
  //     "category_of_business": "Pvt ltd",
  //     "next_visit_date": "12/12/2022",
  //     "geolocation": "lat:12.123 long:12.786",
  //     "level_of_interest_shown": "0",
  //     "photos": [],
  //     "gstin": "SUAG213123",
  //     "dealers_brand": "ASIAN PAINT, NIPPON",
  //     "createdBy": "kashif iqbal",
  //     "createdAt": "2023-01-09T08:02:26.293Z"
  //   },
  //   {
  //     "id": "63be63073a639c4720bdfefe",
  //     "business_owner_name": "",
  //     "shop_name": "",
  //     "mobile_number": "+917908144044",
  //     "email": "",
  //     "category_of_business": "",
  //     "next_visit_date": "",
  //     "geolocation": "12.8922132 77.5976438",
  //     "level_of_interest_shown": "0",
  //     "photos": [
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63ac087916c0369739bb3963/%2B917908144044/%2B917908144044_IMG-20230110-WA0031.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=cbb22e761fa2111be5859001ce732b58d0eb284572b33140da50ddea5366d23a&X-Amz-SignedHeaders=host",
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63ac087916c0369739bb3963/%2B917908144044/%2B917908144044_IMG-20230110-WA0027.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=ab93fc22b46d69aba6bb84c102fb1c49155ee49cd67a815cc5d70ae3809909b6&X-Amz-SignedHeaders=host",
  //       "https://private-bucket-dev-xuriti.s3.ap-south-1.amazonaws.com/agent/63ac087916c0369739bb3963/%2B917908144044/%2B917908144044_IMG-20230110-WA0026.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXALYDECMNE2HOZS7%2F20230113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T051748Z&X-Amz-Expires=900&X-Amz-Signature=14310e142e6bc73bc3603ea52b697b6b0832201e1a84d62f165887035f29d308&X-Amz-SignedHeaders=host"
  //     ],
  //     "gstin": "Gksgjshkxhlxhlxhld",
  //     "dealers_brand": "",
  //     "createdAt": "2023-01-11T07:19:35.314Z"
  //   }
  // ];

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
    "preview",
  ];
  

  nameFilter = new FormControl;
  dataSource = new MatTableDataSource();

  filterValues: any = {
    createdBy: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private apiservice: ApiService,
    private dialogRef: MatDialog
  ) {

    // console.log('asda', this.aid)
    this.getAgentHistory;
    this.dataSource.filterPredicate = this.createFilter();

  }



  ngOnInit(): void {
    this.getAgentHistory();
    // console.log('asda', this.aid)
    this.nameFilter.valueChanges.subscribe((createdBy) => {
      this.filterValues.createdBy = createdBy!;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });



  }
  // this.apiservice.getagentHistory().subscribe((createdBy) => {
  //   this.filterValues.createdBy = createdBy;
  //   this.dataSource.filter = JSON.stringify(this.filterValues);
  // });

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




  getAgentHistory() {
    // let data: any = {};
    // data.createdBy = this.createdBy;

    this.apiservice.getagentHistory().subscribe((response: any) => {
      // console.log(response.message)
      // this.aid = response.message;
      // console.log(this.aid)
      // return;
        if (response.status == true && response.code == "200") {
          const agenthistory = response.message
            ? response.message
            : [];
            // this.createdBy=response.message.createdBy;

          this.dataSource = new MatTableDataSource(agenthistory);
          this.dataSource.paginator = this.paginator;

      //     // this.sort.sort(({ id: 'updatedAt', start: 'desc'}) as MatSortable);
      //     // this.dataSource.sort = this.sort;

          this.dataSource.sort = this.sort;
          const sortState: Sort = { active: "payment_date", direction: "desc" };
          this.sort.active = sortState.active;
          this.sort.direction = sortState.direction;
          this.sort.sortChange.emit(sortState);
        }
    });

  }

  openDialog(element: any) {
    // this.aid = element
    console.log(element.id)
    this.dialogRef.open(AgentDialogboxComponent, { data: element });
  }
  opernDio(element: any) {
    this.dialogRef.open(AgentDialogboxComponent, { data: 'message' });
  }




  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.getAgentHistory();
    // this.dataSource.filterPredicate = (data, filter) => {
    //    return data.name.toLowerCase().indexOf(filter) !== -1;
    // }
  }



  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(data,'1231',searchTerms)
      return (
        data.createdBy.toLowerCase().indexOf(searchTerms.createdBy) !== -1
      );
    };
    return filterFunction;
  }

}

