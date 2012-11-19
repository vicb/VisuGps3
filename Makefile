PLOVR_JAR = plovr-eba786b34df9.jar
SRC = $(shell find src -name \*.js)

all: lint dist/vgps3.js

dist/vgps3.js: $(PLOVR_JAR) make.js $(SRC)
	java -jar $(PLOVR_JAR) build make.js

lint:
	gjslint $(SRC) --jslinterror well_formed_author --jslinterror no_braces_around_inherit_doc --jslinterror braces_around_type --jslinterror optional_type_marker --jslinterror unused_private_members

fixjs:
	fixjsstyle --strict $(SRC)

serve:
	java -jar $(PLOVR_JAR) serve make.dev.js

PLOVR_JAR:
	curl https://plovr.googlecode.com/files/$(notdir $@) >$@
