type InputArgs = {
  register: any,
  id: string,
  name: string,
  type: string,
  placeholder?: boolean,
  className: string,
  style?: object,
  label: string
}

export default function InputForm({
  register,
  id,
  name,
  type,
  placeholder,
  className,
  style,
  label
}: InputArgs) {
  return (
    <>
      <label htmlFor={ id } className={
        placeholder ? "sr-only" : "block text-sm font-medium text-neutral-100"
      }>{ label }</label>
      
      <input
        { ...register }
        id={ id }
        name={ name }
        type={ type }
        className={ "bg-neutral-700 border-neutral-600 appearance-none px-3 py-2 border focus:outline-none placeholder-neutral-400 text-neutral-100 caret-red-600 focus:ring-red-600 focus:border-red-600 sm:text-sm "
          + className
          + (placeholder ? "" : " mt-1")
        }
        style={ style }
        placeholder={ placeholder ? label : "" } />
    </>
  )
}