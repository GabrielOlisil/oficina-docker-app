const { log, info } = require('console');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require('multer');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "uploads"), { recursive: true });
}

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [

    new winston.transports.Console({ format: winston.format.cli() })
  ],
});


// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split('.')[1];
    const novoNomeArquivo = file.originalname.split('.')[0];

    // Cria um código randômico que será o nome do arquivo

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});

const upload = multer({ storage });

app.post('/files', upload.single('file'), (req, res) => {

  logger.log({level: 'info', message: "Arquivo upado com sucesso"})
  res.json({ success: true });

});


app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      logger.log(
        {
          level: err,
          message: "Não foi possível ler os arquivos do diretório"
        }
      )
      res.send("Erro")
      return
    }

    logger.log({level: 'info', message: "pasta uploads lida com sucesso"})


    res.json(files)
  });
})

app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;


  res.sendFile(path.join(__dirname, "uploads", filename), err => {
    if (err) {
      logger.log(
        {
          level: err,
          message: "Não foi possível ler o arquivos do diretório"
        }
      )
      res.status(500).send("Arquivo não encontrado")
    }
  })

  logger.log(
    {
      level: 'info',
      message: `Arquivo ${filename} lido com sucesso`
    }
  )
})


app.listen(3200, () => {
  logger.log({level: 'info', message: "Servidor escutando na porta 3200"})

});
