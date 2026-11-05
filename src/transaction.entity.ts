import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TransactionDocument = HydratedDocument <Transaction>; 

@Schema()
export class Transaction{
    @Prop()
    descricao: string;
    @Prop()
    valor: number;
    @Prop()
    tipo: string;
    @Prop()
    categoria: string;
    @Prop()
    consumoConsciente: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);