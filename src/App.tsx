import { useEffect, useState } from 'react';
import './App.css'
import usePagination from './hook/usePagination'

type Set = {id: number, title: string};
// const dataSet: Set[] = [
//   {
//     id: 1,
//     title: "Benjamin"
//   },
//   {
//     id: 2,
//     title: "Lisa"
//   },
//   {
//     id: 1,
//     title: "Maria"
//   },
// ]

async function fetchApi () {
  const req = await fetch('https://jsonplaceholder.typicode.com/posts');
  const res = await req.json();

  return res;
}


function App() {
  const [dataTest, setDataTest] = useState();


  useEffect(() => {
    (async() => {
      const res = await fetchApi();
      setDataTest(res);
    })()
  }, [])

  const [Pagination, records] = usePagination<Set>({
    recordsPerPage: 5,
    data: dataTest != undefined ? dataTest : []
  })


  return (
    <>
      {records.map(record => (
        <p key={record.id}>{record.id} : {record.title}</p>
      ))}
      <Pagination
        pagStyles={{
          container: 'ContainerIndex',
          list: 'mlist',
          buttonLeft: 'buttonC',
          buttonRight: 'buttonC',
          currentPage: 'currentPage',
          allPages: 'counterRight',
          countPages: 'counterLeft',
          svg: 'svg'
        }}
      />

    </>
  )
}

export default App
