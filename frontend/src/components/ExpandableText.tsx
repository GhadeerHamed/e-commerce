import { useState } from "react";

const ExpandableText = ({ text }: { text: string }) => {
  const limit = 40;
  const [isExpanded, setExpanded] = useState(false);

  if (text.length <= limit) return <article>{text}</article>;

  return (
    <div>
      {isExpanded ? (
        <article>{text}</article>
      ) : (
        <article>{text.substring(0, limit)}...</article>
      )}
      <button onClick={() => setExpanded(!isExpanded)} className="text-blue-500">
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ExpandableText;
