# Organization App (name TBD)
## What is this?
* It's an app that is designed to be my master productivity tool. It combines GTD
  methodology with pomodoro concepts and various other productivity philosophies
  into a tool which I believe can replace todoist, omnifocus, etc.
## What technologies does this use and why?
### Electron
* I know that electron is a RAM hungry mess and certainly agree that there's no real reason to package an entire chrome browser with every application, but the only other cross platform option that isn't super hack-y is flutter and it's not very mature (also, I can write for the web already and I'm a lazy developer).
### Vue
* I know vuejs, vue3 looks cool and I don't want to learn react.
* Neon probably will replace a lot of vue functionality, but I still like it.
* If you saw version 0.1.0 you'll know that I was using a pikaweb (explained below), I finally got around to configuring webpack so everything works properly—which was a headache, like all things webpack. If you want to see a clean version that you can start with, checkout my boilerplate quickstart [repo](https://github.com/muchanem/vue-electron-neon-quickstart)
* Here's an explanation of [pika](https://www.pika.dev/about), a really cool technology that I was previously using to replace webpack. It uses ES6 modules to load your code, because using pika you can still use full, .vue single page page components without the hassle of CDN vuejs which is frankly a mess.
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
$ npm install
$ npm run build
$ npm electron:serve
```
### 2. Packaging for distribution
* Just getting this working was enough of a mess, I don't want to do my electron-builder config right now, because the native modules stuff is pretty hacky.
