export default function BubbleSelector({ options, selected, onSelect }) {
  function onClick() {
    onSelect(this); // this = id
  }

  return (
    <div className="max-w-full mx-auto sm:px-6 lg:px-8 mb-4">
      <div className="my-4 flex gap-4">
        {options.map((option) => (
          <span
            key={option.id}
            className={`px-6 py-2 ring-1 ring-gray-500 rounded-full ${selected === option.id
              ? "bg-gray-500 text-white"
              : "text-gray-500 cursor-pointer hover:bg-gray-300"}`}
            onClick={onClick.bind(option.id)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}