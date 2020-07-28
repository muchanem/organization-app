#[macro_use]
extern crate neon;
use neon::register_module;
use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node from Rust"))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
