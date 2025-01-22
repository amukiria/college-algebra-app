export default function SetsLesson() {
    return (
      <div className="p-8 bg-secondary min-h-screen text-text">
        <h1 className="text-4xl font-bold text-accent mb-8">Lesson: Sets</h1>
        <p>
          A set is a collection of distinct objects, considered as an object in its own right.
          Examples include:
        </p>
        <ul className="list-disc ml-8 mt-4">
          <li>The set of natural numbers: {`{1, 2, 3, ...}`}</li>
          <li>The set of vowels in the English alphabet: {`{a, e, i, o, u}`}</li>
        </ul>
        <p className="mt-4">
          Common operations on sets include union, intersection, difference, and complement. 
          These operations help us understand relationships between different collections.
        </p>
      </div>
    );
  }
  