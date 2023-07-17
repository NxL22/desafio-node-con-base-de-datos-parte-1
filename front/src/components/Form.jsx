import { useRef } from 'react';

function Form({ setTitulo, setImg, setDescripcion, agregarPost }) {
  const formRef = useRef(null);

  const handleAgregarPost = () => {
    agregarPost();
    formRef.current.reset();
  };

  return (
    <div className="form">
      <form ref={formRef}>
        <div className="mb-2">
          <h6>Agregar post</h6>
          <label>Título</label>
          <input
            onChange={(event) => setTitulo(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>URL de la imagen</label>
          <input
            onChange={(event) => setImg(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label> <br />
          <textarea
            onChange={(event) => setDescripcion(event.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div className="d-flex">
          <button onClick={handleAgregarPost} className="btn btn-light btn-retro m-auto">
            <big>¡Agregar!</big>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;

