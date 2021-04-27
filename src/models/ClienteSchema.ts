import mongoose, { Schema } from "mongoose";

const cliente = new Schema(
  {
    usuario: {
      type: String,
      required: [true, "O campo USUÁRIO é obrigatório!"],
    },
    senha: {
      type: String,
      required: [true, "O campo SENHA é obrigatório!"],
    },
  },
  {
    timestamps: true,
  }
);

var clienteSchema = mongoose.model("Cliente", cliente);

export { clienteSchema };
