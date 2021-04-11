import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowService } from 'src/app/services/borrow/borrow.service';
import { SharedService } from 'src/app/services/shared.service';
import Web3 from 'web3';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  address: any;
  form: FormGroup;
  loanWolfSCAbi: any;
  tokens = ['ETH', 'LINK', 'DAI', 'USDT', 'USDC', 'DAI']
  email: any;
  collateralamount: any;
  collateraltoken: any;
  fullname: any;
  passportid: any;
  monthlysalary: any;
  monthlyspendings: any;
  paymentcontractaddress: any;
  ethaddress: any;
  tokenType: any;
  loanDuration: any;
  loanAmount: any;
  erc20address: any;
  loanWolfSCERCPaymentAbi: any;
  loanWolfBondSCAbi: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private sharedService: SharedService,
    private router: Router, private borrowService: BorrowService, private httpClient: HttpClient) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      address: ['', Validators.required],
      passportid: ['', Validators.required],
      fullname: ['', Validators.required],
      collateraltoken: ['', Validators.required],
      loanduration: ['', Validators.required],
      collateralamount: [''],
      loanamount: ['', Validators.required],
      monthlysalary: ['', Validators.required],
      monthlyspendings: ['', Validators.required],
      paymentcontractaddress: ['', Validators.required],
      erc20address: [''],
      tokentype: ['ETH']
    });
  }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(address => (this.ethaddress = address));
    this.httpClient.get("assets/contract/scAbis.json").subscribe((data: any) => {
      this.loanWolfSCERCPaymentAbi = data.loanWolfSCERCPaymentAbi;
    })
    this.httpClient.get("assets/contract/scAbis.json").subscribe((data: any) => {
      this.loanWolfBondSCAbi = data.loanWolfBondSCAbi;
    })
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.email = this.form.get('email')?.value;
        this.collateralamount = this.form.get('collateralamount')?.value;
        this.collateraltoken = this.form.get('collateraltoken')?.value;
        this.fullname = this.form.get('fullname')?.value;
        this.passportid = this.form.get('passportid')?.value;
        this.address = this.form.get('address')?.value;
        this.monthlysalary = this.form.get('monthlysalary')?.value;
        this.monthlyspendings = this.form.get('monthlyspendings')?.value;
        this.paymentcontractaddress = this.form.get('paymentcontractaddress')?.value;
        if (!this.form.get('erc20address')?.value) { this.erc20address = this.ethaddress }
        else { this.erc20address = this.form.get('erc20address')?.value; }
        this.tokenType = this.form.get('tokentype')?.value;
        this.loanDuration = this.form.get('loanduration')?.value;
        this.loanAmount = this.form.get('loanamount')?.value;
      } catch (err) { }


      var web3: any = new Web3(window.web3.currentProvider);

      const PAYMENT_CONTRACT_ADDRESS = '0x579C6CA26059f00131Cb0D0228ebE774db67989D';
      const WALLET_ADDRESS = this.ethaddress;
      const contractInstance = new web3.eth.Contract(this.loanWolfSCERCPaymentAbi, PAYMENT_CONTRACT_ADDRESS);

      var index = await contractInstance.methods.getNumberOfLoans(WALLET_ADDRESS).call({ gas: 2100000 });
      console.log("Index", index);
      var loandId = await contractInstance.methods.getId(WALLET_ADDRESS, index).call();
      console.log("LoanId", loandId);


      this.applyLoan({
        "tokentype": this.tokenType,
        "duration": this.loanDuration,
        "loanamount": this.loanAmount,
        "collateraltoken": this.collateraltoken,
        "collateralamount": this.collateralamount,
        "loanid": loandId,
        "fullname": this.fullname,
        "email": this.email,
        "address": this.address,
        "passportid": this.passportid,
        "monthlysalary": this.monthlysalary,
        "monthlyspending": this.monthlyspendings,
        "paymentcontractaddress": this.paymentcontractaddress,
        "erc20address": this.erc20address
      })



      var approval_transaction_reference = await contractInstance.methods.configureNew(this.erc20address, this.erc20address, 5, this.loanDuration, this.loanAmount, 5, 30).
        send({ from: WALLET_ADDRESS, gas: 2100000, to: PAYMENT_CONTRACT_ADDRESS });



      const contractInstanceMockDai = new web3.eth.Contract(
        [
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_devFee",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
              }
            ],
            "name": "decreaseAllowance",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
              }
            ],
            "name": "increaseAllowance",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ], '0xaFF4481D10270F50f203E0763e2597776068CBc5');

      var approvalTransaction = await contractInstanceMockDai.methods.approve(PAYMENT_CONTRACT_ADDRESS, web3.utils.toWei(this.collateralamount, 'Ether')).
        send({ from: WALLET_ADDRESS, gas: 2100000 })

      console.log("Approval for mockDai", approvalTransaction);

      //providing the Collateral 
      var transaction = await contractInstance.methods.addCollateral('0xaFF4481D10270F50f203E0763e2597776068CBc5', web3.utils.toWei(this.collateralamount, 'Ether'), loandId)
        .send({ from: WALLET_ADDRESS, gas: 2100000 });

      console.log("Add collateral method", transaction);



      console.log("Transact", transaction);

      console.log("Contract Instance", contractInstance);

      this.router.navigate(['/bdashboard', this.erc20address]);
    }


  }


  async applyLoan(data: any) {
    const val = await this.borrowService.createLoan(data);
  }


}
