PLOVR_JAR = plovr-eba786b34df9.jar
SRC = $(shell find src -name \*.js)

all: dist/vgps3.js

dist/vgps3.js: $(PLOVR_JAR) make.js $(SRC)
	java -jar $(PLOVR_JAR) build make.js

serve:
	java -jar $(PLOVR_JAR) serve make.dev.js

PLOVR_JAR:
	curl https://plovr.googlecode.com/files/$(notdir $@) >$@
