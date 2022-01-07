import React from 'react';
import { nanoid } from 'nanoid';
function App() {
  const [tarea, setTarea] = React.useState('');
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');
  const [error, setError] = React.useState(null);

  //Cambiar el estado de modoEdicion
  const editar = item => {
    setModoEdicion(true);
    setTarea(item.nombreTarea)
    setId(item.id)
  }
  //Edita Tareas
  const editarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('Elemento Vacio')
      setError('Escriba algo por favor')
      return;
    }
    const ArrayEditado = tareas.map(item => item.id === id ? { id: id, nombreTarea: tarea } : item)
    setTareas(ArrayEditado)

    //se resetea el estado
    setModoEdicion(false);
    setTarea('')
    setId('')
    setError(null)
  }
  //Agrega Tareas
  const agregarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('Elemento Vacio')
      setError('Escriba algo por favor')
      return;
    }
    console.log(tarea)
    setTareas([
      ...tareas,
      { id: nanoid(10), nombreTarea: tarea }
    ])
    setTarea('');
    setError(null);
  }
  //Eliminar Tareas
  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    setTareas(arrayFiltrado);
  }

  return (
    <div className="container mt-5">
      <h1 className='text-center'>CRUD Simple</h1>
      <div className='row'>
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item">No hay tareas</li>
              ) : (
                tareas.map(item => (
                  <li className="list-group-item " key={item.id}>
                    <div className="d-flex flex-row bd-highlight">
                      <div className="bd-highlight flex-grow-1"> <span className="lead">{item.nombreTarea}</span></div>
                      <div className="bd-highlight">
                        <button
                          className="btn  btn-danger btn-sm float-right mx-2"
                          onClick={() => eliminarTarea(item.id)}
                        >

                          Eliminar
                        </button>
                      </div>
                      <div className="bd-highlight">
                        <button
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editar(item)}
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )
            }

          </ul>
        </div>



        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input
              type="text" className="form-control mb-2"
              placeholder='Ingrese Tarea'
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (<button className="btn btn btn-warning btn-block" type="submit">Editar</button>
              ) :
                (<button className="btn btn-dark btn-block" type='submit'> Agregar</button>)
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
