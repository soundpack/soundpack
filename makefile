# Opens 3 terminal tabs to run mongo, gnats, and each service
start:
	@case "$(shell uname -s)" in \
		Darwin*) \
			ttab "kubectl port-forward svc/soundpack-mongodb 27017:27017" \
			&& ttab "cd ${JUICE_SRC}/soundpack/api;code ." \
			&& ttab "cd ${JUICE_SRC}/soundpack/api;npm run start" \
			&& ttab "cd ${JUICE_SRC}/soundpack/mobile;code ." \
			&& ttab "cd ${JUICE_SRC}/soundpack/mobile;npm run ios;bash";; \
		*) \
			echo "Terminal not yet supported"; \
	esac

# Opens 3 terminal tabs to run mongo, gnats, and each service
start-local:
	@case "$(shell uname -s)" in \
		Linux*) \
			gnome-terminal --tab --command "mongod --dbpath ${JUICE_SRC}/local-db/mongo" \
			--tab --command "nats-server" \
			--tab -e '/bin/bash -c "cd ${JUICE_SRC}/SelloutPlatform/common; npm run start"' \
			--tab --execute bash -c "cd ${JUICE_SRC}/SelloutPlatform/scripts; node forEachService.js \"npm run start\";bash";; \
		Darwin*) \
			ttab -w "mongod --dbpath ${JUICE_SRC}/local-db/mongo" \
			&& ttab -w "nats-server" \
			&& ttab -w "cd ${JUICE_SRC}/SelloutPlatform/common;npm run start" \
			&& ttab -w "cd ${JUICE_SRC}/SelloutPlatform/scripts;node forEachService.js \"npm run start\";bash";; \
		*) \
			echo "Terminal not yet supported"; \
	esac

mongo:
	kubectl port-forward svc/soundpack-mongodb 27017:27017