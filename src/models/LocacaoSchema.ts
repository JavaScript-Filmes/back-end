import { model, Schema } from "mongoose";

const locacaoSchema = new Schema(
  {
    data: {
      type: Date,
      required: [true, "O campo DATA é obrigatório!"],
    },
    cliente: [{ type: Schema.Types.ObjectId, ref: "Cliente" }],
    filme: [{ type: Schema.Types.ObjectId, ref: "Filme" }],
  },
  {
    timestamps: true,
  }
);

export default model("locacao", locacaoSchema);
