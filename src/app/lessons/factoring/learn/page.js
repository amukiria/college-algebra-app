export default function FactoringLesson() {
    return (
      <div className="p-8 bg-secondary min-h-screen text-text">
        <h1 className="text-4xl font-bold text-accent mb-6">Lesson: Factoring Expressions</h1>
  
        {/* Introduction */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-darkNavy">What is Factoring?</h2>
          <p>
            Factoring is the process of breaking down an expression into simpler components, called 
            factors, that when multiplied give the original expression.
          </p>
        </section>
  
        {/* Types of Factoring */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-darkNavy">Types of Factoring Techniques</h2>
          <ul className="list-disc ml-6">
            <li>Factoring out the Greatest Common Factor (GCF)</li>
            <li>Factoring Trinomials</li>
            <li>Difference of Squares</li>
            <li>Factoring by Grouping</li>
          </ul>
        </section>
  
        {/* Visual Representation */}
        <section className="mb-6 bg-primary p-4 rounded">
          <h3 className="text-xl font-semibold text-accent">Visual Example: Factoring a Trinomial</h3>
          <p className="mt-2">
            For example, to factor <strong>x² + 5x + 6</strong>:
          </p>
          <p>
            Find two numbers that multiply to 6 and add to 5 → <strong>(2 and 3)</strong>
          </p>
          <div className="p-4 bg-lightNeutral rounded shadow-md mt-4">
            <p><strong>Factored form:</strong> (x + 2)(x + 3)</p>
          </div>
        </section>
  
        {/* Quick Practice Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-darkNavy">Quick Practice:</h2>
          <p className="mt-2">Factor the following:</p>
          <ul className="list-disc ml-6">
            <li>x² - 9</li>
            <li>3x² + 6x</li>
            <li>x² + 7x + 12</li>
          </ul>
        </section>
      </div>
    );
  }
  