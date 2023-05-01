export const BackValidation = ({ validate }) => {
  //Validando desde el BackEnd
  console.log(`Validaciones del BackEnd ${validate}`)
  return (
    <>
      {validate?.map((data, key) => {
        return <div key={key}>{Object.values(data)}</div>;
      })}
    </>
  );
};
