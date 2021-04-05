import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  address: any;

  constructor(private contractService: ContractService, private sharedService: SharedService) {
  }

  async connectMetamask() {
    this.address = await this.contractService.connectAccount().then((a) => {
      return a;
    });
    this.sharedService.changeMessage(this.address);
  }

}
