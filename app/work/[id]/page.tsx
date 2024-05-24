type WorkPageProps = {
  params: {
    id: string
  }
}

export default function WorkPage({ params: { id } }: WorkPageProps) {
  return (
    <div>
      <div>WorkPage</div>
      <div>{id}</div>
    </div>
  )
}
