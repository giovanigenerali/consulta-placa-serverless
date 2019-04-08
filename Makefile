all: invoke-local invoke
.PHONY: all

invoke-development:
	sls invoke local -f consultaPlaca -p ./placas/sem-restricao.json
	sls invoke local -f consultaPlaca -p ./placas/roubo-furto.json
	sls invoke local -f consultaPlaca -p ./placas/invalida.json
	sls invoke local -f consultaPlaca -p ./placas/nao-encontrada.json

invoke-production:
	sls invoke -f consultaPlaca -p ./placas/sem-restricao.json -l
	sls invoke -f consultaPlaca -p ./placas/roubo-furto.json -l
	sls invoke -f consultaPlaca -p ./placas/invalida.json -l
	sls invoke -f consultaPlaca -p ./placas/nao-encontrada.json -l