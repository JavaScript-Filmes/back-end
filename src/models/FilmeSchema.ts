import mongoose, { Schema } from "mongoose";

const FilmeSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "O campo TÍTULO é obrigatório!"],
    },
    genero: {
      type: String,
      required: [true, "O campo GÊNERO é obrigatório!"],
    },
    duracao: {
      type: String,
      required: [true, "O campo DURAÇÃO é obrigatório!"],
    },
    descricao: {
      type: String,
      required: [true, "O campo DESCRIÇÃO é obrigatório!"],
    },
    status: {
      type: String,
      enum: ["DISPONÍVEL", "LOCADO"],
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

var filme = mongoose.model("Filme", FilmeSchema);

export { filme };
