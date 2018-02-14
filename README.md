# 🚘 ⚡ Consulta Placa
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contribuição)

Serverless de exemplo para consultar placa de veículos na base do Detran.

## Instalação
`npm install`

## Executar em ambiente de desenvolvimento
`npm run start:dev`

```sh
> sls offline start

Serverless: Starting Offline: dev/us-east-1.

Serverless: Routes for consultaPlaca:
Serverless: GET /placa/{placa}

Serverless: Offline listening on http://localhost:3000
````

Acesse `http://localhost:3000/placa/ABC1020` informando a placa para consulta desejada.

```json
{
  "codigoRetorno": "0",
  "mensagemRetorno": "Sem erros.",
  "codigoSituacao": "0",
  "situacao": "Sem restrição",
  "modelo": "VW/SANTANA CG",
  "marca": "VW/SANTANA CG",
  "cor": "VERMELHA",
  "ano": "1986",
  "anoModelo": "1986",
  "placa": "ABC1234",
  "data": "13/02/2018 às 11:45:10",
  "uf": "PR",
  "municipio": "LOBATO",
  "chassi": "************46344"
}
```

## Invocar a função localmente
`npm run invoke:local`

```sh
sls invoke local -f consultaPlaca -p ./placas/sem-restricao.json
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"0\",\"mensagemRetorno\":\"Sem erros.\",\"codigoSituacao\":\"0\",\"situacao\":\"Sem restrição\",\"modelo\":\"I/FERRARI 360 MODENA\",\"marca\":\"I/FERRARI 360 MODENA\",\"cor\":\"VERMELHA\",\"ano\":\"1999\",\"anoModelo\":\"2000\",\"placa\":\"AFT0017\",\"data\":\"13/02/2018 às 12:05:34\",\"uf\":\"PR\",\"municipio\":\"QUATRO BARRAS\",\"chassi\":\"************15765\"}"
}
sls invoke local -f consultaPlaca -p ./placas/roubo-furto.json
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"0\",\"mensagemRetorno\":\"Sem erros.\",\"codigoSituacao\":\"1\",\"situacao\":\"Roubo/Furto\",\"modelo\":\"I/MMC L200 4X4\",\"marca\":\"I/MMC L200 4X4\",\"cor\":\"PRETA\",\"ano\":\"1992\",\"anoModelo\":\"1993\",\"placa\":\"FFF0012\",\"data\":\"13/02/2018 às 12:05:36\",\"uf\":\"SP\",\"municipio\":\"SAO PAULO\",\"chassi\":\"************01561\"}"
}
sls invoke local -f consultaPlaca -p ./placas/invalida.json
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"1\",\"mensagemRetorno\":\"Erro no processamento da consulta.\"}"
}
sls invoke local -f consultaPlaca -p ./placas/nao-encontrada.json
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"3\",\"mensagemRetorno\":\"Veículo não encontrado.\"}"
}
```

## Publicar em produção na AWS

  - Crie as credenciais de acesso na AWS
    https://serverless.com/framework/docs/providers/aws/guide/credentials/


  - Deploy na AWS
  
    - DEV
    
      `npm run deploy:dev`

      ```sh
      > sls deploy -s dev

      Serverless: Packaging service...
      Serverless: Excluding development dependencies...
      Serverless: Uploading CloudFormation file to S3...
      Serverless: Uploading artifacts...
      Serverless: Uploading service .zip file to S3 (1.57 MB)...
      Serverless: Validating template...
      Serverless: Updating Stack...
      Serverless: Checking Stack update progress...
      ..............
      Serverless: Stack update finished...
      Service Information
      service: consulta-placa-serverless
      stage: dev
      region: us-east-1
      stack: consulta-placa-serverless-dev
      api keys:
        None
      endpoints:
        GET - https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/dev/placa/{placa}
      functions:
        consultaPlaca: consulta-placa-serverless-dev-consultaPlaca
      Serverless: Removing old service versions...
      ```

    - PROD
    
      `npm run deploy:prod`

      ```sh
      > sls deploy -s production

      Serverless: Packaging service...
      Serverless: Excluding development dependencies...
      Serverless: Creating Stack...
      Serverless: Checking Stack create progress...
      .....
      Serverless: Stack create finished...
      Serverless: Uploading CloudFormation file to S3...
      Serverless: Uploading artifacts...
      Serverless: Uploading service .zip file to S3 (1.57 MB)...
      Serverless: Validating template...
      Serverless: Updating Stack...
      Serverless: Checking Stack update progress...
      .................................
      Serverless: Stack update finished...
      Service Information
      service: consulta-placa-serverless
      stage: production
      region: us-east-1
      stack: consulta-placa-serverless-production
      api keys:
        None
      endpoints:
        GET - https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/production/placa/{placa}
      functions:
        consultaPlaca: consulta-placa-serverless-production-consultaPlaca
      ```

## Invocar a função em produção
`npm run invoke`

