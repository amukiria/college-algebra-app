export default function Dashboard() {
  const topics = [
    { 
      title: "Sets", 
      path: "/lessons/sets", 
      description: "Learn and practice operations on sets.", 
      links: [
        { title: "Learn", path: "/lessons/sets/learn" },
        { title: "Practice Exercises", path: "/lessons/sets/practice" }
      ]
    },
    { 
      title: "Polynomials", 
      path: "/lessons/polynomials", 
      description: "Master polynomials and solve engaging puzzles.", 
      links: [
        { title: "Learn", path: "/lessons/polynomials/learn" },
        { title: "Practice Exercises", path: "/lessons/polynomials/practice" }  // Now pointing to Polynomial Puzzle
      ]
    },
    { 
      title: "Factoring Expressions", 
      path: "/lessons/factoring", 
      description: "Learn advanced factoring techniques.",
      links: [
        { title: "Learn", path: "/lessons/factoring/learn" },
        { title: "Practice Exercises", path: "/lessons/factoring/practice" }
      ]
    },
    { 
      title: "Rational Expressions", 
      path: "/lessons/rational-expressions", 
      description: "Simplify and operate on rational expressions.",
      links: [
        { title: "Learn", path: "/lessons/rational-expressions/learn" },
        { title: "Practice Exercises", path: "/lessons/rational-expressions/practice" }
      ]
    },
    { 
      title: "Linear Equations", 
      path: "/lessons/linear-equations", 
      description: "Solve linear equations and real-world problems.",
      links: [
        { title: "Learn", path: "/lessons/linear-equations/learn" },
        { title: "Practice Exercises", path: "/lessons/linear-equations/practice" }
      ]
    },
    { 
      title: "Quadratic Equations", 
      path: "/lessons/quadratic-equations", 
      description: "Solve quadratic equations using multiple methods.",
      links: [
        { title: "Learn", path: "/lessons/quadratics/learn" },
        { title: "Practice Exercises", path: "/lessons/quadratics/practice" }
      ]
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {topics.map((topic, index) => (
        <div key={index} className="p-6 bg-lightNeutral rounded-lg shadow hover:shadow-lg">
          <h2 className="text-2xl font-heading text-darkNavy">{topic.title}</h2>
          <p className="mt-2 text-grayNeutral">{topic.description}</p>
          <div className="mt-4 space-y-2">
            {topic.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.path}
                className="block text-coral hover:text-salmon underline"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
