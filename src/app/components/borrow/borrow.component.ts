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


      //TODO
      //populate the payment address in the frontend screen

      var web3: any = new Web3(window.web3.currentProvider);

      const PAYMENT_CONTRACT_ADDRESS = '0xdb66c14FEc270B7FB6827248eE5c9fE859CD051E';
      const WALLET_ADDRESS = '0x5426B3b63E814bf1AAE6aed493877542Ea3d2E4b'
      const contractInstance = new web3.eth.Contract(this.loanWolfSCERCPaymentAbi, PAYMENT_CONTRACT_ADDRESS);

      var approval_transaction_reference = await contractInstance.methods.configureNew(this.erc20address, this.erc20address, 5, this.loanDuration, this.loanAmount, 5, 30).
        send({ from: WALLET_ADDRESS, gas: 2100000, to: PAYMENT_CONTRACT_ADDRESS });


      //var sentTx = await contractInstance.methods.configureNew(this.erc20address, this.erc20address,5, this.loanDuration, this.loanAmount, 5, 30).call();
      console.log("Hello configuring new loan", approval_transaction_reference);

      var index = await contractInstance.methods.getNumberOfLoans(WALLET_ADDRESS).call({ gas: 2100000 });
      console.log("Index", index);
      var loandId = await contractInstance.methods.loanIDs(WALLET_ADDRESS, index - 1).call();
      console.log("LoanId", loandId);



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
        ], '0xCD2B255CdE34B53fec50AcaBaf0eD053d94cd592');

      var approvalTransaction = await contractInstanceMockDai.methods.approve(PAYMENT_CONTRACT_ADDRESS, web3.utils.toWei(this.collateralamount, 'Ether')).
        send({ from: WALLET_ADDRESS, gas: 2100000 })

      console.log("Approval for mockDai", approvalTransaction);

      //providing the Collateral 
      var transaction = await contractInstance.methods.addCollateral('0xCD2B255CdE34B53fec50AcaBaf0eD053d94cd592', web3.utils.toWei(this.collateralamount, 'Ether'), loandId)
        .send({ from: WALLET_ADDRESS, gas: 2100000 });

      console.log("Add collateral method", transaction);


      // var bondContractInstance = new web3.eth.Contract([
      //   {
      //     "inputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "constructor"
      //   },
      //   {
      //     "anonymous": false,
      //     "inputs": [
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "account",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "operator",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": false,
      //         "internalType": "bool",
      //         "name": "approved",
      //         "type": "bool"
      //       }
      //     ],
      //     "name": "ApprovalForAll",
      //     "type": "event"
      //   },
      //   {
      //     "anonymous": false,
      //     "inputs": [
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "operator",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "from",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "to",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": false,
      //         "internalType": "uint256[]",
      //         "name": "ids",
      //         "type": "uint256[]"
      //       },
      //       {
      //         "indexed": false,
      //         "internalType": "uint256[]",
      //         "name": "values",
      //         "type": "uint256[]"
      //       }
      //     ],
      //     "name": "TransferBatch",
      //     "type": "event"
      //   },
      //   {
      //     "anonymous": false,
      //     "inputs": [
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "operator",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "from",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": true,
      //         "internalType": "address",
      //         "name": "to",
      //         "type": "address"
      //       },
      //       {
      //         "indexed": false,
      //         "internalType": "uint256",
      //         "name": "id",
      //         "type": "uint256"
      //       },
      //       {
      //         "indexed": false,
      //         "internalType": "uint256",
      //         "name": "value",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "TransferSingle",
      //     "type": "event"
      //   },
      //   {
      //     "anonymous": false,
      //     "inputs": [
      //       {
      //         "indexed": false,
      //         "internalType": "string",
      //         "name": "value",
      //         "type": "string"
      //       },
      //       {
      //         "indexed": true,
      //         "internalType": "uint256",
      //         "name": "id",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "URI",
      //     "type": "event"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "IDToContract",
      //     "outputs": [
      //       {
      //         "internalType": "address",
      //         "name": "",
      //         "type": "address"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "account",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "id",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "balanceOf",
      //     "outputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address[]",
      //         "name": "accounts",
      //         "type": "address[]"
      //       },
      //       {
      //         "internalType": "uint256[]",
      //         "name": "ids",
      //         "type": "uint256[]"
      //       }
      //     ],
      //     "name": "balanceOfBatch",
      //     "outputs": [
      //       {
      //         "internalType": "uint256[]",
      //         "name": "",
      //         "type": "uint256[]"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [],
      //     "name": "head",
      //     "outputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "account",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "address",
      //         "name": "operator",
      //         "type": "address"
      //       }
      //     ],
      //     "name": "isApprovedForAll",
      //     "outputs": [
      //       {
      //         "internalType": "bool",
      //         "name": "",
      //         "type": "bool"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "",
      //         "type": "address"
      //       }
      //     ],
      //     "name": "llTail",
      //     "outputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "from",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "address",
      //         "name": "to",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256[]",
      //         "name": "ids",
      //         "type": "uint256[]"
      //       },
      //       {
      //         "internalType": "uint256[]",
      //         "name": "amounts",
      //         "type": "uint256[]"
      //       },
      //       {
      //         "internalType": "bytes",
      //         "name": "data",
      //         "type": "bytes"
      //       }
      //     ],
      //     "name": "safeBatchTransferFrom",
      //     "outputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "from",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "address",
      //         "name": "to",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "id",
      //         "type": "uint256"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "amount",
      //         "type": "uint256"
      //       },
      //       {
      //         "internalType": "bytes",
      //         "name": "data",
      //         "type": "bytes"
      //       }
      //     ],
      //     "name": "safeTransferFrom",
      //     "outputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "operator",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "bool",
      //         "name": "approved",
      //         "type": "bool"
      //       }
      //     ],
      //     "name": "setApprovalForAll",
      //     "outputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "staking",
      //     "outputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "last",
      //         "type": "uint256"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "next",
      //         "type": "uint256"
      //       },
      //       {
      //         "components": [
      //           {
      //             "internalType": "uint256",
      //             "name": "ID",
      //             "type": "uint256"
      //           },
      //           {
      //             "internalType": "uint256",
      //             "name": "ammount",
      //             "type": "uint256"
      //           },
      //           {
      //             "internalType": "uint256",
      //             "name": "timeStaked",
      //             "type": "uint256"
      //           }
      //         ],
      //         "internalType": "struct Bonds.IOU",
      //         "name": "value",
      //         "type": "tuple"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "bytes4",
      //         "name": "interfaceId",
      //         "type": "bytes4"
      //       }
      //     ],
      //     "name": "supportsInterface",
      //     "outputs": [
      //       {
      //         "internalType": "bool",
      //         "name": "",
      //         "type": "bool"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "uri",
      //     "outputs": [
      //       {
      //         "internalType": "string",
      //         "name": "",
      //         "type": "string"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "_paymentContractAddress",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "_id",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "newLoan",
      //     "outputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "_id",
      //         "type": "uint256"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "_amm",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "stake",
      //     "outputs": [],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "_index",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "unstake",
      //     "outputs": [
      //       {
      //         "internalType": "bool",
      //         "name": "",
      //         "type": "bool"
      //       }
      //     ],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "_who",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "_index",
      //         "type": "uint256"
      //       }
      //     ],
      //     "name": "getAccruances",
      //     "outputs": [
      //       {
      //         "internalType": "uint256",
      //         "name": "",
      //         "type": "uint256"
      //       }
      //     ],
      //     "stateMutability": "view",
      //     "type": "function",
      //     "constant": true
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "_operator",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "address",
      //         "name": "_from",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "_id",
      //         "type": "uint256"
      //       },
      //       {
      //         "internalType": "uint256",
      //         "name": "_value",
      //         "type": "uint256"
      //       },
      //       {
      //         "internalType": "bytes",
      //         "name": "_data",
      //         "type": "bytes"
      //       }
      //     ],
      //     "name": "onERC1155Received",
      //     "outputs": [
      //       {
      //         "internalType": "bytes4",
      //         "name": "",
      //         "type": "bytes4"
      //       }
      //     ],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   },
      //   {
      //     "inputs": [
      //       {
      //         "internalType": "address",
      //         "name": "_operator",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "address",
      //         "name": "_from",
      //         "type": "address"
      //       },
      //       {
      //         "internalType": "uint256[]",
      //         "name": "_ids",
      //         "type": "uint256[]"
      //       },
      //       {
      //         "internalType": "uint256[]",
      //         "name": "_values",
      //         "type": "uint256[]"
      //       },
      //       {
      //         "internalType": "bytes",
      //         "name": "_data",
      //         "type": "bytes"
      //       }
      //     ],
      //     "name": "onERC1155BatchReceived",
      //     "outputs": [
      //       {
      //         "internalType": "bytes4",
      //         "name": "",
      //         "type": "bytes4"
      //       }
      //     ],
      //     "stateMutability": "nonpayable",
      //     "type": "function"
      //   }
      // ], '0x298f27ba039A435B81b9D6A9A956327d32106B03');

      // console.log("Bond Contract Instacne",bondContractInstance);
      

      // var newLoanTransact = await bondContractInstance.methods.newLoan(PAYMENT_CONTRACT_ADDRESS, loandId)
      //   .send({ from: WALLET_ADDRESS, gas: 210000, to: '0x298f27ba039A435B81b9D6A9A956327d32106B03' });

      // console.log("New Loan Transaction", newLoanTransact);

      // var balanceTransact = await bondContractInstance.methods.balanceOf(WALLET_ADDRESS, loandId).call();

      // console.log("Balance Transaction", balanceTransact);






      console.log("Transact", transaction);

      console.log("Contract Instance", contractInstance);
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
      this.router.navigate(['/bdashboard', this.erc20address]);
    }


  }


  async applyLoan(data: any) {
    const val = await this.borrowService.createLoan(data);
  }


}
