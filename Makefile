.PHONY: all clean test
ARTIFACT=carbuncle.html
DEPENDENCIES=css.css $(wildcard *.js) html.html

TEST_ARTIFACT=demo.html
TEST_DEPENDENCIES=$(DEPENDENCIES) testing.css

UTILS=$(wildcard utils/*)

SASS=sass
SASS_FLAGS=
SCSS=$(wildcard frames/*.scss)

ASM=./assemble

all: $(ARTIFACT)

test: $(TEST_ARTIFACT)
	open $^

$(TEST_ARTIFACT): $(TEST_DEPENDENCIES)
	$(ASM) $^ -o $@

$(ARTIFACT): $(DEPENDENCIES)
	$(ASM) $^ -o $@

clean:
	rm -f $(ARTIFACT) $(TEST_ARTIFACT) css.css *.map

css.css: main.scss $(SCSS) $(UTILS)
	$(SASS) $< $(SASS_FLAGS) $@
