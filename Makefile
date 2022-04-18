ng=. nodeenv/bin/activate && ng
npm=. nodeenv/bin/activate && npm
node=. nodeenv/bin/activate && node
port=4200

version:
	@ echo "node: $(shell . nodeenv/bin/activate && node --version)"
	@ echo "npm: v$(shell . nodeenv/bin/activate && npm --version)"
	@ echo "ng: v$(shell . nodeenv/bin/activate && ng --version | grep 'Angular CLI' | grep -Po '[0-9.]+')"

clean:
	@ rm -rf node_modules
	@ rm -rf dist

env:
	@ nodeenv --node=10.15.3 --prebuilt nodeenv

run:
	@ $(ng) serve

install: clean
	@ $(npm) install

build:
	@ $(ng) build --prod

test:
	@ $(ng) test --code-coverage

audit:
	@ $(npm) audit

e2e-test:
	@ $(npm) run e2e

lint:
	@ $(ng) lint

docker-build: build
	@ docker build -t vaccination-inventory-front .

docker-run: docker-build
	@ docker stack deploy --with-registry-auth -c docker-compose.local.yml vaccination-inventory-front

docker-init:
	@ docker network create --driver overlay --scope swarm mega_picking_network || true
	@ docker volume create mega_picking_front_logs || true

docker-status:
	@ docker stack ps vaccination-inventory-front

docker-stop:
	@ docker stack rm vaccination-inventory-front

docker-log:
	@ docker service logs -f vaccination-inventory-front

docker-bash:
	@ docker run -it --rm --entrypoint /bin/bash \
		-v megapos_front_logs:/var/log/nginx \
		vaccination-inventory-front

sonar:
	@ docker run -it --rm -v $(shell pwd):/usr/src newtmitch/sonar-scanner -Dsonar.projectBaseDir=/usr/src -Dsonar.login=$(token)

pid:
	sudo lsof -i :$(port)

report:
	ng test --code-coverage
	firefox coverage/index.html

tag:
	@ git checkout develop
	@ git merge master
	@ git tag release-v$(version)
	@ git push origin develop
	@ git push --tags
	@ git checkout master
	@ git merge release-v$(version)
	@ git push origin master
	@ git checkout develop

update-tag:
	@ sed -i -e 's/GIT_TAG/'$(GIT_TAG)'/g' docker-compose.prod.yml