import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Admin from "./components/Admin";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });


    // Load the external script dynamically
    const script = document.createElement("script");
    script.src = "./connect.js";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      console.log("External script loaded successfully.");
      // If `connect.js` exposes global functions, they will be available now.
    };

    script.onerror = () => {
      console.error("Failed to load the external script.");
    };

    document.body.appendChild(script);
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">HealthChat</h1>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#login" className="btn" onClick={signOut}>Logout</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Empowering Health Conversations</h1>
            <p>
              HealthChat connects you with certified health professionals and 
              AI-powered health assistants to get personalized health advice, anytime.
            </p>
            <div className="hero-buttons">
              <a href="#get-started" className="btn-primary">Get Started</a>
              <a href="#learn-more" className="btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Health Chat Illustration"
            />
          </div>
        </div>
      </section>
      {/* <button >Sign out</button> */}
      </>
  );
}

export default App;
