# Organization App (name TBD)
## What is this?
* It's an app that is designed to be my master productivity tool. It combines GTD
  methodology with pomodoro concepts and various other productivity philosophies
  into a tool which I believe can replace todoist, omnifocus, etc.
## What technologies does this use and why?
### Electron
* I know that electron is a RAM hungry mess and certainly agree that there's no real reason to package an entire chrome browser with every application, but the only other cross platform option that isn't super hacky is flutter and it's not very mature (also, I can write for the web already and I'm a lazy developer).
### Vue
* I know vuejs, vue3 looks cool and I don't want to learn react.
* Neon probably will replace a lot of vue functionality, but I still like it.
* I'm using ES6 modules to load my code, because using pikaweb you can still use full, .vue single page page components without the hassle of CDN vuejs which is frankly a mess.
* <rant> Why no webpack? I tried webpack and vue-cli for too long. Long rant short, webpack is incredibly difficult because of how it ties to electron, and how electron and vue tie together, and how vue uses a non-standard webpack implementation obfuscated away behind vue-cli so you don't have full control, and how webpackv4 (which is the latest version vue supports) ties to node native modules, and how the paths work with vue building to dist, and how even doing your own webpack config with vue-loader is near impossible because there's a reason that vue-cli abstracts this mess away and anyway getting the right version for webpack5 to work is super difficult (Also the whole point of webpack is to make adding things like vuetify easy which having a custom webpack config defeats). Long story short, it's untenable unless you want to assign an entire dev team months to figure it out - and you'll still be left with a black box of dependencies and hacks that is impossible to update, upgrade or even maintain. </rant> Though, a rolling a custom webpack configuration is something that I'll consider if the project gets that big.
### Neon
* This is the one technology you may not know. Neon is bindings between node-native-modules (pieces of C++ node can run locally) and rust, allowing memory safe performant native code to be written.
* I don't want my application to be a sluggish JS mess, so I needed to be able to write
  my backend in Rust (I wanted this to be my first big rust project). Rust's gui ecosystem is pretty fragmented. So there were a bunch of options, I'll go over the ones I seriously considered:
    - electron_ffi - Pro: I can write html, css, and js, cross platform. Con: No modern support
    - WASM - Pro: Modern technology, lots of support, cross platform. Con: No very mature, file system access would've been a mess
    - All flavors of Qt/ GTK - Pro: Fast, lightweight. Cons: Cross platform support would be *interesting*, I don't really want to learn Qt/ GTK, not very mature, pretty ugly, Qt licensing mess.
    - Flutter - Pro: cross platform (semi, I would have to borrow a mac), pretty, fast. Con: Learning a new UI framework, not very mature.
    - Neon - Pro: Fast, I can use electron (so it'll be pretty), cross platform, high API coverage. Con: Electron :(
* If you want a comprehensive write up on Rust GUI, there should a be a guide coming on my blog soon™
## How do I work on this?
### 1. Set up neon electron environment
```bash
export npm_config_target=9.1.1 # (latest version of electron at time of writing)
export npm_config_arch=x64
export npm_config_target_arch=x64
export npm_config_disturl=https://electronjs.org/headers # Yes, this makes it so you download the headers each time you rebuild, but it's the least complex option - and I separated build and rebuild so you don't *have* to have an internet connection to develop.
export npm_config_runtime=electron
export npm_config_build_from_source=true
$ npm install
$ npm run build
$ npm start
```
### 2. Set up vue environment
```bash
# Pikaweb is a really cool tool that gets rid of webpack and allows ESM modules to be loaded
# I have a basic config with vue and vue-router
# vueHttpLoader loads the .vue files as .js
$ npx @pika/web
```
### 3. Packaging for distribution
* Just getting this working was enough of a mess, I don't want to do my electron-builder config right now, but it looks like it'll work once I actually configure.