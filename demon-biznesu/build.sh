#!/bin/sh
cd "$(dirname "$0")" && cat part1.html part2.js part3.js > index.html && echo '</script></body></html>' >> index.html && echo zbudowano
