const validation = ({ Validar }) => {
    // back
      return (
        <>
          {
                Validar?.map((dato, key) => {
                  return (
                    <div key={key}>{Object.values(dato)}</div>
                  )
                })
                }
        </>
      )
    }
    
    export default validation