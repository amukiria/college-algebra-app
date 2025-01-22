export default function SetsLesson() {
  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">Lesson: Sets</h1>

      {/* Introduction to Sets */}
      <p>
        A set is a collection of distinct objects, considered as an object in its own right.
        The objects in a set are called the <strong>elements</strong> or <strong>members</strong> of the set.
      </p>
      <p className="mt-4">
        Here are some examples of sets:
      </p>
      <ul className="list-disc ml-8 mt-4">
        <li>The set of natural numbers: {"{1, 2, 3, ...}"}</li>
        <li>The set of vowels in the English alphabet: {"{a, e, i, o, u}"}</li>
      </ul>

      {/* Types of Sets */}
      <h2 className="text-2xl font-semibold mt-8">Types of Sets</h2>
      <ul className="list-disc ml-8 mt-4">
        <li><strong>Finite Set:</strong> A set with a limited number of elements. Example: {"{1, 2, 3}"}</li>
        <li><strong>Infinite Set:</strong> A set with an unlimited number of elements. Example: {"{1, 2, 3, 4, ...}"}</li>
        <li><strong>Subset:</strong> A set A is a subset of B if every element of A is also an element of B. Example: If A = {"{1, 2}"} and B = {"{1, 2, 3}"}, then A ⊆ B.</li>
        <li><strong>Proper Subset:</strong> A proper subset of a set A is a subset that is not equal to the original set. Example: If A = {"{1, 2}"} and B = {"{1, 2, 3}"}, then A ⊂ B.</li>
        <li><strong>Universal Set:</strong> The set that contains all elements under consideration for a particular problem. Example: {"{1, 2, 3, 4, 5, ...}"}</li>
        <li><strong>Empty Set:</strong> A set with no elements. Example: {"{}"}</li>
      </ul>

      {/* Set Operations */}
      <h2 className="text-2xl font-semibold mt-8">Set Operations</h2>
      <p className="mt-4">
        Sets can be combined or compared using operations such as <strong>union</strong>, <strong>intersection</strong>, <strong>difference</strong>, and <strong>complement</strong>.
      </p>

      <h3 className="text-xl font-semibold mt-6">Union of Sets</h3>
      <p>The <strong>union</strong> of two sets is the set of all elements that are in either set. It is denoted as <strong>A ∪ B</strong>.</p>
      <pre>{`Example: A = {1, 2, 3}, B = {3, 4, 5}
A ∪ B = {1, 2, 3, 4, 5}`}</pre>

      <h3 className="text-xl font-semibold mt-6">Intersection of Sets</h3>
      <p>The <strong>intersection</strong> of two sets is the set of all elements common to both sets. It is denoted as <strong>A ∩ B</strong>.</p>
      <pre>{`Example: A = {1, 2, 3}, B = {3, 4, 5}
A ∩ B = {3}`}</pre>

      <h3 className="text-xl font-semibold mt-6">Difference of Sets</h3>
      <p>The <strong>difference</strong> of two sets is the set of all elements that are in the first set but not in the second set. It is denoted as <strong>A - B</strong>.</p>
      <pre>{`Example: A = {1, 2, 3}, B = {3, 4, 5}
A - B = {1, 2}`}</pre>

      <h3 className="text-xl font-semibold mt-6">Complement of a Set</h3>
      <p>The <strong>complement</strong> of a set consists of all elements in the universal set that are not in the given set. It is denoted as <strong>A'</strong>.</p>
      <pre>{`Example: Universal Set = {1, 2, 3, 4, 5}, A = {1, 2, 3}
A' = {4, 5}`}</pre>

      {/* Venn Diagrams */}
      <h2 className="text-2xl font-semibold mt-8">Venn Diagrams</h2>
      <p>Venn diagrams are used to visualize set relationships. The circles represent sets, and the overlaps represent intersections.</p>
      <p className="mt-4">
        Example: Consider the sets A = {"{1, 2, 3}"} and B = {"{3, 4, 5}"}. The Venn diagram will show:
      </p>
      <ul className="list-disc ml-8 mt-4">
        <li>Elements {"{1, 2}"} are only in A.</li>
        <li>Elements {"{4, 5}"} are only in B.</li>
        <li>Element {"3"} is in both sets.</li>
      </ul>

      {/* Practice Problems */}
      <h2 className="text-2xl font-semibold mt-8">Practice Problems</h2>
      <p className="mt-4">
        Try these problems to solidify your understanding of sets:
      </p>
      <ul className="list-decimal ml-8 mt-4">
        <li>Let A = {"{2, 4, 6, 8}"} and B = {"{1, 3, 5, 7, 9}"}. Find A ∪ B and A ∩ B.</li>
        <li>If U = {"{1, 2, 3, 4, 5, 6}"} and A = {"{1, 2, 4}"} find A' (the complement of A).</li>
        <li>Draw a Venn diagram to represent A = {"{a, b, c}"} and B = {"{b, c, d}"}.</li>
      </ul>

      {/* Conclusion */}
      <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
      <p>
        Sets are an essential concept in mathematics and are used to organize and analyze objects. Understanding set operations is crucial for solving a wide range of problems.
      </p>
    </div>
  );
}
