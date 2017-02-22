# UI Blog Programming Test

This implementation is focused on producing highly-minified JavaScript and
limiting the number of front-end assets that are loaded, for the purpose of
producing an extremely fast experience.

I used several libraries of my own:

* [chug](https://github.com/lighterio/chug) - An asset builder.
* [cute](https://github.com/lighterio/cute) - A front-end library, built for
  minification.
* [lighter-json](https://github.com/lighterio/lighter-json) - A JSON library
  with non-strict options (e.g. for stringifying functions, etc.)
* [ltl](https://github.com/lighterio/ltl) - A fast front-end template language.

The reasons behind the usage of these libraries was to demonstrate that the
entire application's JS and CSS could be wrapped up into a single JavaScript
file that's currently **3.22kb gzipped** (7.17kb uncompressed). This is made
possible buy the [`build.js`](https://github.com/zerious/ui-blog/blob/master/build.js)
script (with help afterward from [Closure Compiler](http://closure-compiler.appspot.com/home)).

## Disclaimer

This is just a first pass. The UI is not that great, and it has only been tested
in Chrome on OSX. Additionally, some of the libraries I've used have little or
no documentation, and I would never use such libraries in a production system.

#### Bugs

1. There's no validation.
1. Textarea should be a WYSIWYG editor (or at least a markdown editor).
1. The "Posts" menu links don't really go anywhere.
1. There's no data validation.
1. UglifyJS should achieve ~3.22kb without Closure Compiler.

## Setup

#### Prerequisites
1. Install the [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Maven](https://maven.apache.org/download.cgi).
2. Add JDK and Maven bin directories to your path, and ensure that `java` and `mvn` commands resolve properly.

#### UI Blog
```bash
# 1. Clone this repository.
git clone https://github.com/zerious/ui-blog
cd ui-blog

# 2. Start the jetty server.
mvn jetty:run

# 3. Visit the website.
open http://localhost:8080/app/blog.html
```

## Development

There is no auto-build script (yet), so the `.ltl` files must be compiled
after each change, using the following command:

```
node build
```

After building, the versions of files inside `src/main/webapp` should be
updated. For debugging, it may be helpful to use the dev endpoint, and for the
fastest experience, use the prod endpoint:
* dev: http://localhost:8080/app/dev.html
* prod: http://localhost:8080/app/blog.html

## Future

#### Internationalization
Not sure if this is helpful for a simple blog, but it's a possibility.

#### Tests
I could add UI tests with SouceLabs.

#### Replace Jetty with Node?
The blog service is extremely simple, and it could be easily re-created in
node. The installation instructions could be far easier, and the server output
would be less verbose.

#### Library Improvements
The build process that I put together into `build.js` is similar to something I
had used inside the Lighter framework, but there are still some bugs. Before
expecting others to use Lighter, Ltl or Cute, I'll need to work out the kinks.
