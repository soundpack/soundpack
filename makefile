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

mongo:
	kubectl port-forward svc/soundpack-mongodb 27017:27017