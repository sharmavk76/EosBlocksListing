import { Component, OnInit } from '@angular/core';
import { EosService } from '../services/eos.service';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  data: any;
  blockIds: string[] = new Array();
  blocks: any[] = new Array();
  constructor(private eosService: EosService) { 
    
  }

  ngOnInit(): void {
  }

  public btnClick() {
    this.blocks = new Array();  
      this.eosService.getInfo().subscribe((data:{})=>{
      console.log(data);
      this.data = data;
      var bid=0;
      
      this.getBlocks(this.data.head_block_num);
    });
  
}

  getBlocks(blockId: number){
    var currentBlock;
    this.eosService.getBlock(blockId).subscribe((data:{})=>{
      console.log(data);
      this.blocks.push(data);
      currentBlock = data;
      if(this.blocks.length<10){
        this.getBlocks(currentBlock.previous);
      }
    });
  } 
}
