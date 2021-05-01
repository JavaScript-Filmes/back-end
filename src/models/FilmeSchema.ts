import mongoose, { Schema, Document } from "mongoose";

const filmeSchema = new Schema(
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

interface FilmeInterface extends Document {
  status: string;
}

export default mongoose.model<FilmeInterface>("Filme", filmeSchema);
