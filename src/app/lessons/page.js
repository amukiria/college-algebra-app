import Link from "next/link";

const topics = [
  { title: "Sets", path: "/lessons/sets", description: "Learn and practice operations on sets." },
  { title: "Polynomials", path: "/lessons/polynomials", description: "Master polynomials and their operations." },
  { title: "Factoring Expressions", path: "/lessons/factoring", description: "Learn advanced factoring techniques." },
  { title: "Rational Expressions", path: "/lessons/rational-expressions", description: "Simplify and operate on rational expressions." },
  { title: "Linear Equations", path: "/lessons/linear-equations", description: "Solve linear equations and real-world problems." },
  { title: "Quadratic Equations", path: "/lessons/quadratics", description: "Solve quadratic equations using multiple methods." },
];

export default function Dashboard() {
  return (
    <div className="p-8 bg-secondary min-h-screen text-text">
      <h1 className="text-4xl font-bold text-accent mb-8">MTH 1109 - College Algebra Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="p-6 bg-primary rounded-lg shadow hover:shadow-lg">
            <h2 className="text-2xl font-bold text-accent">{topic.title}</h2>
            <p className="mt-2">{topic.description}</p>
            <div className="mt-4">
              <Link
                href={`${topic.path}/lesson`}
                className="text-blue-500 hover:underline mr-4"
              >
                View Lesson
              </Link>
              <Link
                href={`${topic.path}/practice`}
                className="text-blue-500 hover:underline"
              >
                Practice Exercises
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
