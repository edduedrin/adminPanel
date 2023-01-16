import { Component, OnInit,Inject, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../service/api/api.service';

interface carasoulImages{
  imageSrc: string,
  imageAlt: string
}


@Component({
  selector: 'app-agent-dialogbox',
  templateUrl: './agent-dialogbox.component.html',
  styleUrls: ['./agent-dialogbox.component.scss']
})




export class AgentDialogboxComponent implements OnInit {

  displayedColumns: string[] = [
    // "Agent_Name"
  ];

  d="https://tse1.mm.bing.net/th?id=OIP.M7w4cnfAznj818p57HTLNwHaFj&pid=Api&P=0";


  
  dataSource = new MatTableDataSource([]);
  private _liveAnnouncer: any;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  constructor(
    private apiservice: ApiService,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public agent_data:any 
  ) {}


  @Input() images: carasoulImages[]=[
    {
      imageSrc:'https://tse4.mm.bing.net/th?id=OIP.qQ2bva-PZ_F9H6ENXSf61wHaCi&pid=Api&P=0',
      imageAlt:'sarkar'
    },
    {
      imageSrc:'https://tse2.mm.bing.net/th?id=OIP.vdjxJCZs2AqGZWAWPkz6NQHaEK&pid=Api&P=0',
      imageAlt:'pokkiri'
    },
    {
      imageSrc:'https://tse3.mm.bing.net/th?id=OIP._GBGhMR3Nk0hngS-ETWyLgHaFj&pid=Api&P=0',
      imageAlt:'master'
    }, {
      imageSrc:'https://tse1.mm.bing.net/th?id=OIP.w3zVvDzjrm0Lk9XR6eCmJQHaD4&pid=Api&P=0',
      imageAlt:'theri'
    }
  ]

  @Input() indicators = true;

    selectedIndex = 0 ;

  ngOnInit(): void {
    console.log('asda',this.agent_data)
  }
   selectImage(index : number):void{
    this.selectedIndex = index;
   }
  
}