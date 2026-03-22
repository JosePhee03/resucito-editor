import { useState, type JSX } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <main className="w-screen h-screen flex p-8 gap-8 dark:bg-neutral-900 dark:text-white">
      <section className="flex flex-col gap-4 w-full h-full ">
        <span className="font-bold dark:text-red-400">Escribir canto</span>
        <textarea
          className="w-full h-full p-4 font-mono dark:bg-neutral-800"
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="# Title"
        />
      </section>
      <section className="w-full h-full flex flex-col gap-4">
        <span className="font-bold dark:text-red-400">Formato de Canto</span>
        <ParseText text={text} />
      </section>
    </main>
  );
}

function ParseText({ text }: { text: string }) {
  const lines = text.split("\n");

  const elements: JSX.Element[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      elements.push(
        <h1 className="font-bold dark:text-red-400 text-2xl" key={i}>
          {line.slice(2)}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 className="dark:text-neutral-100 font-bold text-lg" key={i}>
          {line.slice(3)}
        </h2>,
      );
    } else if (line.match(/\[/)) {
      elements.push(parseChords(line));
    } else {
      elements.push(<pre key={i}>{line}</pre>);
    }
  }

  return (
    <pre className="w-full h-full p-4 dark:bg-neutral-950">{elements}</pre>
  );
}

function parseChords(line: string) {
  let bufferChord = "";
  let bufferLyric = "";

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === "[") {
      i++;
      while (line[i] !== "]" && i < line.length) {
        const padIndex = bufferLyric.length - bufferChord.length;
        bufferChord += line[i].padStart(padIndex, " ");
        i++;
      }
    } else {
      bufferLyric += char;
    }
  }

  console.log({
    bufferChord,
    split: bufferChord.split(/(\s+)/),
  });

  const chordComponent = bufferChord.split(/(\s+)/).map((c) => {
    return (
      <span
        className={`${!/(\s+)/.test(c) ? "hover:cursor-pointer" : ""} font-bold  dark:text-red-400`}
      >
        {c}
      </span>
    );
  });

  return (
    <>
      {[...chordComponent]}
      <br />
      <span>{bufferLyric}</span>
    </>
  );
}

export default App;
