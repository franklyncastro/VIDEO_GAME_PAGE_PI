import style from '.Validaciones.module.css'

const Validaciones = ({Validar}) =>

    {
/// validaciones del back
         return(<>
           {
            Validar?.map((dato,key)=>{
                return(
                    <div className={style.backError} key={key}>{ Object.values(dato)}</div>
                )  } )
            }
          </>
    )}

export default Validaciones;