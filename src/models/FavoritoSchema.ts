import { model, Schema } from "mongoose";

const favoritoSchema = new Schema(
  {
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente" },
    filme: [{ type: Schema.Types.ObjectId, ref: "Filme" }],
  },
  {
    timestamps: true,
  }
);

export default model("Favorito", favoritoSchema);
