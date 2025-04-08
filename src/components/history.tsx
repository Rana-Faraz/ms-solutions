type HistoryProps = {
  history: {
    title: string;
    content: string;
  };
};

export default function History({ history }: HistoryProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-degular">
      <p className="flex h-24 w-24 items-center justify-center rounded-full text-center text-3xl font-bold ring-4 ring-secondary/60">
        {history.content}
      </p>
      <p className="text-center text-xl font-bold">{history.title}</p>
    </div>
  );
}
