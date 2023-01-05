export default function Collection(props) {
  if (!props.cols) {
    return null;
  }

  return (
    <>
      <select className="btn btn-outline-primary w-100 mt-5">
        {props.cols.map((e, index) => 
          <option key={index}>{e}</option>
        )}
      </select>
    </>
  )
}
