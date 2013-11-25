PLOVR_JAR = plovr-81ed862.jar
SRC = $(shell find src -name \*.js)

all: lint dist/vgps3.js

dist/vgps3.js: $(PLOVR_JAR) build/make.js $(SRC)
	java -jar $(PLOVR_JAR) build build/make.js --create_source_map dist/vgps3.map.js

lint:
	gjslint $(SRC) --jslinterror well_formed_author --jslinterror no_braces_around_inherit_doc --jslinterror braces_around_type --jslinterror optional_type_marker --jslinterror unused_private_members

fixjs:
	fixjsstyle --strict $(SRC)

serve:
	java -jar $(PLOVR_JAR) serve build/make.dev.js

$(PLOVR_JAR):
	curl https://plovr.googlecode.com/files/$(notdir $@) >$@
