import { Schema, models, model, Document } from "mongoose";

export interface ISybil extends Document {
  address: string;
}

const SybilSchema = new Schema({
  address: { type: String, required: true, unique: true },
});

const Sybil = models.Sybil || model<ISybil>("Sybil", SybilSchema, "sybil_list");

export default Sybil;
