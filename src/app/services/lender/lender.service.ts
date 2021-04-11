import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LenderService {

  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {

  }

  async updateLoanStatus(loanId: any) {
    return await this.http.put(this.baseUrl + 'updateloan', {
      loanid: loanId,
      isapproved: "pending"
    }).toPromise().then((contract) => {
      console.log("The contract", contract);
    });
  }

  async saveLenderInfo(loanId: any, erc20address: any) {
    return await this.http.post(this.baseUrl + 'buyloan', {
      loanid: loanId,
      erc20address: erc20address
    }).toPromise().then((contract) => {
      console.log("The contract", contract);
    });
  }

  async getAllLendedLoans(erc20address: any) {
    return await this.http.get(this.baseUrl + 'getlendedloans/' + erc20address).toPromise().then((contract) => {
      console.log("Getting all the loans", contract);
      return contract;
    });
  }

  async getLendedDetails(loanid: any) {
    return await this.http.get(this.baseUrl + 'getlendeddetails/' + loanid).toPromise().then((contract) => {
      console.log("Get detail loan", contract);
      return contract;
    });
  }



}
