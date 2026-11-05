import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  )
  {}

  async getTransaction(): Promise<{
    historico: TransactionDocument[],
    metricas: {
      saldoTotal: number;
      totalDespesas: number;
      totalGastoImpulso: number;
    }}> {
    const transactions = await this.transactionModel.find().exec();

    const metricas = transactions.reduce(
      (acc, transaction) => {
        const valor = transaction.valor;

        if(transaction.tipo === "receita"){
          acc.saldoTotal += valor;
        }
        if(transaction.tipo === "despesa") {
          acc.saldoTotal -= valor;
          acc.totalDespesas += valor;

          if(transaction.consumoConsciente === false){
            acc.totalGastoImpulso += valor;
          }
        }
        return acc;
      },
      {
        saldoTotal: 0,
        totalDespesas:0,
        totalGastoImpulso: 0,
      }
    );

    return {
      historico: transactions,
      metricas,
    }

  }

  async createTransaction(transction: Partial<Transaction>): Promise<TransactionDocument> {
    return this.transactionModel.create(transction);
  }
}
