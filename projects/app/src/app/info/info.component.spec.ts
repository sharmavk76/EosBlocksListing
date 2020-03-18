import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http'
import { InfoComponent } from './info.component';
import { EosService } from '../services/eos.service';
import { info } from '../models/info';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';


describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let service: EosService;
  let httpMock: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoComponent ],
      imports: [HttpClientTestingModule] ,
      providers: [EosService]

    })
    .compileComponents();
    service = TestBed.get(EosService);
    httpMock = TestBed.get(HttpTestingController);
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


 afterEach(() => {
  httpMock.expectOne(req =>req.method==='GET' && req.url==='https://api.eosnewyork.io/v1/chain/get_info');
});
  
  it('be able to retrieve get_info from the API bia GET', () => {
    const infoModel: info = {
      server_version: "e19afc80",
      chain_id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
      head_block_num: 110374678,
      last_irreversible_block_num: 110374348,
      last_irreversible_block_id: "06942dccc8704b684eaf3f02062fa2386801b9d5dcb57bf0835c7dd5b8268f5d",
      head_block_id: "06942f16596b050fc592947fb14552918b47a6dc7deff31071fea5ec3c560e5a",
      head_block_time: "2020-03-16T01:17:05.500",
      head_block_producer: "bitfinexeos1",
      virtual_block_cpu_limit: 200000,
      virtual_block_net_limit: 1048576000,
      block_cpu_limit: 199900,
      block_net_limit: 1048576,
      server_version_string: "v2.0.0",
      fork_db_head_block_num: 110374678,
      fork_db_head_block_id: "06942f16596b050fc592947fb14552918b47a6dc7deff31071fea5ec3c560e5a",
      server_full_version_string: "v2.0.0-e19afc8072219282a7c3fc20e47aa80cb70299e4"
    };
    
    service.getInfo().subscribe(posts => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(infoModel);
    });
    
  });

  
});