```sh
sls invoke -f consultaPlaca -p ./placas/sem-restricao.json -l
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"0\",\"mensagemRetorno\":\"Sem erros.\",\"codigoSituacao\":\"0\",\"situacao\":\"Sem restrição\",\"modelo\":\"I/FERRARI 360 MODENA\",\"marca\":\"I/FERRARI 360 MODENA\",\"cor\":\"VERMELHA\",\"ano\":\"1999\",\"anoModelo\":\"2000\",\"placa\":\"AFT0017\",\"data\":\"13/02/2018 às 12:03:58\",\"uf\":\"PR\",\"municipio\":\"QUATRO BARRAS\",\"chassi\":\"************15765\"}"
}
--------------------------------------------------------------------
START RequestId: bb58adef-10c6-11e8-af49-51266a119aff Version: $LATEST
END RequestId: bb58adef-10c6-11e8-af49-51266a119aff
REPORT RequestId: bb58adef-10c6-11e8-af49-51266a119aff	Duration: 1624.65 ms	Billed Duration: 1700 ms 	Memory Size: 1024 MB	Max Memory Used: 43 MB


sls invoke -f consultaPlaca -p ./placas/roubo-furto.json -l
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"0\",\"mensagemRetorno\":\"Sem erros.\",\"codigoSituacao\":\"1\",\"situacao\":\"Roubo/Furto\",\"modelo\":\"I/MMC L200 4X4\",\"marca\":\"I/MMC L200 4X4\",\"cor\":\"PRETA\",\"ano\":\"1992\",\"anoModelo\":\"1993\",\"placa\":\"FFF0012\",\"data\":\"13/02/2018 às 12:04:02\",\"uf\":\"SP\",\"municipio\":\"SAO PAULO\",\"chassi\":\"************01561\"}"
}
--------------------------------------------------------------------
START RequestId: be6662ab-10c6-11e8-86dc-35fd8c342c31 Version: $LATEST
END RequestId: be6662ab-10c6-11e8-86dc-35fd8c342c31
REPORT RequestId: be6662ab-10c6-11e8-86dc-35fd8c342c31	Duration: 991.36 ms	Billed Duration: 1000 ms 	Memory Size: 1024 MB	Max Memory Used: 46 MB


sls invoke -f consultaPlaca -p ./placas/invalida.json -l
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"1\",\"mensagemRetorno\":\"Erro no processamento da consulta.\"}"
}
--------------------------------------------------------------------
START RequestId: c0aafb47-10c6-11e8-af3f-9dfe05a9ec6a Version: $LATEST
END RequestId: c0aafb47-10c6-11e8-af3f-9dfe05a9ec6a
REPORT RequestId: c0aafb47-10c6-11e8-af3f-9dfe05a9ec6a	Duration: 508.87 ms	Billed Duration: 600 ms 	Memory Size: 1024 MB	Max Memory Used: 47 MB


sls invoke -f consultaPlaca -p ./placas/nao-encontrada.json -l
{
    "statusCode": 200,
    "body": "{\"codigoRetorno\":\"3\",\"mensagemRetorno\":\"Veículo não encontrado.\"}"
}
--------------------------------------------------------------------
START RequestId: c2aa9c36-10c6-11e8-be68-798f8807984c Version: $LATEST
END RequestId: c2aa9c36-10c6-11e8-be68-798f8807984c
REPORT RequestId: c2aa9c36-10c6-11e8-be68-798f8807984c	Duration: 692.35 ms	Billed Duration: 700 ms 	Memory Size: 1024 MB	Max Memory Used: 47 MB
```

## Remover função da AWS

  - DEV
  
    `sls remove -s dev`

    ```sh
    Serverless: Getting all objects in S3 bucket...
    Serverless: Removing objects in S3 bucket...
    Serverless: Removing Stack...
    Serverless: Checking Stack removal progress...
    ...........
    Serverless: Stack removal finished...
    ```

  - PROD

    `sls remove -s production`

    ```sh
    Serverless: Getting all objects in S3 bucket...
    Serverless: Removing objects in S3 bucket...
    Serverless: Removing Stack...
    Serverless: Checking Stack removal progress...
    ...........
    Serverless: Stack removal finished...
    ```


## Documentação

https://serverless.com/framework/docs/

## Créditos

Esse exemplo utiliza o package [sinesp-nodejs](https://github.com/bbarreto/sinesp-nodejs) do [@bbarreto](https://github.com/bbarreto)


## Contribuição

Se você quer melhorar esse exemplo basta enviar um [Pull Request](https://github.com/wgenial/consulta-placa-serverless/compare) ✌️

## Licença

[MIT](https://github.com/wgenial/consulta-placa-serverless/blob/master/LICENSE.md)


## Observação

Este projeto não possui nenhum vínculo oficial com o Sistema Nacional de Informações de Segurança Pública (SINESP). O software é disponibilizado da forma como está aqui e não há garantias que ele irá funcionar sempre. Como a API do SINESP não é publicamente documentada, esta biblioteca pode parar de funcionar a qualquer momento sem aviso prévio.