import mongoose, { Schema } from "mongoose";

const filme = new Schema(
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
    diretor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var filmeSchema = mongoose.model("Filme", filme);

export { filmeSchema };
