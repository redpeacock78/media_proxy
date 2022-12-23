env :=

up:
ifeq ($(env), develop)
	@docker-compose -f dev/docker-compose.yml up || exit 0
else
	@docker-compose up -d || exit 0
endif

down:
ifeq ($(env), develop)
	@docker-compose -f dev/docker-compose.yml down --volumes --remove-orphans
else
	@docker-compose down --volumes --remove-orphans
endif

install:
ifeq ($(env), develop)
	@docker-compose -f dev/docker-compose.yml run app yarn install
else
	@docker-compose run app yarn install
endif