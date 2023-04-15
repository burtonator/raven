import { ForceGraph3D } from 'react-force-graph';
import { useSmartNoteIndex } from '@/src/components/SmartNoteIndexProvider';

function useData() {
  const [index] = useSmartNoteIndex()

  const nodes = Object.keys(index).map(current => {
    return {
      id: current,
      name: current
    }
  })

  const links = Object.values(index).map(note => {
    return (note.items ?? []).map(item => {
      return {
        source: note.name,
        target: item
      }
    })
  }).flat()
    .filter(current => index[current.target])

  return {nodes, links}

}

export default function Graph() {

  // const data = {
  //   "nodes": [
  //     {
  //       "id": "id1",
  //       "name": "name1",
  //       "val": 1
  //     },
  //     {
  //       "id": "id2",
  //       "name": "name2",
  //       "val": 10
  //     },
  //   ],
  //   "links": [
  //     {
  //       "source": "id1",
  //       "target": "id2"
  //     },
  //   ]
  // }

  const [index] = useSmartNoteIndex()

  const data = useData()

  console.log("FIXME: ", data)
  const GROUPS = 12;

  // https://stackoverflow.com/questions/66096260/why-am-i-getting-referenceerror-self-is-not-defined-when-i-import-a-client-side
  return (
    <>
      <ForceGraph3D
        graphData={data}
        height={window.innerHeight}
        width={window.innerWidth}
        nodeAutoColorBy={d => (d.id ?? '').toString()}
        // nodeThreeObject={node => {
        //   const sprite = new SpriteText((node.id ?? 'unknown').toString());
        //   sprite.textHeight = 14;
        //   return sprite;
        // }}
        // nodeThreeObject={node => {
        //   // const sprite = new SpriteText(node.id);
        //   // sprite.color = node.color;
        //   sprite.textHeight = 8;
        //   return sprite;
        // }}
      />

      {/*<div>*/}
      {/*  <pre>*/}
      {/*          {Object.entries(index)*/}
      {/*                  .map((entry) => {*/}
      {/*                    return (*/}
      {/*                      <div key={entry[1].name}>{entry[1].name}</div>*/}
      {/*                      )})}*/}
      {/*  </pre>*/}
      {/*</div>*/}
    </>
  )
}