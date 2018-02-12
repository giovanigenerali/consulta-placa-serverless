all: invoke-local invoke
.PHONY: all

invoke-local:
	sls invoke local -f consultaPlaca -p ./placas/sem-restricao.json
	sls invoke local -f consultaPlaca -p ./placas/roubo-furto.json
	sls invoke local -f consultaPlaca -p ./placas/invalida.json
	sls invoke local -f consultaPlaca -p ./placas/nao-encontrada.json

invoke:
	sls invoke -f consultaPlaca -p ./placas/sem-restricao.json
	sls invoke -f consultaPlaca -p ./placas/roubo-furto.json
	sls invoke -f consultaPlaca -p ./placas/invalida.json
	sls invoke -f consultaPlaca -p ./placas/nao-encontrada.json