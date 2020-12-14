extern crate neon;
extern crate chrono;
extern crate time;
extern crate once_cell;
extern crate serde;
extern crate serde_json;

use neon::prelude::*;
use neon::register_module;
use chrono::prelude::*;
use time::Duration;
use std::fs;
use std::sync::RwLock;
use std::collections::HashMap;
use serde::{Serialize, Deserialize};
use once_cell::sync::Lazy;

#[derive(Serialize, Deserialize, Debug)]
struct SubProject {
    tasks: Vec<Task>,
    name: String,
    description: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Task {
    name: String,
    time: Duration,
    tags: Tag,
    contexts: TaskContext,
    description: String,
    duedate: Vec<DateTime<Utc>>,
    dodate: Vec<DateTime<Utc>>,
    completed: bool,
    finished: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskContext(u64);


#[derive(Serialize, Deserialize, Debug)]
pub struct Tag(u64);

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
    subprojects: HashMap<String, SubProject>,
    tasks: HashMap<String, Task>,
    name: String,
    description: String,
    clearance: u8,
    worktime: Duration,
    complete: u8,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ProjectTest {
    name: String,
    date: DateTime<Utc>,
    time: Duration
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MetaData {
    tags: Vec<String>,
    contexts: Vec<String>,
}
impl State {
    fn new() -> State {
        let projects = fs::read_to_string("projects.json").expect("Error");
        let metadata = fs::read_to_string("metadata.json").expect("Error");
        let inbox = fs::read_to_string("inbox.json").expect("Error");
        State {
            inbox: serde_json::from_str(&inbox).unwrap(),
            projects: serde_json::from_str(&projects).unwrap(),
            metadata: serde_json::from_str(&metadata).unwrap(),
        }
    }
    pub fn change(&mut self) {
        self.metadata.tags[0] = "testing".to_string();
    }
    pub fn basic(&self) -> String {
        self.metadata.tags[0].clone()
    }
}
pub static STATE: Lazy<RwLock<State>> = Lazy::new(|| {
    RwLock::new(State::new()) 
});
// at some point this will have to be a cacher an not just called on load
#[derive(Serialize, Deserialize, Debug)]
pub struct State {
    inbox: Vec<Task>,
    projects: Vec<Project>,
    metadata: MetaData
}


fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string((*STATE.read().unwrap()).basic()))
}

register_module!(mut cx, { cx.export_function("hello", hello) });
