const data = require('./catalog.json');
const table = require('markdown-table');

function tableByType(type) {
    let t = [['Image', 'Args', 'Description', 'Example', 'Source', 'Toolchain']];
    data.filter(r => r.type === type).forEach(r => {
        let desc = r.description;
        if (r.demo === true) {
            desc = '[Demo] ' + desc;
        }
        let example = ``;
        if (r.example != undefined) {
          example = `[Example](${r.example})`;
        }
        const source = `[Source](${r.source})`;
        let toolchain = ``;
        if (r.toolchain === "../../../producer/functions/golang/") {
          toolchain = `[Go Library](${r.toolchain})`;
        } else if (r.toolchain === "../../../producer/functions/ts/") {
          toolchain = `[Typescript SDK](${r.toolchain})`;
        } else if (r.toolchain === "../../../producer/functions/starlark/") {
          toolchain = `[Starlark Runtime](${r.toolchain})`;
        }
        t.push([r.image, r.args, desc, example, source, toolchain]);
    });
    return table(t);
}

const README = `---
title: "Functions Catalog"
linkTitle: "Functions Catalog"
weight: 6
type: docs
description: >
    Catalog of Config Functions.
---

<!---
DO NOT EDIT. Generated by: "cd catalog; npm run gen-docs"
-->

This repository documents a catalog of functions implementing [Configuration Functions Specification][spec].

Run functions either imperatively or declaratively by following the [Functions User Guide].

Implement configuration functions using any toolchain such as the [Typescript SDK][ts sdk] or [Golang Libraries][go libs].

Note: Source functions and sink functions are *functions*. They are invoked by command \`kpt fn run\` instead of \`kpt fn source\` or \`kpt fn sink\`.
\`kpt fn source\` and \`kpt fn sink\` commands are running specified builtin functions.

## Sources

See [definition of source functions][source].

${tableByType('source')}

Note: Source functions are *function*. They are invoked by command \`kpt fn run\` instead of \`kpt fn source\`.

## Sinks

See [definition of sink functions][sink].

${tableByType('sink')}

Note: Sink functions are *function*. They are invoked by command \`kpt fn run\` instead of \`kpt fn sink\`.

## Validators

${tableByType('validator')}

## Generators

${tableByType('generator')}

## Transformers

${tableByType('transformer')}

## Miscellaneous

${tableByType('misc')}

[spec]: https://github.com/kubernetes-sigs/kustomize/blob/master/cmd/config/docs/api-conventions/functions-spec.md
[Functions User Guide]: ../
[source]: ../../../../concepts/functions/#source-function
[sink]: ../../../../concepts/functions/#sink-function
[ts sdk]: ../../../producer/functions/ts/
[go libs]: ../../../producer/functions/golang/`;

console.log(README);
