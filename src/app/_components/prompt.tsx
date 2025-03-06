export default function Prompt() {
  return (
    <div>
      <form
        action=""
        className="flex flex-col rounded-2xl border-2 border-solid border-black px-2 py-3"
      >
        <textarea
          name="prompt"
          id="prompt"
          placeholder="Ask anything"
          className="resize-none border-b-2 border-b-slate-500"
          rows={3}
        />
        <button type="submit" className="text-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}
