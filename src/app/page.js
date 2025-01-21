export default function Dashboard() {
  const topics = [
    { title: "Sets", path: "/lessons/sets", description: "Learn and practice operations on sets." },
    { title: "Polynomials", path: "/lessons/polynomials", description: "Master polynomials and their operations." },
    { title: "Factoring Expressions", path: "/lessons/factoring", description: "Learn advanced factoring techniques." },
    { title: "Rational Expressions", path: "/lessons/rational-expressions", description: "Simplify and operate on rational expressions." },
    { title: "Linear Equations", path: "/lessons/linear-equations", description: "Solve linear equations and real-world problems." },
    { title: "Quadratic Equations", path: "/lessons/quadratics", description: "Solve quadratic equations using multiple methods." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic, index) => (
        <div key={index} className="p-6 bg-lightNeutral rounded-lg shadow hover:shadow-lg">
          <h2 className="text-2xl font-heading text-darkNavy">{topic.title}</h2>
          <p className="mt-2 text-grayNeutral">{topic.description}</p>
          <div className="mt-4">
            <a
              href={`${topic.path}/learn`}
              className="text-coral hover:text-salmon underline"
            >
              Learn
            </a>
            <a
              href={`${topic.path}/practice`}
              className="ml-4 text-coral hover:text-salmon underline"
            >
              Practice Exercises
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
