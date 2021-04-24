import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:admin@catalogo-filmes.2nzun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Aplicação conectada com o banco de dados");
  })
  .catch((erro) => {
    console.log(`Erro ao conectar no banco de dados: ${erro}`);
  });

export { mongoose };
