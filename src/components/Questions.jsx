import { useState, useEffect } from "react";
import Question from "./Question";
import Loading from "./Loading";
import "./Questions.scss";
const url =
  "https://raw.githubusercontent.com/programmer-rahad/json-files/main/questions.json";

function Questions() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const questions = await response.json();
      setLoading(false);
      setQuestions(questions);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) return <Loading />;

  return (
    <main>
      <section className="container">
        <h1> Frequently Asked Questions </h1>
        {questions.map((question, index) => (
          <Question key={question.id} {...question} index={index} />
        ))}
      </section>
    </main>
  );
}

export default Questions;
