"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { uploadData } from "aws-amplify/storage";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const {signOut} = useAuthenticator();
  const [file, setFile] = useState<File | undefined>(undefined);

  function handleFileChange (event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0]);
  }

  function handleFileClick() {
    if (file != undefined) {
        try {
            uploadData({path: "files/" + file.name, data: file});
            console.log("Success!");
        } catch (error) {
            console.log("Failed: " + error);
        }
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({id});
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    let cont = window.prompt("Todo content");
    if (cont != null) {
        console.log("Content " + cont);
        let dif = window.prompt("LOW, MEDIUM, or HIGH difficulty?", "LOW");
        if (dif != "LOW" && dif != "MEDIUM" && dif != "HIGH") {
            client.models.Todo.create({
                content: cont,
                difficulty: "LOW"
            });
        } else {
            console.log(client.models.Todo.create({
                content: cont,
                difficulty: dif
            }));
        }
    }
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li className={todo.difficulty ? todo.difficulty : "LOW"} key={todo.id}>{todo.content}    <span onClick={() => deleteTodo(todo.id)}>x</span></li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
      <div>
        {/* <input type="file" onChange={handleFileChange}/> */}
        {/* <button onClick={handleFileClick}>Upload File</button> */}
      </div>
    </main>
  );
}
