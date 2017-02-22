# cba

```
npm install -g
npm link
```

```
Usage: cba [options] [command]


  Commands:

    transaction|trans [options] <output> <files...>  parse transactions

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:

    $ cba transaction --type current ./path/to/output.csv ./path/to/file1.csv ./path/to/file2.csv
    $ cba transaction --type saving ./path/to/output.csv ./path/to/file.csv
    $ cba transaction --t current ./path/to/output.csv ./path/to/file.csv
    $ cba transaction ./path/to/output.csv ./path/to/file.csv
    $ cba trans ./path/to/output.csv ./path/to/file.csv
```
