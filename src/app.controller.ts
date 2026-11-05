import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Transaction } from './transaction.entity.js';
import { Body } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  readTransactions(){
    return this.appService.getTransaction();
  }

  @Post()
  createTransaction(@Body() transaction: Partial<Transaction>){
    return this.appService.createTransaction(transaction);
  }
    
  
}
